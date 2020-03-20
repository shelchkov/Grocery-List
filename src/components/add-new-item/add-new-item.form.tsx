import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { AddNewItemButtons } from "./add-new-item-buttons"

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
				<AddNewItemButtons
					isFormActive={isFormActive}
					setFormActive={setFormActive}
				/>
			</FormContainer>
		</form>
	)
}
