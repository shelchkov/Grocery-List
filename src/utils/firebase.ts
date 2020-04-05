import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

import { config } from "./firebase-constants"

import {
	DocumentReference,
	DocumentData
} from "@firebase/firestore-types"
import { User, UserCredential } from "@firebase/auth-types"

firebase.initializeApp(config)
export const auth = firebase.auth()
const firestore = firebase.firestore()

const createUser = (
	email: string,
	password: string
): Promise<UserCredential> =>
	auth.createUserWithEmailAndPassword(email, password)

export const createUserDocument = async (
	user: User,
	displayName: string,
	email: string | null
): Promise<DocumentReference | undefined> => {
	if (!user) {
		return
	}

	const userRef = firestore.collection("users").doc(user.uid)
	console.log(userRef)

	const snapShot = await userRef.get()
	console.log(snapShot)

	if (snapShot.exists) {
		return userRef
	}

	const createdAt = new Date()

	try {
		await userRef.set({
			displayName,
			email,
			createdAt
		})
	} catch (error) {
		console.error("Error Creating User", error.message)
	}

	return userRef
}

export const signUp = async (
	email: string,
	password: string,
	displayName: string
): Promise<DocumentReference | undefined> => {
	const user = await createUser(email, password)
	
	console.log(user)

	if (!user.user) return

	return createUserDocument(user.user, displayName, email)
}

interface Subscription {
	unsubscribe: () => void
}

const getListItems = async (
	listId: string
): Promise<List | undefined> => {
	const listRef = firestore.collection("lists").doc(listId)
	const itemsRef = listRef.collection("items")

	const items = await itemsRef.get()
	const docs = items.docs.map((snapshot): Item => 
		({ ...snapshot.data(), id: snapshot.id } as Item)
	)
	console.log(docs)

	const list = { id: listId, items: docs }

	return new Promise((res): void => {
		res(list as List)
	})
}

export const getListItemsSubscribe = (
	listId: string,
	callback: (items: Item[]) => void
): Subscription => {
	const listRef = firestore.collection("lists").doc(listId)
	const itemsRef = listRef.collection("items")

	const unsubscribe = itemsRef.onSnapshot({
		error: (e: Error): void => {
			console.log("Subscription Error", e.message)
		},
		next: (items): void => {
			const docs = items.docs.map((snapshot): Item => 
				({ ...snapshot.data(), id: snapshot.id } as Item)
			)
			callback(docs)
		}})

	return { unsubscribe }
}

interface Response {
	error?: string
	id?: string
	success?: boolean
	item?: Item
}

const createResponse = (
	error: any,
	id?: string,
	item?: Item
): Response => {
	if (error) {
		return { error: error.message }
	}

	if (item) {
		return item
	}

	return id ? { id } : { success: true }

}

const addListToUser = async (
	userId: string,
	listId: string
): Promise<Response> => {
	const userRef = firestore.collection("users").doc(userId)

	try {
		await userRef.update({
			lists: firebase.firestore.FieldValue.arrayUnion(listId)
		})

		return createResponse(null)
	} catch (e) {
		return createResponse(e)
	}
}

export const getDate = (): string => Date.now().toString()

export const addListItem = async (
	itemName: string,
	userId: string,
	listId?: string,
): Promise<Response> => {
	const item = { name: itemName, isChecked: false, createdAt: getDate() }

	if (!listId) {
		console.log("Creating new list")
		try {
			const newList = await firestore.collection("lists").doc()
			console.log(newList)

			const data = newList.collection("items").add(item)
			console.log(data)

			const userList = await addListToUser(userId, newList.id)

			console.log(userList)

			return createResponse(userList.error, newList.id)
		} catch (e) {
			return createResponse(e)
		}
	}

	try {
		console.log(("Trying to add item to an existing list"))
		const listRef = firestore.collection("lists").doc(listId)
		await listRef.collection("items").add(item)

		return createResponse(null, item.createdAt, item)
	} catch (e) {
		return createResponse(e)
	}
}

export const getUserInfo = async (
	userId: string
): Promise<UserInfo | undefined> => {
	const userRef = firestore.collection("users").doc(userId)
	const snapshot = await userRef.get()
	const data = snapshot.data()
	
	return data as UserInfo
}

export const changeListItem = async (
	itemChanges: { [key: string]: string | boolean },
	listId: string,
	itemId: string,
): Promise<Response> => {
	const listRef = firestore.collection("lists").doc(listId)
	const itemsRef = listRef.collection("items").doc(itemId)

	try {
		await itemsRef.update(itemChanges)

		return createResponse(null)
	} catch (e) {
		return createResponse(e)
	}
}
