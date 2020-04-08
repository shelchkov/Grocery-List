import React, { ReactElement } from "react"
import styled from "styled-components"

import { Button } from "../button/button"

import { colors, sizes } from "../../utils/styles"
import { BtnTypes } from "../../utils/enums"
import { signOut } from "../../utils/firebase"

const ActionsContainer = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;

	display: flex;
	justify-content: space-between;

	height: ${sizes[2]};
	padding: 13px 1.5rem;

	background-color: ${colors.purple};
`

const handleSignOut = (): void => {
	signOut().then(console.log)
		.catch(console.log)
}

export const Actions = (): ReactElement => (
	<ActionsContainer>
		<Button buttonType={BtnTypes.ShareList} text="Share List" />
		<Button
			buttonType={BtnTypes.SignOut}
			text="Sign Out"
			clickHandler={handleSignOut}
		/>
	</ActionsContainer>
)
