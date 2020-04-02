import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

import { config } from "./firebase-constants"

import {
	DocumentReference,
	// DocumentData
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

export const signOut = async (): Promise<Response> => {
	try {
		await auth.signOut()
		return createResponse(null)
	} catch(e) {
		return createResponse(e)
	}
}

export const getListItems = async (
	listId: string
): Promise<List | undefined> => {
	const listRef = firestore.collection("lists").doc(listId)
	const querySnapshot = await listRef.get()
	console.log(`List was ${querySnapshot.exists ? "" : "not "}found.`)
	return querySnapshot.data() as List
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

export const createId = (): string => Date.now().toString()

export const addListItem = async (
	itemName: string,
	userId: string,
	listId?: string,
): Promise<Response> => {
	const item = { name: itemName, isChecked: false, id: createId() }

	if (!listId) {
		console.log("Creating new list")
		try {
			const data = await firestore.collection("lists").add({
				items: [ item ]
			})

			const userList = await addListToUser(userId, data.id)

			console.log(userList)

			return createResponse(userList.error, data.id)
		} catch (e) {
			return createResponse(e)
		}
	}

	const itemsRef = firestore.collection("lists").doc(listId)

	console.log(("Trying to add item to existing list"))

	try {
		await itemsRef.update({
			items: firebase.firestore.FieldValue.arrayUnion(item)
		})

		return createResponse(null, item.id, item)
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
	item: Item,
	listId: string,
	currentItems: Item[],
): Promise<Response> => {
	const itemsRef = firestore.collection("lists").doc(listId)
	const items = [
		...currentItems.filter((cur): boolean => cur.id !== item.id),
		item
	]

	try {
		await itemsRef.update({ items })

		return createResponse(null, item.id, item)
	} catch (e) {
		return createResponse(e)
	}
}
