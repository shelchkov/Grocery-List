import React, { ReactElement, useState } from "react"

import { Button } from "../button/button"
import { MobileLayout, MediumDesktopLayout } from "../ui/layouts"
import { ActionsContainer } from "./actions-container"

import { colors } from "../../utils/styles"
import { BtnTypes } from "../../utils/enums"
import { signOut } from "../../utils/firebase"

interface Props {
	clearUser: () => void
}

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
					<Button
						text="< Previous List"
						buttonType={BtnTypes.DesktopAction}
					/>
					<Button
						text="Next List >"
						buttonType={BtnTypes.DesktopAction}
					/>
				</ActionsContainer>
			</MediumDesktopLayout>
		</>
	)
}
