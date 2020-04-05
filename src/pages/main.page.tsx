import React, { ReactElement, useState, useEffect } from "react"
import styled from "styled-components"

import { Logo } from "../components/logo/logo"
import { AddNewItemForm } from "../components/add-new-item/add-new-item.form"
import { Actions } from "../components/actions/actions"
import { ListItems } from "../components/list-items/list-items"

import { spaces, colors } from "../utils/styles"
import { getUserInfo, getListItemsSubscribe } from "../utils/firebase"
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

const currentList = 1

export const MainPage = ({ user }: Props): ReactElement => {
	const [lists, setLists] = useState<{ [key: string]: List }>()
	const [listId, setListId]= useState<string>()

	useEffect((): void => {
		if (!user || Object.keys(lists || {}).length > 0) {
			return
		}

		getUserInfo(user.id).then((userInfo?: UserInfo): void => {
			if (!userInfo || !userInfo.lists) {
				return
			}

			const currentListId = userInfo.lists[currentList]
			setListId(currentListId)

			console.log(userInfo)

			// getListItems(currentListId)
			// 	.then((data?: List): void => {
			// 		console.log(data)
			// 		if (data && data.items) {
			// 			setLists({
			// 				...lists,
			// 				[currentListId]: {
			// 					items: data.items,
			// 					id: currentListId,
			// 					access: [ListAccess.check]
			// 				}
			// 			})
			// 		}
			// 	})

			const { unsubscribe } = getListItemsSubscribe(currentListId, (items: Item[]): void => {
				console.log("Items were changed")
				console.log(items)

				setLists({
					...lists,
					[currentListId]: {
						items: items,
						id: currentListId,
						access: [ListAccess.check]
					}
				})
			})
		})
	}, [user])

	const changeItem = (item: Item): void => {
		if (!lists || !listId) {
			return
		}

		// setLists({
		// 	...lists,
		// 	[listId]: {
		// 		id: lists[listId].id,
		// 		access: lists[listId].access,
		// 		items: [
		// 			...lists[listId].items.filter((cur): boolean =>
		// 				cur.id !== item.id
		// 			),
		// 			item
		// 		]
		// 	}
		// })
	}

	useEffect((): void => {
		console.log(lists)
	}, [lists])

	return (
		<Container>
			<Logo />
			<AddNewItemForm
				userId={user ? user.id : undefined}
				listId={listId}
				addNewItem={changeItem}
			/>
			<ListItems
				listItems={lists && listId ?
					lists[listId] && lists[listId].items : undefined}
				changeItem={changeItem}
				listId={listId}
			/>
			<Actions />
		</Container>
	)
}
