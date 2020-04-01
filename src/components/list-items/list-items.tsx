import React, { ReactElement } from "react"
import styled from "styled-components"

import { ListItem } from "../list-item/list-item"

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

const LoadingContainer = styled.p`
	margin-top: 1.5rem;
	color: ${colors.lightGrey};
	font-size: 18px;
	text-align: center;
`

const loadingText = "Loading..."

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

		const newItem = JSON.parse(JSON.stringify(item))
		newItem.isChecked = !newItem.isChecked

		changeListItem(newItem, listId, listItems || [])
			.then((data) => changeItem(data as Item))
			.catch(e => console.error("Couldn't change item status"))
	}

	return (
		<ListItemsContainer>
			{!listItems ? <LoadingContainer>
				{loadingText}
			</LoadingContainer> : (<>
				{listItems.length === 0 ?
					"No Items were received"
				: (
					listItems.map(
						(item: Item, index: number): ReactElement =>
						<ListItem
							name={item.name}
							isChecked={item.isChecked}
							key={index}
							toggleCheckItem={toggleCheckItem(item)}
						/>
					)
				)}
			</>)}
		</ListItemsContainer>
	)
}
