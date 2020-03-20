import React, { ReactElement, useState } from "react"

import { Button } from "../button/button"

import { BtnTypes } from "../../utils/enums"

export const AddNewItemForm = (): ReactElement => {
	const [isFormActive, setIsFormActive] = useState<boolean>()
	
	const handleClick = (): void => {
		setIsFormActive(true)
	}

	const handleAddingNewItem = (): void => {
		setIsFormActive(false)
	}

	return (
		<form>
			{isFormActive ? (
				<Button
					text="+"
					buttonType={BtnTypes.Plus}
					clickHandler={handleClick}
				/>
			) : (
				<Button
					text="Add New Item"
					buttonType={BtnTypes.AddNewItem}
					clickHandler={handleAddingNewItem}
				/>
			)}
		</form>
	)
}
