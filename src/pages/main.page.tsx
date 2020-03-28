import React, { ReactElement, useState, useEffect } from "react"
import styled from "styled-components"

import { Logo } from "../components/logo/logo"
import { AddNewItemForm } from "../components/add-new-item/add-new-item.form"
import { Actions } from "../components/actions/actions"
import { ListItem } from "../components/list-item/list-item"

import { spaces, colors } from "../utils/styles"
import { getListItems } from "../utils/firebase"

interface Props {
	user: User | null
}

const Container = styled.div`
	min-height: 100vh;

	padding-left: ${spaces[1]};
	padding-right: ${spaces[1]};

	background-color: ${colors.grey};
`

export const MainPage = ({ user }: Props): ReactElement => {
	const [listItems, setListItems] = useState<Item[]>([])

	useEffect((): void => {
		user && listItems.length === 0 && getListItems("RKIS9avcsuajAtOIyi7J")
		.then((data?: { items?: Item[] }): void => {
			console.log(data)
			if (data && data.items) {
				setListItems(data.items)
			}
		})
	}, [user])

	return (
		<Container>
			<Logo />
			<AddNewItemForm user={user} listId="RKIS9avcsuajAtOIyi7J" />
			{listItems.map((item: Item, index: number): ReactElement => 
				<ListItem
					name={item.name}
					isChecked={item.isChecked}
					key={index}
				/>)
			}
			<Actions />
		</Container>
	)
}
