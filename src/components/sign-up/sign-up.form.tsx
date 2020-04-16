import React, { ReactElement, useState } from "react"

import { SignInContainer, SignInButtonContainer } from "../ui/containers"
import { Input } from "../input/input"
import { Button } from "../button/button"

import { BtnTypes, ButtonTypes } from "../../utils/enums"
import {
	SignUpInputs,
	SignUpFormData,
	SignUpErrors
} from "../../utils/validation"
import { signUp } from "../../utils/firebase"

const getSignUpError = (errorCode: string): SignUpErrors => {
	switch(errorCode) {
		case "auth/email-already-in-use":
			return { [SignUpInputs.email]: ["Email is already in use"] }

		case "auth/invalid-email":
			return { [SignUpInputs.email]: ["Email is not valid"] }

		case "auth/weak-password":
			return {
				[SignUpInputs.password]: ["Password is not strong enought"]
			}

		default:
			return {}
	}
}

export const SignUpForm = (): ReactElement => {
	const [formData, setFormData] = useState<SignUpFormData>()
	const [formErrors, setFormErrors] = useState<SignUpErrors>()

	const handleInputChange = (name: SignUpInputs) => (
		event: React.ChangeEvent<HTMLInputElement>
	): void =>
		setFormData({ ...formData, [name]: event.currentTarget.value })

	const handleSubmit = (
		event: React.FormEvent<HTMLFormElement>
	): void => {
		event.preventDefault()

		console.log(formData)

		if (!formData || !formData.email || !formData.password) {
			return
		}

		signUp(formData.email, formData.password)
			.then((data): void => {
				console.log(data)

				const errorCode = data.errorCode

				if (errorCode) {
					if (errorCode === "auth/operation-not-allowed") {
						console.error("Operation is not allowed")
					}

					setFormErrors(getSignUpError(errorCode))
				}
			})
	}

	const getFieldError = (name: SignUpInputs): string | undefined => {
		if (!formErrors || !formErrors[name]) {
			return
		}

		return (formErrors[name] as string[])[0]
	}

	return (
		<form onSubmit={handleSubmit}>
			<SignInContainer>
				<Input
					placeholder="Name"
					style={{ width: "fill-available" }}
					onChange={handleInputChange(SignUpInputs.name)}
					errorMessage={getFieldError(SignUpInputs.name)}
				/>

				<Input
					placeholder="Email"
					style={{ width: "fill-available" }}
					onChange={handleInputChange(SignUpInputs.email)}
					errorMessage={getFieldError(SignUpInputs.email)}
				/>

				<Input
					placeholder="Password"
					style={{ width: "fill-available" }}
					onChange={handleInputChange(SignUpInputs.password)}
					errorMessage={getFieldError(SignUpInputs.password)}
				/>

				<SignInButtonContainer>
					<Button
						buttonType={BtnTypes.SignUp}
						text="Sign Up"
						type={ButtonTypes.submit}
					/>
				</SignInButtonContainer>
			</SignInContainer>
		</form>
	)
}
