import React, { ReactElement } from "react"

import styled from "styled-components"

import { LoginForms } from "../../utils/enums"
import { colors } from "../../utils/styles"

interface Props {
	form: LoginForms
	handleClick: () => void
}

const LoginActionComponent = styled.p`
	position: absolute;
	bottom: 42px;
	margin: 0;

	color: ${colors.darkBlue};
	text-decoration: underline;
`

const LoginActionsText = {
	[LoginForms.signIn]: "Create Account",
	[LoginForms.signUp]: "Sign In"
}

export const LoginActions = ({
	form,
	handleClick
}: Props): ReactElement => (
	<LoginActionComponent onClick={handleClick}>
		{LoginActionsText[form]}
	</LoginActionComponent>
)
