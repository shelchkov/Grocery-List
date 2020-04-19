import React, { ReactElement } from "react"
import styled from "styled-components"

import { CheckedIcon } from "./checked-icon"
import { UncheckedIcon } from "./unchecked-icon"
import { Button } from "../button/button"

import { sizes, colors } from "../../utils/styles"
import { BtnTypes } from "../../utils/enums"

interface Props {
	name: string
	isChecked: boolean
	toggleCheckItem: () => void
}

const ItemContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 14px;
`

const NameContainer = styled.p`
	margin: 0 0 0 13px;
	color: ${colors.darkBlue};
	font-size: ${sizes[3]};
`

const IconContainer = styled.div`
	height: 26px;
`

export const ListItem = ({
	name,
	isChecked,
	toggleCheckItem
}: Props): ReactElement => (
	<ItemContainer>
		<IconContainer onClick={toggleCheckItem}>
			{isChecked ? <CheckedIcon /> : <UncheckedIcon />}
		</IconContainer>
		<NameContainer>{name}</NameContainer>
		<Button text="Delete" buttonType={BtnTypes.DeleteItem} />
	</ItemContainer>
)
