import React, { ReactElement, useState, useEffect } from "react"
import styled from "styled-components"

import { Logo } from "../components/logo/logo"
import { AddNewItemForm } from "../components/add-new-item/add-new-item.form"
import { Actions } from "../components/actions/actions"
import { ListItem } from "../components/list-item/list-item"

import { spaces, colors } from "../utils/styles"
import { getListItems, getUserInfo } from "../utils/firebase"

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
		if (!user || listItems.length > 0) {
			return
		}

		getUserInfo(user.id).then((data?: UserInfo): void => {
			if (!data || !data.lists) {
				return
			}

			getListItems(data.lists[0])
				.then((data?: List): void => {
					console.log(data)
					if (data && data.items) {
						setListItems(data.items)
					}
				})
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
