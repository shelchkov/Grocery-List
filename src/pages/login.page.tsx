import React, { ReactElement, useState } from "react"

import { Container, FormsContainer } from "../components/ui/containers"
import { Header } from "../components/header/header"
import { Div } from "../components/ui/div"
import {
	MobileLoginLayout
} from "../components/login-forms/mobile-login-layout"
import { DesktopSignIn } from "../components/login-forms/desktop-sign-in"
import { DesktopSignUp } from "../components/login-forms/desktop-sign-up"

import { LoginForms } from "../utils/enums"
import { copyObject } from "../utils/utils"

export const LoginPage = (): ReactElement => {
	const [form, setForm] = useState<LoginForms>(LoginForms.signIn)

	const changeForm = (): void => {
		const formTypes = Object.keys(LoginForms)
		const forms: { [key: string]: LoginForms } = 
			copyObject(LoginForms)

		const index = formTypes.findIndex(
			(element): boolean => forms[element] === form
		)

		const nextIndex = index === formTypes.length - 1 ? 0 : index + 1
		
		setForm(forms[formTypes[nextIndex]] as LoginForms)
	}

	const isSignInActive = form === LoginForms.signIn
	const handleSignInFocus = (): void => setForm(LoginForms.signIn)
	const isSignUpActive = form === LoginForms.signUp
	const handleSignUpFocus = (): void => setForm(LoginForms.signUp)

	return (
		<Container>
			<Header />

			<Div
				display={["flex", "flex", "none"]}
				justifyContent="center"
			>
				<MobileLoginLayout form={form} changeForm={changeForm} />
			</Div>

			<FormsContainer display={["none", "none", "flex"]}>
				<DesktopSignIn
					isActive={isSignInActive}
					handleInputFocus={
						isSignInActive ? undefined : handleSignInFocus
					}
				/>

				<DesktopSignUp
					isActive={isSignUpActive}
					handleInputFocus={
						isSignUpActive ? undefined : handleSignUpFocus
					}
				/>
			</FormsContainer>
		</Container>
	)
}
