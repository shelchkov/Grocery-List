import React, { ReactElement } from "react"
import styled from "styled-components"
import { colors, sizes, spaces, boxShadows } from "../../utils/styles"

import { BtnTypes } from "../../utils/enums"

interface Props {
	text: string
	buttonType: BtnTypes
	clickHandler?: () => void
}

const ButtonBase = styled.button`
	height: ${sizes[1]};
	color: ${colors.grey};

	border: none;
	border-radius: ${spaces[0]};
	box-shadow: ${boxShadows[0]};

	font-family: 'Oxygen';
	font-weight: 400;
	font-size: ${sizes[0]};

	outline: none;
	cursor: pointer;
`

const AddNewItemBtn = styled(ButtonBase)`
	width: 150px;
	background-color: ${colors.green};
`

export const Button = ({
	text, 
	buttonType,
	clickHandler,
}: Props): ReactElement | null => {

	const BtnComponent = ((): any => {
		switch(buttonType) {
			case BtnTypes.AddNewItem:
				return AddNewItemBtn
		}
	})()

	return <BtnComponent onClick={clickHandler}>{text}</BtnComponent>
}
