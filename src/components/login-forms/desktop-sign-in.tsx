import React, { ReactElement } from "react"

import { DesktopFormContainer } from "../ui/containers"
import { SignInForm } from "./sign-in.form"

import { colors } from "../../utils/styles"

interface Props {
	isActive: boolean
	handleInputFocus: (() => void) | undefined
}

export const DesktopSignIn = ({
	isActive,
	handleInputFocus,
}: Props): ReactElement => (
	<DesktopFormContainer
		isActive={isActive}
	>
		<SignInForm
			handleInputFocus={handleInputFocus}
			inputStyle={
				isActive ? { backgroundColor: colors.grey } : undefined
			}
		/>
	</DesktopFormContainer>
)
