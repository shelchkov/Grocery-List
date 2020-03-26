import React, { ReactElement } from "react"
import styled from "styled-components"
import { colors, sizes, spaces, boxShadows, fontWeights } from "../../utils/styles"

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

const AddNewItemBtn = styled(ButtonBase)`
	width: 150px;
	background-color: ${colors.green};
`

const PlusBtn = styled(AddNewItemBtn)`
	width: ${sizes[2]};
	margin-left: 1rem;
	font-size: ${sizes[1]};
`

const buttons = {
	[BtnTypes.AddNewItem]: AddNewItemBtn,
	[BtnTypes.Plus]: PlusBtn,
}

export const Button = ({
	text, 
	buttonType,
	clickHandler,
	type,
}: Props): ReactElement | null => {

	const BtnComponent = buttons[buttonType]

	return <BtnComponent onClick={clickHandler} type={type}>{text}</BtnComponent>
}
