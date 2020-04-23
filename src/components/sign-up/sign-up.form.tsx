import React, { ReactElement, useState } from "react"

import { SignInContainer, SignInButtonContainer } from "../ui/containers"
import { Input } from "../input/input"
import { Button } from "../button/button"

import { BtnTypes, ButtonTypes } from "../../utils/enums"
import {
	SignUpInputs,
	SignUpFormData,
	SignUpErrors,
	signUpValidation
} from "../../utils/validation"
import { signUp } from "../../utils/firebase"
import { getSignUpError } from "../../utils/utils"

const objectFromExecutions = (
	values: string[],
	func: (value: any) => any
): { [key: string]: any } => 
	values.reduce((acc, value): { [key: string]: any } =>
		({ ...acc, [value]: func(value) })
	, {})

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

		const errors = signUpValidation(formData)

		setFormErrors(errors)

		if (errors) {
			console.log(errors)
			
			return
		}

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

	const onChangeHandlers = objectFromExecutions(
		[SignUpInputs.name, SignUpInputs.email, SignUpInputs.password],
		handleInputChange
	)

	return (
		<form onSubmit={handleSubmit}>
			<SignInContainer>
				<Input
					placeholder="Name"
					style={{ width: "fill-available" }}
					onChange={onChangeHandlers[SignUpInputs.name]}
					errorMessage={getFieldError(SignUpInputs.name)}
				/>

				<Input
					placeholder="Email"
					style={{ width: "fill-available" }}
					onChange={onChangeHandlers[SignUpInputs.email]}
					errorMessage={getFieldError(SignUpInputs.email)}
				/>

				<Input
					placeholder="Password"
					style={{ width: "fill-available" }}
					onChange={onChangeHandlers[SignUpInputs.password]}
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
