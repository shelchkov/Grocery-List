import React, { ReactElement } from "react"
import styled from "styled-components"

import { CheckedIcon } from "./checked-icon"
import { UncheckedIcon } from "./unchecked-icon"

import { sizes, colors } from "../../utils/styles"

interface Props {
	name: string
	isChecked: boolean
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

export const ListItem = ({ name, isChecked }: Props): ReactElement => (
	<ItemContainer>
		{isChecked ? <CheckedIcon /> : <UncheckedIcon />}
		<NameContainer>{name}</NameContainer>
	</ItemContainer>
)
