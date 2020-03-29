import React, { ReactElement } from "react"
import styled from "styled-components"

import { ListItem } from "../list-item/list-item"

interface Props {
	listItems?: Item[]
}

const ListItemsContainer = styled.div`
	padding: 13px 0 67px 0;
`

export const ListItems = ({ listItems }: Props): ReactElement => (
	<ListItemsContainer>
		{!listItems ? "Loading..." : (<>
			{listItems.length === 0 ?
				"No Items were received"
			: (
				listItems.map((item: Item, index: number): ReactElement =>
					<ListItem
						name={item.name}
						isChecked={item.isChecked}
						key={index}
					/>
				)
			)}
		</>)}
	</ListItemsContainer>
)
