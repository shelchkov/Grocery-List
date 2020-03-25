import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { AddNewItemButtons } from "./add-new-item-buttons"
import { Input } from "../input/input"

import { addListItem } from "../../utils/firebase"

interface Props {
	user: User | null
	listId: string
}

const FormContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`

enum AddNewItemInputs {
	name = "name"
}

interface FormData {
	[AddNewItemInputs.name]: string
}

export const AddNewItemForm = ({ user, listId }: Props): ReactElement => {
	const [isFormActive, setIsFormActive] = useState<boolean>(false)
	const [formData, setFormData] = useState<FormData>()
	
	const setFormActive = (): void => {
		setIsFormActive(true)
	}

	const handleAddingNewItem = (
		event: React.FormEvent<HTMLFormElement>
	): void => {
		event.preventDefault()

		if (!formData || ! formData.name || !user) {
			return
		}

		addListItem(
			{
				name: formData.name,
				isChecked: false
			},
			user.id,
			listId
		).then((data): void => {
			console.log(data)
		}).catch((e) => {
			console.log(e)
		}).finally(() => setIsFormActive(false))
	}

	const handleInputChange = (name: AddNewItemInputs) => (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => 
		setFormData({ ...formData, [name]: event.currentTarget.value })

	return (
		<form onSubmit={handleAddingNewItem}>
			<FormContainer>
				{isFormActive && <Input
					placeholder="New Item"
					onChange={handleInputChange(AddNewItemInputs.name)}
				/>}
				<AddNewItemButtons
					isFormActive={isFormActive}
					setFormActive={setFormActive}
				/>
			</FormContainer>
		</form>
	)
}
