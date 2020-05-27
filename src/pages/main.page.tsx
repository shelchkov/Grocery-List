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

const defaultCurrentList = 0

export const MainPage = ({ user, clearUser }: Props): ReactElement => {
	const [listId, setListId]= useState<string>()
	const { lists } = useListsFetch(listId)
	const userInfo = useUserInfoFetch(user ? user.id : undefined)

	useEffect((): void => {
		if (!userInfo) {
			return
		}

		const currentList = userInfo.currentList
		const userLists = userInfo.lists

		if (currentList && userLists.includes(currentList)) {
			console.log(`Current user's list is ${currentList}`)
			setListId(currentList)
		}

		const defaultList = userLists[defaultCurrentList]
		console.log(`Current list isn't provided - using ${defaultList}`)
		setListId(defaultList)
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

	return (
		<Container>
			<Header clearUser={clearUser} />

			<AddNewItemForm
				userId={user ? user.id : undefined}
				listId={listId}
				style={{
					display: ["flex", "flex", "none"],
					marginTop: "20px"
				}}
				canAddNewItem={lists && listId && lists[listId] ?
					checkAccess(
						ListAccess.add,
						lists[listId].access as ListAccess[]
					) : undefined}
			/>

			<ListContainer>
				<ListItems
					listItems={lists && listId ?
						lists[listId] && lists[listId].items
						: undefined}
					listId={listId}
					access={lists && listId ?
						lists[listId] &&
						lists[listId].access as ListAccess[]
						: undefined}
				/>

				<AddNewItemDesktop
					userId={user ? user.id : undefined}
					listId={listId}
					style={{ display: ["none", "none", "flex"] }}
					canAddNewItem={lists && listId && lists[listId] ?
					checkAccess(
						ListAccess.add,
						lists[listId].access as ListAccess[]
					) : undefined}
				 />
			</ListContainer>

			<Actions clearUser={clearUser} />
		</Container>
	)
}
