import React, { ReactElement, useState } from "react"

import { Logo } from "../components/logo/logo"
import { LoginActions } from "../components/login-actions/login-actions"
import { SignInForm } from "../components/sign-in/sign-in.form"
import { Container } from "../components/ui/containers"
import { SignUpForm } from "../components/sign-up/sign-up.form"

import { LoginForms } from "../utils/enums"

export const LoginPage = (): ReactElement => {
	const [form, setForm] = useState<LoginForms>(LoginForms.signIn)

	const changeForm = (): void => {
		const formTypes = Object.keys(LoginForms)
		const forms = JSON.parse(JSON.stringify(LoginForms))

		const index = formTypes.findIndex(
			(element): boolean => forms[element] === form
		)

		const nextIndex = index === formTypes.length - 1 ? 0 : index + 1
		
		setForm(forms[formTypes[nextIndex]] as LoginForms)
	}

	return (
		<Container>
			<Logo />
			{form === LoginForms.signIn ? <SignInForm /> : <SignUpForm />}
			<LoginActions form={form} handleClick={changeForm} />
		</Container>
	)
}
