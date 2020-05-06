import React, { ReactElement } from "react"
import styled from "styled-components"

import { LoadingMessage } from "../loading/loading-message"
import { ListItemsMessage } from "./list-items-message"
import { ListItem } from "../list-item/list-item"

import { breakpoints } from "../../utils/styles"
import { sortItems } from "../../utils/utils"
import { ItemsSort } from "../../utils/enums" 
import { deleteListItem, changeListItem } from "../../utils/firebase"

interface Props {
	listItems: Item[] | undefined
	listId: string | undefined
}

const ListItemsContainer = styled.div`
	padding: 13px 0 67px 0;
	margin: 0 auto;
	min-width: 272px;
	max-width: 540px;

	@media (min-width: ${breakpoints.sm}) {
		min-width: 483px;
		max-width: 650px;
	}

	@media (min-width: ${breakpoints.lg}) {
		margin: 47px 0 0 0;
		min-width: 640px;
		max-width: 640px;
	}
`

const noItemsText = "No Items were received"

export const ListItems = ({
	listItems,
	listId,
}: Props): ReactElement => {
	if (!listItems) {
		return (
			<ListItemsContainer>
				<LoadingMessage />
			</ListItemsContainer>
		)
	}

	if (listItems.length === 0) {
		return (
			<ListItemsContainer>
				<ListItemsMessage text={noItemsText} />
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
