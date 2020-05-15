import React, { ReactElement, useState } from "react"

import { AddNewItemButtons } from "./add-new-item-buttons"
import { Input } from "../input/input"
import { NewItemFormContainer } from "../ui/containers"

import { addListItem } from "../../utils/firebase"
import { NewItemFormData, AddNewItemInputs } from "../../utils/validation"

interface Props {
	userId: string | undefined
	listId: string | undefined
	style?: Styles
	isActive?: boolean
	buttonsStyle?: Styles
	inputStyle?: Styles
	canAddNewItem?: boolean
}

export const AddNewItemForm = ({
	userId,
	listId,
	style,
	isActive,
	buttonsStyle,
	inputStyle,
	canAddNewItem,
}: Props): ReactElement => {
	const [isFormActive, setIsFormActive] = useState<boolean>(
		isActive || false
	)
	const [formData, setFormData] = useState<NewItemFormData>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	
	const setFormActive = (): void => {
		setIsFormActive(true)
	}

	const handleAddingNewItem = (
		event: React.FormEvent<HTMLFormElement>
	): void => {
		event.preventDefault()

		if (!formData || !formData.name || !userId ||
			canAddNewItem === false
		) {
			if (!formData || !formData.name) {
				console.warn("Item name was not provided")
			}

			if (!userId) {
				console.warn("Not logged in")
			}

			if (canAddNewItem === false) {
				console.warn("User doesn't have access.")
			}

			!isActive && setIsFormActive(false)
			return
		}

		setIsLoading(true)

		addListItem(formData.name, userId, listId)
			.then((data): void => {
				if (!data.listId) {
					console.log(
						`New item was added - ${formData.name}`
					)
				} else {
					console.log(`New list was created - ${data.listId}`)
				}

				!isActive && setIsFormActive(false)
				setIsLoading(false)
				setFormData(undefined)
			})
	}

	const handleInputChange = (name: AddNewItemInputs) => (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => 
		setFormData({ ...formData, [name]: event.currentTarget.value })

	return (
		<NewItemFormContainer
			onSubmit={handleAddingNewItem}
			{...(style as any)}
		>
			{isFormActive && <Input
				placeholder="New Item"
				onChange={handleInputChange(AddNewItemInputs.name)}
				errorMessage={null}
				style={{ ...inputStyle, width: "fill-available" }}
				value={formData && formData.name}
			/>}
			<AddNewItemButtons
				isFormActive={isFormActive}
				setFormActive={setFormActive}
				isLoading={isLoading}
				style={buttonsStyle}
				shouldSubmit={isActive}
				handleSubmit={handleAddingNewItem}
			/>
		</NewItemFormContainer>
	)
}
