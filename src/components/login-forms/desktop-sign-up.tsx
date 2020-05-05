import React, { ReactElement } from "react"

import { DesktopFormContainer } from "../ui/containers"
import { SignUpForm } from "./sign-up.form"

import { colors } from "../../utils/styles"

interface Props {
	isActive: boolean
	handleInputFocus: (() => void) | undefined
}

export const DesktopSignUp = ({
	isActive,
	handleInputFocus
}: Props): ReactElement => (
	<DesktopFormContainer
		isActive={isActive}
	>
		<SignUpForm
			handleInputFocus={handleInputFocus}
			inputStyle={
				isActive ? { backgroundColor: colors.grey } : undefined
			}
		/>
	</DesktopFormContainer>
)
