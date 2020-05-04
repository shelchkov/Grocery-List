import React, { ReactElement } from "react"

import { SignInForm } from "./sign-in.form"
import { SignUpForm } from "./sign-up.form"
import { LoginActions } from "./login-actions"

import { LoginForms } from "../../utils/enums"

interface Props {
	form: LoginForms
	changeForm: () => void
}

export const MobileLoginLayout = ({
	form,
	changeForm
}: Props): ReactElement => (
	<>
		{form === LoginForms.signIn ?
			<SignInForm /> : <SignUpForm />
		}
		<LoginActions
			form={form}
			handleClick={changeForm}
			style={{ left: ["24px", "40px"] }}
		/>
	</>
)
