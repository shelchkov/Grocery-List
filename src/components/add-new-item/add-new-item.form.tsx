import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { AddNewItemButtons } from "./add-new-item-buttons"
import { Input } from "../input/input"

import { addListItem } from "../../utils/firebase"

interface Props {
	userId: string | undefined
	listId: string | undefined
	style?: Styles
	isActive?: boolean
	buttonsStyle?: Styles
	inputStyle?: Styles
}

const FormContainer = styled.form`
	display: flex;
	flex-direction: ${(p: Styles): string => p.flexDirection || "row"};
	justify-content: flex-end;
	align-items: ${(p: Styles): string => p.alignItems || "stretch"};
	max-width: 272px;
	height: ${(p: Styles): string => p.height || "34px"};
	margin-left: auto;
	margin-top: ${(p: Styles): string => p.marginTop || "0"};
	padding: ${(p: Styles): string => p.padding || "0"};

	background-color: ${(p: Styles): string => p.backgroundColor ||
		"transparent"};
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
	style,
	isActive,
	buttonsStyle,
	inputStyle
}: Props): ReactElement => {
	const [isFormActive, setIsFormActive] = useState<boolean>(
		isActive || false
	)
	const [formData, setFormData] = useState<FormData>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	
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
			}).catch((e) => {
				console.error("Error while adding new item", e)
			}).finally(() => {
				!isActive && setIsFormActive(false)
				setIsLoading(false)
				console.log("Clear Form")
				setFormData(undefined)
			})
	}

	const handleInputChange = (name: AddNewItemInputs) => (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => 
		setFormData({ ...formData, [name]: event.currentTarget.value })

	return (
		<FormContainer onSubmit={handleAddingNewItem} {...style}>
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
			/>
		</FormContainer>
	)
}
