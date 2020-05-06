import { useState, useCallback } from "react"

import {
	SignInInputs,
	SignInFormData,
	SignInErrors,
	signInValidation
} from "../utils/validation"
import { signIn } from "../utils/firebase"
import { getSignInError } from "../utils/utils"

interface SignIn {
	isLoading: boolean | undefined
	getFieldValue: (field: SignInInputs) => string
	getFieldError: (field: SignInInputs) => string | undefined
	handleInputChange: (field: SignInInputs) =>
		(event: React.ChangeEvent<HTMLInputElement>) => void
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const useSignIn = (): SignIn => {
	console.log("useSignIn")
	const [formData, setFormData] = useState<SignInFormData>()
	const [formErrors, setFormErrors] = useState<SignInErrors>()
	const [isLoading, setIsLoading] = useState<boolean>()

	const handleInputChange = (name: SignInInputs) => (
		event: React.ChangeEvent<HTMLInputElement>
	): void =>
		setFormData({ ...formData, [name]: event.currentTarget.value })

	const handleSubmit = (
		event: React.FormEvent<HTMLFormElement>
	): void => {
		event.preventDefault()

		console.log("Start Sign in")
		console.log(formData)

		setIsLoading(true)
		const errors = signInValidation(formData)

		if (errors) {
			console.log("Sign in errors")
			console.log(errors)
			setFormErrors(errors)
			setIsLoading(false)

			return
		}

		console.log("Submitting")

		if (!formData || !formData.email || !formData.password) {
			return
		}

		signIn(formData.email, formData.password)
			.then((data): void => {
				if (data.errorCode) {
					setFormErrors(getSignInError(data.errorCode))
					setIsLoading(false)
				}
			})
	}

	const getFieldValue = (field: SignInInputs): string =>
		(formData && formData[field]) || ""

	const getFieldError = useCallback((field: SignInInputs): string | undefined => {
		if (!formErrors || !formErrors[field]) {
			return
		}

		return (formErrors[field] as string[])[0]
	}, [formErrors])

	return {
		isLoading,
		getFieldValue,
		getFieldError,
		handleInputChange,
		handleSubmit
	}
}
