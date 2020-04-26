import React, { ReactElement } from "react"

import { WithoutBgButton } from "./base-button"
import {
	AddNewItemBtn,
	PlusBtn,
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
}

const buttons = {
	[BtnTypes.AddNewItem]: AddNewItemBtn,
	[BtnTypes.Plus]: PlusBtn,
	[BtnTypes.ShareList]: ShareListBtn,
	[BtnTypes.SignOut]: SignOutBtn,
	[BtnTypes.SignIn]: ShareListBtn,
	[BtnTypes.SignUp]: SignOutBtn,
	[BtnTypes.DeleteItem]: DeleteItemBtn,
	[BtnTypes.No]: NoBtn,
	[BtnTypes.MenuItem]: WithoutBgButton,
	[BtnTypes.DesktopAction]: DesktopActionBtn
}

const getLoadingText = (buttonType: BtnTypes): string => {
	if (buttonType === BtnTypes.Plus) {
		return "..."
	}

	return "Loading..."
}

export const Button = ({
	text, 
	buttonType,
	clickHandler,
	type = ButtonTypes.button,
	style,
	isLoading,
}: Props): ReactElement | null => {
	const BtnComponent = buttons[buttonType]

	return (
		<BtnComponent
			onClick={clickHandler}
			type={type}
			{...style}
		>
			{isLoading ? getLoadingText(buttonType) : text}
		</BtnComponent>
	)
}
