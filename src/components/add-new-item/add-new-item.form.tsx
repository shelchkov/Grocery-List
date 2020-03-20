import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { Button } from "../button/button"

import { BtnTypes, ButtonTypes } from "../../utils/enums"

const FormContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`

export const AddNewItemForm = (): ReactElement => {
	const [isFormActive, setIsFormActive] = useState<boolean>()
	
	const handleClick = (): void => {
		setIsFormActive(true)
	}

	const handleAddingNewItem = (
		event: React.FormEvent<HTMLFormElement>
	): void => {
		event.preventDefault()

		setIsFormActive(false)
	}

	return (
		<form onSubmit={handleAddingNewItem}>
			<FormContainer>
				{isFormActive ? (
					<Button
						text="+"
						buttonType={BtnTypes.Plus}
						type={ButtonTypes.submit}
					/>
				) : (
					<Button
						text="Add New Item"
						buttonType={BtnTypes.AddNewItem}
						clickHandler={handleClick}
						type={ButtonTypes.button}
					/>
				)}
			</FormContainer>
		</form>
	)
}
