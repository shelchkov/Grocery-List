import React, { ReactElement } from "react"
import styled from "styled-components"

import { Logo } from "../components/logo/logo"
import { LoadingMessage } from "../components/loading/loading-message"

import { colors } from "../utils/styles"

const Container = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: ${colors.grey};
`

export const LoadingPage = (): ReactElement => (
	<Container>
		<Logo />
		<LoadingMessage />
	</Container>
)
