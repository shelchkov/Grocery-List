import React, { ReactElement, useState, useEffect } from "react"

import { Logo } from "../components/logo/logo"
import {
	AddNewItemForm
} from "../components/add-new-item/add-new-item.form"
import { Actions } from "../components/actions/actions"
import { ListItems } from "../components/list-items/list-items"
import { Container } from "../components/ui/containers"

import { getUserInfo, getListItems } from "../utils/firebase"
import { ListAccess } from "../utils/enums"

interface Props {
	user: User | null
	clearUser: () => void
}

const currentList = 0

export const MainPage = ({ user, clearUser }: Props): ReactElement => {
	const [lists, setLists] = useState<{ [key: string]: List }>()
	const [listId, setListId]= useState<string>()

	useEffect((): (() => void) | void => {
		if (!user || Object.keys(lists || {}).length > 0) {
			return
		}

		let cleanUp: () => void

		getUserInfo(user.id).then((userInfo?: UserInfo): void => {
			if (!userInfo || !userInfo.lists) {
				return
			}

			const currentListId = userInfo.lists[currentList]
			setListId(currentListId)

			console.log(userInfo)

			const { unsubscribe } = getListItems(
				currentListId,
				(items: Item[]): void => {
					console.log("Items were received")
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

			cleanUp = unsubscribe
		})

		return (): void => {
			cleanUp && cleanUp()
		}
	// eslint-disable-next-line
	}, [user])

	useEffect((): void => {
		console.log(lists)
	}, [lists])

	return (
		<Container>
			<Logo />
			<AddNewItemForm
				userId={user ? user.id : undefined}
				listId={listId}
			/>
			<ListItems
				listItems={lists && listId ?
					lists[listId] && lists[listId].items : undefined}
				listId={listId}
			/>
			<Actions clearUser={clearUser} />
		</Container>
	)
}
