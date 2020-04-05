import React, { ReactElement } from "react"

import styled from "styled-components"

import { LoginForms } from "../../utils/enums"
import { colors } from "../../utils/styles"

interface Props {
	form: LoginForms 
}

const LoginActionComponent = styled.p`
	position: absolute;
	bottom: 26px;
	
	color: ${colors.darkBlue};
	text-decoration: underline;
`

const LoginActionsText = {
	[LoginForms.signIn]: "Create Account",
	[LoginForms.signOut]: "Sign In"
}

export const LoginActions = ({ form }: Props): ReactElement => (
	<LoginActionComponent>
		{LoginActionsText[form]}
	</LoginActionComponent>
)
