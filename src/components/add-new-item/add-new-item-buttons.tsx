import React, { ReactElement } from "react"

import { Button } from "../button/button"
import { PlusButton } from "./plus-button"

import { BtnTypes, ButtonTypes } from "../../utils/enums"

interface Props {
	isFormActive: boolean
	setFormActive: () => void
	isLoading: boolean
	style?: Styles
	shouldSubmit?: boolean
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const AddNewItemButtons = ({
	isFormActive,
	setFormActive,
	isLoading,
	style,
	shouldSubmit,
	handleSubmit,
}: Props): ReactElement => !shouldSubmit && isFormActive ? (
	<PlusButton
		text="+"
		isLoading={isLoading}
		handleClick={handleSubmit}
	/>
) : (
	<Button
		text="Add New Item"
		buttonType={BtnTypes.AddNewItem}
		clickHandler={setFormActive}
		type={shouldSubmit ? ButtonTypes.submit : ButtonTypes.button}
		style={style}
		isLoading={isLoading}
	/>
)
