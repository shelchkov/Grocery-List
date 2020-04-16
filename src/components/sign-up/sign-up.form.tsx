import React, { ReactElement, useState } from "react"

import { SignInContainer, SignInButtonContainer } from "../ui/containers"
import { Input } from "../input/input"
import { Button } from "../button/button"

import { BtnTypes, ButtonTypes } from "../../utils/enums"
import { SignUpInputs, SignUpFormData } from "../../utils/validation"
import { signUp } from "../../utils/firebase"

export const SignUpForm = (): ReactElement => {
	const [formData, setFormData] = useState<SignUpFormData>()

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
	}

	return (
		<form onSubmit={handleSubmit}>
			<SignInContainer>
				<Input
					placeholder="Name"
					style={{ width: "fill-available" }}
					onChange={handleInputChange(SignUpInputs.name)}
				/>

				<Input
					placeholder="Email"
					style={{ width: "fill-available" }}
					onChange={handleInputChange(SignUpInputs.email)}
				/>

				<Input
					placeholder="Password"
					style={{ width: "fill-available" }}
					onChange={handleInputChange(SignUpInputs.password)}
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
