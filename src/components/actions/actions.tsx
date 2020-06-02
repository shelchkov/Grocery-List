import React, { ReactElement, useEffect } from "react"

import { ActionsContainer } from "../ui/containers"
import { Button } from "../button/button"

import { useSignOut } from "../../effects/use-sign-out.effect"
import { BtnTypes } from "../../utils/enums"
import { colors } from "../../utils/styles"

interface Props {
	clearUser: () => void
	isLastList?: boolean
}

export const Actions = ({
	clearUser,
	isLastList
}: Props): ReactElement => {
	const { isLoading, isSuccess, startSignOut } = useSignOut()

	useEffect((): void => {
		isSuccess && clearUser()
	// eslint-disable-next-line
	}, [isSuccess])

	const switchToNextList = isLastList ? (): void => {
		console.log("Creating new list")
	} : undefined

	return (
		<>
			<ActionsContainer display={["flex", "none"]}>
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

			<ActionsContainer
				display={["none", "flex"]}
				backgroundColor={colors.grey}
			>
				<Button
					text="< Previous List"
					buttonType={BtnTypes.DesktopAction}
					isDisabled
				/>
				<Button
					text="Next List >"
					buttonType={BtnTypes.DesktopAction}
					clickHandler={switchToNextList}
					isDisabled={!switchToNextList}
				/>
			</ActionsContainer>
		</>
	)
}
