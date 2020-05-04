import React, { ReactElement } from "react"

import { DesktopFormContainer } from "../ui/containers"
import { SignUpForm } from "./sign-up.form"

import { LoginForms } from "../../utils/enums"
import { colors } from "../../utils/styles"

interface Props {
	isActive: boolean
	setForm: (form: LoginForms) => void
}

export const DesktopSignUp = ({
	isActive,
	setForm
}: Props): ReactElement => (
	<DesktopFormContainer
		isActive={isActive}
	>
		<SignUpForm
			setActiveForm={isActive ? undefined : setForm}
			inputStyle={
				isActive ? { backgroundColor: colors.grey } : undefined
			}
		/>
	</DesktopFormContainer>
)
