import React, { ReactElement } from "react"
import styled from "styled-components"

import { ListItem } from "../list-item/list-item"
import { ListItemsMessage } from "./list-items-message"

import { changeListItem, deleteListItem } from "../../utils/firebase"
import { sortItems } from "../../utils/utils"
import { ItemsSort } from "../../utils/enums" 
import { breakpoints } from "../../utils/styles"

interface Props {
	listItems: Item[] | undefined
	listId: string | undefined
}

const ListItemsContainer = styled.div`
	padding: 13px 0 67px 0;
	margin: 0 auto;
	min-width: 272px;
	max-width: 540px;

	@media (min-width: ${breakpoints.lg}) {
		margin: 60px 0 0 0;
	}
`

const loadingText = "Loading..."
const noItemsText = "No Items were received"

export const ListItems = ({
	listItems,
	listId,
}: Props): ReactElement => {
	if (!listItems || listItems.length === 0) {
		const text = listItems ? noItemsText : loadingText
		return (
			<ListItemsContainer>
				<ListItemsMessage text={text} />
			</ListItemsContainer>
		)
	}

	const sortedListItems = sortItems(listItems, ItemsSort.createdAt)

	return (
		<ListItemsContainer>
			{sortedListItems.map((item: Item): ReactElement => {
				const deleteItem = listId && item.id ?
					deleteListItem.bind({}, listId, item.id) : undefined

				const toggleCheckItem = listId && item.id ? 
					changeListItem.bind(
						{},
						{ isChecked: !item.isChecked },
						listId,
						item.id
					) : undefined

				return <ListItem
					name={item.name}
					isChecked={item.isChecked}
					key={item.id}
					toggleCheckItem={toggleCheckItem}
					deleteItem={deleteItem}
				/>
			})}
		</ListItemsContainer>
	)
}
