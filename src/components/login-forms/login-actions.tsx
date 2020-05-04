import React, { ReactElement } from "react"

import styled from "styled-components"

import { P } from "../ui/p"

import { LoginForms } from "../../utils/enums"
import { colors } from "../../utils/styles"

interface Props {
	form: LoginForms
	handleClick: () => void
	style?: Styles
}

const LoginActionComponent = styled(P)`
	position: absolute;
	bottom: 42px;
	margin: 0;

	color: ${colors.darkBlue};
	text-decoration: underline;
	cursor: pointer;
`

const LoginActionsText = {
	[LoginForms.signIn]: "Create Account",
	[LoginForms.signUp]: "Sign In"
}

export const LoginActions = ({
	form,
	handleClick,
	style,
}: Props): ReactElement => (
	<LoginActionComponent onClick={handleClick} {...(style as any)}>
		{LoginActionsText[form]}
	</LoginActionComponent>
)
