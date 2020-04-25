import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { Button } from "../button/button"
import { MobileLayout, MediumDesktopLayout } from "../ui/layouts"

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
	align-items: center;
	height: ${sizes[2]};
	padding: 13px 1.5rem;

	color: ${colors.darkBlue};
	background-color: ${(p: Styles): string => 
		p.backgroundColor || colors.purple};
`

const Action = styled.p`
	cursor: pointer;
`

export const Actions = ({ clearUser }: Props): ReactElement => {
	const [isLoading, setIsLoading] = useState<boolean>()

	const handleSignOut = (): void => {
		setIsLoading(true)
		signOut().then((data): void => {
			if (data.error) {
				setIsLoading(false)
				return
			}
			clearUser()
		})
	}

	return (
		<>
			<MobileLayout>
				<ActionsContainer>				
					<Button buttonType={BtnTypes.ShareList} text="Share List" />
					<Button
						buttonType={BtnTypes.SignOut}
						text="Sign Out"
						clickHandler={handleSignOut}
						isLoading={isLoading}
					/>
				</ActionsContainer>
			</MobileLayout>

			<MediumDesktopLayout>
				<ActionsContainer backgroundColor={colors.grey}>
					<Action>{"<"} Previous List</Action>
					<Action>Next List {">"}</Action>
				</ActionsContainer>
			</MediumDesktopLayout>
		</>
	)
}
