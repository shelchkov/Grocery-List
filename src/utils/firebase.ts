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
	displayName?: string,
	email?: string
): Promise<DocumentReference | undefined> => {
	if (!user) {
		return
	}

	const userRef = firestore.doc(`users/${user.uid}`)
	console.log(userRef)

	if (userRef.get) {
		const snapShot = await userRef.get()
		console.log(snapShot)

		if (snapShot.exists) {
			return userRef
		}
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
): Promise<DocumentData | undefined> => {
	const listRef = firestore.collection("lists").doc(listId)
	const querySnapshot = await listRef.get()
	return querySnapshot.data()
}
