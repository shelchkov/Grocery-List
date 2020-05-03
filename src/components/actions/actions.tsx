import React, { ReactElement, useEffect } from "react"

import { ActionsContainer } from "../ui/containers"
import { Button } from "../button/button"

import { useSignOut } from "../../effects/use-sign-out.effect"
import { BtnTypes } from "../../utils/enums"
import { colors } from "../../utils/styles"

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
					isDisabled
				/>
			</ActionsContainer>
		</>
	)
}
