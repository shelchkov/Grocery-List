import React, { ReactElement, useState } from "react"

import { Input } from "../input/input"
import { Button } from "../button/button"
import { SignInContainer, SignInButtonContainer } from "../ui/containers"

import {
	BtnTypes,
	ButtonTypes,
	InputTypes
} from "../../utils/enums"
import { signIn } from "../../utils/firebase"
import {
	SignInInputs,
	SignInFormData,
	signInValidation,
	SignInErrors
} from "../../utils/validation"

const getSignInError = (errorCode: string): SignInErrors => {
	switch(errorCode) {
		case "auth/invalid-email":
			return { [SignInInputs.email]: ["Email is not valid"] }

		case "auth/user-disabled":
			return { [SignInInputs.email]: ["User has been disabled"] }

		case "auth/user-not-found":
			return { [SignInInputs.email]: ["User was not found"] }

		case "auth/wrong-password":
			return { [SignInInputs.password]: ["Wrong password"] }

		default:
			return {}
	}
}

export const SignInForm = (): ReactElement => {
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

		console.log(formData)
		const errors = signInValidation(formData)

		if (errors) {
			console.log(errors)
			setFormErrors(errors)

			return
		}

		console.log("Submitting")

		if (!formData || !formData.email || !formData.password) {
			return
		}

		setIsLoading(true)

		signIn(formData.email, formData.password)
			.then((data): void => {
				if (data.errorCode) {
					setFormErrors(getSignInError(data.errorCode))
					setIsLoading(false)
				}
			})
	}

	const getFieldError = (name: SignInInputs): string | undefined => {
		if (!formErrors || !formErrors[name]) {
			return
		}

		return (formErrors[name] as string[])[0]
	}

	return (
		<form onSubmit={handleSubmit}>
			<SignInContainer>
				<Input
					placeholder="Email"
					onChange={handleInputChange(SignInInputs.email)}
					style={{ width:"fill-available" }}
					type={InputTypes.email}
					errorMessage={getFieldError(SignInInputs.email)}
				/>

				<Input
					placeholder="Password"
					onChange={handleInputChange(SignInInputs.password)}
					style={{ width:"fill-available" }}
					type={InputTypes.password}
					errorMessage={getFieldError(SignInInputs.password)}
				/>

				<SignInButtonContainer>
					<Button
						buttonType={BtnTypes.SignIn}
						text="Sign In"
						type={ButtonTypes.submit}
						isLoading={isLoading}
					/>
				</SignInButtonContainer>
			</SignInContainer>
		</form>
	)
}
