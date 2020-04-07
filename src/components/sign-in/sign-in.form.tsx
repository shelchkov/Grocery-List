import React, { ReactElement, useState } from "react"

import { Input } from "../input/input"

enum SignInInputs {
	email = "email",
	password = "password"
}

interface FormData {
	[SignInInputs.email]?: string,
	[SignInInputs.password]?: string
}

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
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input
				placeholder="Email"
				onChange={handleInputChange(SignInInputs.email)}
			/>

			<Input
				placeholder="Password"
				onChange={handleInputChange(SignInInputs.password)}
			/>
		</form>
	)
}
