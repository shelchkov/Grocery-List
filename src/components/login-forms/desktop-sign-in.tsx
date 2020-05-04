import React, { ReactElement } from "react"

import { DesktopFormContainer } from "../ui/containers"
import { SignInForm } from "./sign-in.form"

import { LoginForms } from "../../utils/enums"
import { colors } from "../../utils/styles"

interface Props {
	isActive: boolean
	setForm: (form: LoginForms) => void
}

export const DesktopSignIn = ({
	isActive,
	setForm
}: Props): ReactElement => (
	<DesktopFormContainer
		isActive={isActive}
	>
		<SignInForm
			setActiveForm={isActive ? undefined : setForm}
			inputStyle={
				isActive ? { backgroundColor: colors.grey } : undefined
			}
		/>
	</DesktopFormContainer>
)
