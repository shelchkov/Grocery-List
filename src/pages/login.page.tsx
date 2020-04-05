import React, { ReactElement } from "react"

import styled from "styled-components"

import { Logo } from "../components/logo/logo"

import { spaces, colors } from "../utils/styles"

const Container = styled.div`
	min-height: 100vh;

	padding-left: ${spaces[1]};
	padding-right: ${spaces[1]};

	background-color: ${colors.grey};
`

export const LoginPage = (): ReactElement => (
	<Container>
		<Logo />
	</Container>
)
