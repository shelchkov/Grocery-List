import React, { ReactElement, useState, useEffect } from "react"
import styled from "styled-components"

import { Logo } from "../components/logo/logo"
import { AddNewItemForm } from "../components/add-new-item/add-new-item.form"
import { Actions } from "../components/actions/actions"
import { ListItems } from "../components/list-items/list-items"

import { spaces, colors } from "../utils/styles"
import { getListItems, getUserInfo, createId } from "../utils/firebase"
import { ListAccess } from "../utils/enums"

interface Props {
	user: User | null
}

const Container = styled.div`
	min-height: 100vh;

	padding-left: ${spaces[1]};
	padding-right: ${spaces[1]};

	background-color: ${colors.grey};
`

const currentList = 0

export const MainPage = ({ user }: Props): ReactElement => {
	const [lists, setLists] = useState<List[]>()

	useEffect((): void => {
		if (!user || (lists && lists.length > 0)) {
			return
		}

		getUserInfo(user.id).then((userInfo?: UserInfo): void => {
			if (!userInfo || !userInfo.lists) {
				return
			}

			const listId = userInfo.lists[currentList]

			getListItems(listId)
				.then((data?: List): void => {
					console.log(data)
					if (data && data.items) {
						setLists([
							...(lists || []),
							{
								items: data.items,
								id: listId,
								access: [ListAccess.check]
							}
						])
					}
				})
		})
	}, [user])

	const changeItem = (item: Item): void => {
		if (!lists) {
			return
		}

		setLists([
			...lists.filter((list: List): boolean => 
				list.id !== lists[currentList].id
			),
			{
				id: lists[currentList].id,
				access: lists[currentList].access,
				items: [
					...lists[currentList].items.filter((cur): boolean =>
						cur.id !== item.id
					),
					item
				]
			}
		])
	}

	useEffect((): void => {
		console.log(lists)
	}, [lists])

	return (
		<Container>
			<Logo />
			<AddNewItemForm
				userId={user ? user.id : undefined}
				listId={lists && lists[currentList].id}
				addNewItem={changeItem}
			/>
			<ListItems
				listItems={lists && lists[currentList] ?
					lists[currentList].items : undefined
				}
				changeItem={changeItem}
			/>
			<Actions />
		</Container>
	)
}
