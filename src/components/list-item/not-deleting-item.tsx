import React, { ReactElement } from "react"
import styled from "styled-components"

import { CheckedIcon } from "./checked-icon"
import { UncheckedIcon } from "./unchecked-icon"
import { ItemName } from "./item-name"
import { Button } from "../button/button"

import { BtnTypes } from "../../utils/enums"

interface Props {
	handleToggle: () => void
	isChecked: boolean
	name: string
	startDeleting: () => void
}

const IconContainer = styled.div`
	height: 26px;
	margin-right: 13px;
	cursor: pointer;
`

export const NotDeletingItem = ({
	handleToggle,
	isChecked,
	name,
	startDeleting
}: Props): ReactElement => (
	<>
		<IconContainer
			onClick={handleToggle}
			title={isChecked ? "Uncheck Item" : "Check Item"}
		>
			{isChecked ? <CheckedIcon /> : <UncheckedIcon />}
		</IconContainer>

		<ItemName>{name}</ItemName>
		<Button
			text="Delete"
			buttonType={BtnTypes.DeleteItem}
			clickHandler={startDeleting}
			style={{ boxShadow: "none" }}
		/>
	</>
)
