import React, { ReactElement } from "react"
import styled from "styled-components"

import { ListItem } from "../list-item/list-item"

import { changeListItem } from "../../utils/firebase"

interface Props {
	listItems?: Item[]
	changeItem: (item: Item) => void
}

const ListItemsContainer = styled.div`
	padding: 13px 0 67px 0;
`

export const ListItems = ({
	listItems,
	changeItem
}: Props): ReactElement => {
	const toggleCheckItem = (item: Item): (() => void) => (): void => {
		const newItem = JSON.parse(JSON.stringify(item))
		newItem.isChecked = !newItem.isChecked

		changeListItem(newItem, "RKIS9avcsuajAtOIyi7J", listItems || [])
			.then((data) => {
				console.log(data)
				changeItem(newItem)
			})
	}

	return (
		<ListItemsContainer>
			{!listItems ? "Loading..." : (<>
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
