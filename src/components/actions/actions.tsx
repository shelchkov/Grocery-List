import React, { ReactElement, useEffect } from "react"

import { Button } from "../button/button"
import { MobileLayout, MediumDesktopLayout } from "../ui/layouts"
import { ActionsContainer } from "./actions-container"

import { colors } from "../../utils/styles"
import { BtnTypes } from "../../utils/enums"
import { useSignOut } from "../../effects/use-sign-out.effect"

interface Props {
	clearUser: () => void
}

export const Actions = ({ clearUser }: Props): ReactElement => {
	const { isLoading, isSuccess, startSignOut } = useSignOut()

	useEffect((): void => {
		isSuccess && clearUser()
	// eslint-disable-next-line
	}, [isSuccess])

	return (
		<>
			<MobileLayout>
				<ActionsContainer>				
					<Button
						buttonType={BtnTypes.ShareList}
						text="Share List"
						isDisabled
					/>
					<Button
						buttonType={BtnTypes.SignOut}
						text="Sign Out"
						clickHandler={startSignOut}
						isLoading={isLoading}
					/>
				</ActionsContainer>
			</MobileLayout>

			<MediumDesktopLayout>
				<ActionsContainer backgroundColor={colors.grey}>
					<Button
						text="< Previous List"
						buttonType={BtnTypes.DesktopAction}
						isDisabled
					/>
					<Button
						text="Next List >"
						buttonType={BtnTypes.DesktopAction}
						isDisabled
					/>
				</ActionsContainer>
			</MediumDesktopLayout>
		</>
	)
}
