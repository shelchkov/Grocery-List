import { useState, useEffect } from "react"

import { subscribeToAuthChange } from "../utils/firebase"

import { User as UserObj } from "@firebase/auth-types"

interface Auth {
	user: User | null | undefined
	clearUser: () => void
}

export const useAuth = (): Auth => {
	console.log("useAuth")
	const [user, setUser] = useState<User | null>()

	useEffect((): (() => void) => {
		console.log("Subscribing")
		const { unsubscribe } = subscribeToAuthChange(
			async (user: UserObj | null): Promise<void> => {
				console.log(user)

				const userData = user ? {
					id: user.uid,
					email: user.email,
					displayName: user.displayName,
					isVerified: user.emailVerified,
				} : null

				setUser(userData)
			}
		)

		return (): void => {
			console.log("Unsubscribe")
			unsubscribe()
		}
	}, [])

	const clearUser = (): void => setUser(null)

	return { user, clearUser }
}
