import React, { ReactElement } from "react"
import styled from "styled-components"

import { ListItem } from "../list-item/list-item"
import { ListItemsMessage } from "./list-items-message"

import { changeListItem, deleteListItem } from "../../utils/firebase"

interface Props {
	listItems: Item[] | undefined
	listId: string | undefined
}

const ListItemsContainer = styled.div`
	padding: 13px 0 67px 0;
`

const loadingText = "Loading..."
const noItemsText = "No Items were received"

export const ListItems = ({
	listItems,
	listId,
}: Props): ReactElement => {
	const toggleCheckItem = (item: Item): (() => void) => (): void => {
		if (!listId) {
			console.warn("Can't change item status - No list id")
			return
		}

		if (!item.id) {
			console.warn("Can't change item status - No item id")
			return
		}

		changeListItem({ isChecked: !item.isChecked }, listId, item.id)
			.then((data) => {
				console.log(`${item.name} was ${item.isChecked ?
					"unchecked" : "checked"}`)
			})
			.catch(e => console.error("Couldn't change item status"))
	}

	if (!listItems || listItems.length === 0) {
		const text = listItems ? noItemsText : loadingText
		return (
			<ListItemsContainer>
				<ListItemsMessage text={text} />
			</ListItemsContainer>
		)
	}

	return (
		<ListItemsContainer>
			{listItems.map((item: Item): ReactElement => {
				const deleteItem = listId && item.id ?
					deleteListItem.bind({}, listId, item.id) : undefined

				return <ListItem
					name={item.name}
					isChecked={item.isChecked}
					key={item.id}
					toggleCheckItem={toggleCheckItem(item)}
					deleteItem={deleteItem}
				/>
			})}
		</ListItemsContainer>
	)
}
