import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

import { config } from "./firebase-constants"

// import {
// 	DocumentReference,
// 	DocumentData
// } from "@firebase/firestore-types"
// import { User, UserCredential } from "@firebase/auth-types"
import { User } from "@firebase/auth-types"

firebase.initializeApp(config)
const auth = firebase.auth()
const firestore = firebase.firestore()

interface Subscription {
	unsubscribe: () => void
}

export const subscribeToAuthChange = (
	callback: (user: User | null) => Promise<void>
): Subscription => {
	const unsubscribe = auth.onAuthStateChanged(callback)
	return { unsubscribe }
}

interface SignUpResponse {
	error?: string
	success?: boolean
	alreadyRegistred?: boolean
}

const createUserDocument = async (
	user: User,
	email: string | null
): Promise<SignUpResponse> => {
	const userRef = firestore.collection("users").doc(user.uid)
	console.log(userRef)

	const snapShot = await userRef.get()
	console.log(snapShot)

	if (snapShot.exists) {
		console.log("User was already registred")
		return { alreadyRegistred: true }
	}

	const createdAt = new Date()

	try {
		await userRef.set({
			email,
			createdAt
		})

		return { success: true }
	} catch (error) {
		console.error("Error Creating User: ", error.message)
		return { error: error.message }
	}
}

export const signUp = async (
	email: string,
	password: string,
): Promise<SignUpResponse> => {
	try {
		const user = await auth
			.createUserWithEmailAndPassword(email, password)

		console.log(user)

		if (!user.user) {
			return { success: false }
		}

		return createUserDocument(user.user, email)
	} catch (e) {
		return { error: e.message }
	}
}

interface SignInResponse {
	errorCode?: string
	success?: boolean
}

export const signIn = async (
	email: string,
	password: string
): Promise<SignInResponse> => {
	try {
		await auth.signInWithEmailAndPassword(email, password)
		return { success: true }
	} catch (e) {
		console.log("Error whilte logging in:", e.message)
		return { errorCode: e.code }
	}
}

export const getListItems = (
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
}

const createResponse = (
	error: any,
	id?: string,
): Response => {
	if (error) {
		return { error: error.message }
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

interface AddItemResponse {
	error?: string
	listId?: string,
	success?: boolean
}

export const getDate = (): string => Date.now().toString()

export const addListItem = async (
	itemName: string,
	userId: string,
	listId?: string,
): Promise<AddItemResponse> => {
	const item = {
		name: itemName,
		isChecked: false,
		createdAt: getDate()
	}

	if (!listId) {
		console.log("Creating new list")
		try {
			const newList = await firestore.collection("lists").doc()
			console.log(newList)

			const data = newList.collection("items").add(item)
			console.log(data)

			const userList = await addListToUser(userId, newList.id)

			console.log(userList)

			return { listId: newList.id }
		} catch (e) {
			return { error: e.message }
		}
	}

	try {
		console.log(("Trying to add item to an existing list"))
		const listRef = firestore.collection("lists").doc(listId)
		await listRef.collection("items").add(item)

		return { success: true }
	} catch (e) {
		return { error: e.message }
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
	const itemRef = listRef.collection("items").doc(itemId)

	try {
		await itemRef.update(itemChanges)

		return createResponse(null)
	} catch (e) {
		return createResponse(e)
	}
}

export const deleteListItem = async (
	listId: string,
	itemId: string
): Promise<Response> => {
	const listRef = firestore.collection("lists").doc(listId)
	const itemRef = listRef.collection("items").doc(itemId)

	try {
		await itemRef.delete()
		return createResponse(null)
	} catch (e) {
		return createResponse(e)
	}
}
