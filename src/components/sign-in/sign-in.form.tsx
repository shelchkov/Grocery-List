import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { Input } from "../input/input"
import { Button } from "../button/button"

import { BtnTypes, ButtonTypes } from "../../utils/enums"
import { signIn } from "../../utils/firebase"

enum SignInInputs {
	email = "email",
	password = "password"
}

interface FormData {
	[SignInInputs.email]?: string,
	[SignInInputs.password]?: string
}

const SignInContainer = styled.div`
	margin-top: 22px;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`

export const SignInForm = (): ReactElement => {
	const [formData, setFormData] = useState<FormData>()

	const handleInputChange = (name: SignInInputs) => (
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

		signIn(formData.email, formData.password)
			.catch((e): void => {
				const { errorCode } = e
				console.log(errorCode)
			})
	}

	return (
		<form onSubmit={handleSubmit}>
			<SignInContainer>
				<Input
					placeholder="Email"
					onChange={handleInputChange(SignInInputs.email)}
					style={{ width:"fill-available" }}
				/>

				<Input
					placeholder="Password"
					onChange={handleInputChange(SignInInputs.password)}
					style={{ width:"fill-available" }}
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
