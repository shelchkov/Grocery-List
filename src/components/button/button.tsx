import React, { ReactElement } from "react"

import { WithoutBgButton } from "./base-button"
import {
	AddNewItemBtn,
	ShareListBtn,
	SignOutBtn,
	DeleteItemBtn,
	NoBtn,
	DesktopActionBtn
} from "./styled-buttons"

import { BtnTypes, ButtonTypes } from "../../utils/enums"

interface Props {
	text: string
	buttonType: BtnTypes
	clickHandler?: () => void
	type?: ButtonTypes
	style?: Styles
	isLoading?: boolean
	isDisabled?: boolean
}

const buttons = {
	[BtnTypes.AddNewItem]: AddNewItemBtn,
	[BtnTypes.ShareList]: ShareListBtn,
	[BtnTypes.SignOut]: SignOutBtn,
	[BtnTypes.SignIn]: ShareListBtn,
	[BtnTypes.SignUp]: SignOutBtn,
	[BtnTypes.DeleteItem]: DeleteItemBtn,
	[BtnTypes.No]: NoBtn,
	[BtnTypes.MenuItem]: WithoutBgButton,
	[BtnTypes.DesktopAction]: DesktopActionBtn
}

export const Button = ({
	text, 
	buttonType,
	clickHandler,
	type = ButtonTypes.button,
	style,
	isLoading,
	isDisabled,
}: Props): ReactElement | null => {
	const BtnComponent = buttons[buttonType]

	return (
		<BtnComponent
			onClick={clickHandler}
			type={type}
			opacity={isDisabled ? "0.7" : "1"}
			cursor={isDisabled ? "default" : "pointer"}
			{...(style as any)}
		>
			{isLoading ? "Loading..." : text}
		</BtnComponent>
	)
}
