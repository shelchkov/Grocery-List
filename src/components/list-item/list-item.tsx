import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { DeletingItem } from "./deleting-item"
import { NotDeletingItem } from "./not-deleting-item"

import { Response } from "../../utils/firebase"

interface Props {
	name: string
	isChecked: boolean
	toggleCheckItem?: () => Promise<Response>
	deleteItem?: () => Promise<Response>
}

const ItemContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 14px;
`

export const ListItem = ({
	name,
	isChecked,
	toggleCheckItem,
	deleteItem
}: Props): ReactElement => {
	const [isDeleting, setIsDeleting] = useState<boolean>(false)

	const startDeleting = (): void => setIsDeleting(true)

	const stopDeleting = (): void => setIsDeleting(false)

	const handleDelete = (): void => {
		if (!deleteItem) {
			console.warn("No item id or list id was provided")

			return 
		}

		deleteItem().then(({ error }): void => {
			error && console.error("Error while deleting item:", error)
			error && setIsDeleting(false)
		})
	}

	const handleToggle = (): void => {
		if (!toggleCheckItem) {
			console.warn("Couldn't change item - No list id or item id")

			return
		}

		toggleCheckItem()
			.then((data) => {
				data.error ? console.error("Couldn't change item status")
				: console.log(`${name} was ${isChecked ?
					"unchecked" : "checked"}`)
			})
	}

	return (
		<ItemContainer>
			{isDeleting ? (
				<DeletingItem
					handleDelete={handleDelete}
					stopDeleting={stopDeleting}
				/>
			) : (
				<NotDeletingItem
					handleToggle={handleToggle}
					isChecked={isChecked}
					name={name}
					startDeleting={startDeleting}
				/>
			)}
		</ItemContainer>
	)
}
