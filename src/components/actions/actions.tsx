import React, { ReactElement, useEffect } from "react"

import { ActionsContainer } from "../ui/containers"
import { Button } from "../button/button"

import { useSignOut } from "../../effects/use-sign-out.effect"
import { BtnTypes } from "../../utils/enums"
import { colors } from "../../utils/styles"

interface Props {
	clearUser: () => void
	createNewList?: () => void
	switchToList?: (move: number) => void
	isFirstList?: boolean
}

export const Actions = ({
	clearUser,
	createNewList,
	switchToList,
	isFirstList,
}: Props): ReactElement => {
	const { isLoading, isSuccess, startSignOut } = useSignOut()

	useEffect((): void => {
		isSuccess && clearUser()
	// eslint-disable-next-line
	}, [isSuccess])

	const handleNextBtnClick = (): void => {
		if (!switchToList) {
			return
		}

		const nextList = switchToList(1)

		if (nextList === undefined && createNewList) {
			createNewList()
		}
	}

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
					isDisabled={isFirstList}
				/>
				<Button
					text="Next List >"
					buttonType={BtnTypes.DesktopAction}
					clickHandler={handleNextBtnClick}
				/>
			</ActionsContainer>
		</>
	)
}
