import React, { ReactElement, useState, useEffect } from "react"

import { Header } from "../components/header/header"
import {
	AddNewItemForm
} from "../components/add-new-item/add-new-item.form"
import {
	AddNewItemDesktop
} from "../components/add-new-item/add-new-item-desktop"
import { Actions } from "../components/actions/actions"
import { ListItems } from "../components/list-items/list-items"
import { Container, ListContainer } from "../components/ui/containers"

import { useListsFetch } from "../effects/use-lists-fetch.effect"
import { useUserInfoFetch } from "../effects/use-user-info-fetch.effect"
import { ListAccess } from "../utils/enums"
import { checkAccess } from "../utils/utils"
import { updateUserCurrentList } from "../utils/firebase"

interface Props {
	user: User | null
	clearUser: () => void
}

const defaultListIndex = 0

export const MainPage = ({ user, clearUser }: Props): ReactElement => {
	const [listId, setListId]= useState<string>()
	const { lists } = useListsFetch(listId)
	const userInfo = useUserInfoFetch(user ? user.id : undefined)
	const [isCreatingNewList, setIsCreatingNewList] = useState(false)

	useEffect((): void => {
		if (!userInfo) {
			return
		}

		const currentList = userInfo.currentList
		const userLists = userInfo.lists

		if (currentList && userLists.includes(currentList) &&
			listId !== currentList) {
			console.log(`Current user's list is ${currentList}`)
			setListId(currentList)

			return
		}

		const defaultList = userLists[defaultListIndex]
		console.log(`Current list isn't provided - using ${defaultList}`)
		defaultList !== listId && setListId(defaultList)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInfo])

	useEffect((): void => {
		console.log(lists)
	}, [lists])

	useEffect((): (() => void) => {
		return (): void => {
			if (userInfo && listId && userInfo.currentList !== listId) {
				console.log(`Updating selected user list - ${listId}`)
				updateUserCurrentList(user!.id, listId)
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInfo, listId])

	const canAddNewItem = lists && listId && lists[listId] ?
		checkAccess(
			ListAccess.add,
			lists[listId].access as ListAccess[]
		) : undefined

	const userId = user ? user.id : undefined

	const listItems = ((): Item[] | undefined => {
		if (isCreatingNewList) {
			return []
		}

		return lists && listId ?
			lists[listId] && lists[listId].items
			: undefined
	})()

	const listAccess = ((): ListAccess[] | undefined => {
		if (isCreatingNewList) {
			return [ListAccess.check, ListAccess.add, ListAccess.remove]
		}

		return lists && listId ?
			lists[listId] &&
			lists[listId].access as ListAccess[]
			: undefined
	})()

	const createNewList = (): void => {
		setListId(undefined)
		setIsCreatingNewList(true)
	}

	const setNewListId = (listId: string): void => {
		setListId(listId)
		setIsCreatingNewList(false)
	}

	const switchToList = (move: number): string | undefined => {
		console.log("Attempt to switch list")

		if (!userInfo) {
			console.log("User info wasn't provided")

			return ""
		}

		const userLists = userInfo.lists

		const currentListIndex = userLists.findIndex(
			(list: string): boolean => list === listId
		)

		const newList = userLists[currentListIndex === -1 ?
			userLists.length - 1 : currentListIndex + move
		]

		if (!newList) {
			return
		}

		console.log(`Switching to ${newList} from ${
			userLists[currentListIndex]
		}`)

		newList && setListId(newList)

		return newList
	}

	const isFirstList = ((): boolean | undefined => {
		if (!userInfo) {
			return
		}

		return userInfo.lists.findIndex((list: string): boolean =>
			list === listId) === 0
	})()

	return (
		<Container>
			<Header clearUser={clearUser} />

			<AddNewItemForm
				userId={userId}
				listId={listId}
				style={{
					display: ["flex", "flex", "none"],
					marginTop: "20px"
				}}
				canAddNewItem={canAddNewItem}
				listItems={listItems}
				setNewListId={setNewListId}
			/>

			<ListContainer>
				<ListItems
					listItems={listItems}
					listId={listId}
					access={listAccess}
				/>

				<AddNewItemDesktop
					userId={userId}
					listId={listId}
					style={{ display: ["none", "none", "flex"] }}
					canAddNewItem={canAddNewItem}
					listItems={listItems}
					setNewListId={setNewListId}
				 />
			</ListContainer>

			<Actions
				clearUser={clearUser}
				createNewList={createNewList}
				switchToList={switchToList}
				isFirstList={isFirstList}
			/>
		</Container>
	)
}
