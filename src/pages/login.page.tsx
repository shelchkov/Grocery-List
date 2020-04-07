import React, { ReactElement, useState } from "react"

import styled from "styled-components"

import { Logo } from "../components/logo/logo"
import { LoginActions } from "../components/login-actions/login-actions"

import { spaces, colors } from "../utils/styles"
import { LoginForms } from "../utils/enums"

const Container = styled.div`
	min-height: 100vh;

	padding-left: ${spaces[1]};
	padding-right: ${spaces[1]};

	background-color: ${colors.grey};
`

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
			<LoginActions form={form} handleClick={changeForm} />
		</Container>
	)
}
