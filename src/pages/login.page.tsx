import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { Logo } from "../components/logo/logo"
import { LoginActions } from "../components/login-actions/login-actions"
import { SignInForm } from "../components/sign-in/sign-in.form"
import { Container } from "../components/ui/containers"
import { SignUpForm } from "../components/sign-up/sign-up.form"
import {
	MobileLayout,
	MediumDesktopLayout
} from "../components/ui/layouts"
import { Navigation } from "../components/navigation/navigation"

import { LoginForms } from "../utils/enums"
import { copyObject } from "../utils/utils"
import { colors } from "../utils/styles"

const DesktopFormContainer = styled.div`
	padding: 0 40px 30px 40px;
	margin: 160px 40px 20px 40px;
	background-color: ${(p: { isActive: boolean }): string =>
		p.isActive ? colors.lightGrey : "transparent"};
	border: 1px solid ${(p: { isActive: boolean }): string =>
		p.isActive ? colors.darkBlue : "none"};
	border-radius: 10px;
`

const FormsContainer = styled.div`
	display: flex;
	margin: 0 auto;
`

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

	return (
		<Container>
			<MobileLayout><Logo /></MobileLayout>
			<Navigation />

			<MobileLayout>
				{form === LoginForms.signIn ?
					<SignInForm /> : <SignUpForm />
				}
				<LoginActions form={form} handleClick={changeForm} />
			</MobileLayout>

			<MediumDesktopLayout>
				<FormsContainer>
					<DesktopFormContainer
						isActive={form === LoginForms.signIn}
					>
						<SignInForm setActiveForm={
							form !== LoginForms.signIn ? setForm
							: undefined
						} inputStyle={form === LoginForms.signIn ? {
							backgroundColor: colors.grey
						} : undefined}/>
					</DesktopFormContainer>
					<DesktopFormContainer
						isActive={form === LoginForms.signUp}
					>
						<SignUpForm setActiveForm={
							form !== LoginForms.signUp ? setForm
							: undefined
						} inputStyle={form === LoginForms.signUp ? {
							backgroundColor: colors.grey
						} : undefined}/>
					</DesktopFormContainer>
				</FormsContainer>
			</MediumDesktopLayout>
		</Container>
	)
}
