import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { Button } from "../button/button"

import { colors, sizes } from "../../utils/styles"
import { BtnTypes } from "../../utils/enums"
import { signOut } from "../../utils/firebase"

interface Props {
	clearUser: () => void
}

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

export const Actions = ({ clearUser }: Props): ReactElement => {
	const [isLoading, setIsLoading] = useState<boolean>()

	const handleSignOut = (): void => {
		setIsLoading(true)
		signOut().then(clearUser).catch(console.log)
			.finally((): void => setIsLoading(false))
	}

	return (
		<ActionsContainer>
			<Button buttonType={BtnTypes.ShareList} text="Share List" />
			<Button
				buttonType={BtnTypes.SignOut}
				text="Sign Out"
				clickHandler={handleSignOut}
				isLoading={isLoading}
			/>
		</ActionsContainer>
	)
}
