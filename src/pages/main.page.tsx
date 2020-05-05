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

interface Props {
	user: User | null
	clearUser: () => void
}

const currentList = 0

export const MainPage = ({ user, clearUser }: Props): ReactElement => {
	const [listId, setListId]= useState<string>()
	const { lists } = useListsFetch(listId)
	const userInfo = useUserInfoFetch(user ? user.id : undefined)

	useEffect((): void => {
		if (userInfo) {
			setListId(userInfo.lists[currentList])
		}
	}, [userInfo])

	useEffect((): void => {
		console.log(lists)
	}, [lists])

	return (
		<Container>
			<Header />

			<AddNewItemForm
				userId={user ? user.id : undefined}
				listId={listId}
				style={{
					display: ["flex", "flex", "none"],
					marginTop: "20px"
				}}
			/>

			<ListContainer>
				<ListItems
					listItems={lists && listId ?
						lists[listId] && lists[listId].items
						: undefined}
					listId={listId}
				/>

				<AddNewItemDesktop
					userId={user ? user.id : undefined}
					listId={listId}
					style={{ display: ["none", "none", "flex"] }}
				 />
			</ListContainer>

			<Actions clearUser={clearUser} />
		</Container>
	)
}
