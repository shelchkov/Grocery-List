import React, { ReactElement } from "react"

import { Button } from "../button/button"

import { BtnTypes, ButtonTypes } from "../../utils/enums"

interface Props {
	isFormActive: boolean
	setFormActive: () => void
	isLoading: boolean
	style?: Styles
}

export const AddNewItemButtons = ({
	isFormActive,
	setFormActive,
	isLoading,
	style
}: Props): ReactElement => isFormActive ? (
	<Button
		text="+"
		buttonType={BtnTypes.Plus}
		type={ButtonTypes.submit}
		isLoading={isLoading}
		style={style}
	/>
) : (
	<Button
		text="Add New Item"
		buttonType={BtnTypes.AddNewItem}
		clickHandler={setFormActive}
		type={ButtonTypes.button}
		style={style}
	/>
)
