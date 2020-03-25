import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { AddNewItemButtons } from "./add-new-item-buttons"
import { Input } from "../input/input"

const FormContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`

export const AddNewItemForm = (): ReactElement => {
	const [isFormActive, setIsFormActive] = useState<boolean>(false)
	
	const setFormActive = (): void => {
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
				{isFormActive && <Input placeholder="New Item" />}
				<AddNewItemButtons
					isFormActive={isFormActive}
					setFormActive={setFormActive}
				/>
			</FormContainer>
		</form>
	)
}
