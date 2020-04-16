import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { AddNewItemButtons } from "./add-new-item-buttons"
import { Input } from "../input/input"

import { addListItem } from "../../utils/firebase"

interface Props {
	userId: string | undefined
	listId: string | undefined
}

const FormContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`

enum AddNewItemInputs {
	name = "name"
}

interface FormData {
	[AddNewItemInputs.name]?: string
}

export const AddNewItemForm = ({
	userId,
	listId,
}: Props): ReactElement => {
	const [isFormActive, setIsFormActive] = useState<boolean>(false)
	const [formData, setFormData] = useState<FormData>()
	
	const setFormActive = (): void => {
		setIsFormActive(true)
	}

	const handleAddingNewItem = (
		event: React.FormEvent<HTMLFormElement>
	): void => {
		event.preventDefault()

		if (!formData || !formData.name || !userId) {
			if (!formData || !formData.name) {
				console.warn("Item name was not provided")
			}

			if (!userId) {
				console.warn("Not logged in")
			}

			setIsFormActive(false)
			return
		}

		addListItem(formData.name, userId, listId)
			.then((data): void => {
				if (!data.listId) {
					console.log(
						`New item was added - ${formData.name}`
					)
				} else {
					console.log(`New list was created - ${data.listId}`)
				}
			}).catch((e) => {
				console.error("Error while adding new item", e)
			}).finally(() => 
				setIsFormActive(false)
			)
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
					errorMessage={null}
				/>}
				<AddNewItemButtons
					isFormActive={isFormActive}
					setFormActive={setFormActive}
				/>
			</FormContainer>
		</form>
	)
}
