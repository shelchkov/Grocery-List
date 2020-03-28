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

export const getListItems = async (
	listId: string
): Promise<List | undefined> => {
	const listRef = firestore.collection("lists").doc(listId)
	const querySnapshot = await listRef.get()
	console.log(`List was ${querySnapshot.exists ? "" : "not "}found.`)
	return querySnapshot.data() as List
}

interface Response {
	error?: string
	id?: string
	success?: boolean
}

const createResponse = (error: any, id?: string): Response => {
	if (error) {
		return { error: error.message }
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

export const addListItem = async (
	item: Item,
	userId: string,
	listId?: string,
): Promise<Response> => {
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

		return createResponse(null)
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
	console.log(data)
	return data as UserInfo
}
