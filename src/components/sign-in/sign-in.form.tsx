import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { Input } from "../input/input"
import { Button } from "../button/button"

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

const SignInContainer = styled.div`
	margin-top: 22px;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`

export const SignInForm = (): ReactElement => {
	const [formData, setFormData] = useState<SignInFormData>()
	const [formErrors, setFormErrors] = useState<SignInErrors>()

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

		signIn(formData.email, formData.password)
			.catch((e): void => {
				const { errorCode } = e
				console.log(errorCode)
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

				<ButtonContainer>
					<Button
						buttonType={BtnTypes.SignIn}
						text="Sign In"
						type={ButtonTypes.submit}
					/>
				</ButtonContainer>
			</SignInContainer>
		</form>
	)
}
