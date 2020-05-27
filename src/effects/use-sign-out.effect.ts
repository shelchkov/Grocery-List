import { useState } from "react"

import { signOut } from "../utils/firebase"

interface SignOut {
	startSignOut: () => void
	isLoading: boolean
	isSuccess: boolean | undefined
}

export const useSignOut = (): SignOut => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>()

	const startSignOut = (): void => {
		setIsLoading(true)

		signOut().then((data): void => {
			if (data.error) {
				setIsSuccess(false)
				setIsLoading(false)
			}
		})
	}

	return { isLoading, isSuccess, startSignOut }
}
