import React, { ReactElement } from "react"

import { Input } from "../input/input"
import { Button } from "../button/button"
import { SignInContainer, SignInButtonContainer } from "../ui/containers"

import { useSignIn } from "../../effects/use-sign-in.effect"

import {
	BtnTypes,
	ButtonTypes,
	InputTypes,
} from "../../utils/enums"
import { SignInInputs } from "../../utils/validation"

interface Props {
	handleInputFocus?: () => void | undefined
	inputStyle?: Styles
}

export const SignInForm = ({
	handleInputFocus,
	inputStyle
}: Props): ReactElement => {
	const {
		isLoading,
		getFieldValue,
		getFieldError,
		handleSubmit,
		handleInputChange
	} = useSignIn()

	return (
		<SignInContainer onSubmit={handleSubmit}>
			<Input
				placeholder="Email"
				onChange={handleInputChange(SignInInputs.email)}
				style={{ ...inputStyle, width:"fill-available" }}
				type={InputTypes.email}
				errorMessage={getFieldError(SignInInputs.email)}
				value={getFieldValue(SignInInputs.email)}
				onFocus={handleInputFocus}
			/>

			<Input
				placeholder="Password"
				onChange={handleInputChange(SignInInputs.password)}
				style={{ ...inputStyle, width:"fill-available" }}
				type={InputTypes.password}
				errorMessage={getFieldError(SignInInputs.password)}
				onFocus={handleInputFocus}
				value={getFieldValue(SignInInputs.password)}
			/>

			<SignInButtonContainer>
				<Button
					buttonType={BtnTypes.SignIn}
					text="Sign In"
					type={ButtonTypes.submit}
					isLoading={isLoading}
				/>
			</SignInButtonContainer>
		</SignInContainer>
	)
}
