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

	return (
		<Container>
			<Logo />
			<LoginActions form={form} />
		</Container>
	)
}
