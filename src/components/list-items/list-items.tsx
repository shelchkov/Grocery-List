import React, { ReactElement } from "react"
import styled from "styled-components"

import { ListItem } from "../list-item/list-item"
import { ListItemsMessage } from "./list-items-message"

import { changeListItem } from "../../utils/firebase"
import { colors } from "../../utils/styles"

interface Props {
	listItems: Item[] | undefined
	changeItem: (item: Item) => void
	listId: string | undefined
}

const ListItemsContainer = styled.div`
	padding: 13px 0 67px 0;
`

const loadingText = "Loading..."
const noItemsText = "No Items were received"

export const ListItems = ({
	listItems,
	changeItem,
	listId,
}: Props): ReactElement => {
	const toggleCheckItem = (item: Item): (() => void) => (): void => {
		if (!listId) {
			console.warn("Can't change item status - No list id")
			return
		}

		if (!item.id) {
			console.warn("No item id")
			return
		}

		// const newItem = JSON.parse(JSON.stringify(item))
		// newItem.isChecked = !newItem.isChecked

		changeListItem({ isChecked: !item.isChecked }, listId, item.id)
			.then((data) => changeItem(data as Item))
			.catch(e => console.error("Couldn't change item status"))
	}

	return (
		<ListItemsContainer>
			{!listItems ? <ListItemsMessage text={loadingText} /> : (
				<>
					{listItems.length === 0 ? 
						<ListItemsMessage text={noItemsText} />
					: (
					listItems.map((item: Item): ReactElement =>
						<ListItem
							name={item.name}
							isChecked={item.isChecked}
							key={item.id}
							toggleCheckItem={toggleCheckItem(item)}
						/>)
					)}
				</>
			)}
		</ListItemsContainer>
	)
}
