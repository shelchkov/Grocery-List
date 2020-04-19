import React, { ReactElement } from "react"
import styled from "styled-components"
import {
	colors,
	sizes,
	spaces,
	boxShadows,
	fontWeights
} from "../../utils/styles"

import { BtnTypes, ButtonTypes } from "../../utils/enums"

interface Props {
	text: string
	buttonType: BtnTypes
	clickHandler?: () => void
	type?: ButtonTypes
}

const ButtonBase = styled.button`
	height: ${sizes[2]};

	color: ${colors.grey};
	border: none;
	border-radius: ${spaces[0]};
	box-shadow: ${boxShadows[0]};

	font-weight: ${fontWeights[0]};
	font-size: ${sizes[0]};

	outline: none;
	cursor: pointer;
`

const OutlinedButton = styled(ButtonBase)`
	color: ${colors.orange};
	background-color: transparent;
	border: 1px solid ${colors.orange};
`

const AddNewItemBtn = styled(ButtonBase)`
	width: 150px;
	background-color: ${colors.green};
`

const PlusBtn = styled(AddNewItemBtn)`
	width: ${sizes[2]};
	margin-left: 12px;
	font-size: ${sizes[1]};
`

const ShareListBtn = styled(ButtonBase)`
	width: 130px;
	background-color: ${colors.darkGreen};
`

const SignOutBtn = styled(ShareListBtn)`
	background-color: ${colors.orange};
`

const DeleteItemBtn = styled(OutlinedButton)`
	height: 29px;
	margin-left: auto;
	padding: 0 14px;
`

const buttons = {
	[BtnTypes.AddNewItem]: AddNewItemBtn,
	[BtnTypes.Plus]: PlusBtn,
	[BtnTypes.ShareList]: ShareListBtn,
	[BtnTypes.SignOut]: SignOutBtn,
	[BtnTypes.SignIn]: ShareListBtn,
	[BtnTypes.SignUp]: SignOutBtn,
	[BtnTypes.DeleteItem]: DeleteItemBtn
}

export const Button = ({
	text, 
	buttonType,
	clickHandler,
	type = ButtonTypes.button,
}: Props): ReactElement | null => {
	const BtnComponent = buttons[buttonType]

	return (
		<BtnComponent
			onClick={clickHandler}
			type={type}
		>
			{text}
		</BtnComponent>
	)
}
