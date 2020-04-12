import React, { ReactElement } from "react"

import { SignInContainer, SignInButtonContainer } from "../ui/container"
import { Input } from "../input/input"
import { Button } from "../button/button"

import { BtnTypes, ButtonTypes } from "../../utils/enums"

export const SignUpForm = (): ReactElement => (
	<form>
		<SignInContainer>
			<Input
				placeholder="Name"
				style={{ width: "fill-available" }}
			/>

			<Input
				placeholder="Email"
				style={{ width: "fill-available" }}
			/>

			<Input
				placeholder="Password"
				style={{ width: "fill-available" }}
			/>

			<SignInButtonContainer>
				<Button
					buttonType={BtnTypes.SignIn}
					text="Sign Up"
					type={ButtonTypes.submit}
				/>
			</SignInButtonContainer>
		</SignInContainer>
	</form>
)
