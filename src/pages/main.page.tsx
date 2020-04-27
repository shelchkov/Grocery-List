import React, { ReactElement, useState, useEffect } from "react"
import styled from "styled-components"

import { Logo } from "../components/logo/logo"
import {
	AddNewItemForm
} from "../components/add-new-item/add-new-item.form"
import {
	AddNewItemDesktop
} from "../components/add-new-item/add-new-item-desktop"
import { Actions } from "../components/actions/actions"
import { ListItems } from "../components/list-items/list-items"
import { Container } from "../components/ui/containers"
import {
	MobileLayout,
	MediumLayout,
	DesktopLayout
} from "../components/ui/layouts"
import { Navigation } from "../components/navigation/navigation"

import { getUserInfo, getListItems } from "../utils/firebase"
import { ListAccess } from "../utils/enums"

interface Props {
	user: User | null
	clearUser: () => void
}

const currentList = 0

const ListContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
`

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
			<MobileLayout><Logo /></MobileLayout>
			<Navigation clearUser={clearUser}/>

			<MobileLayout>
				<AddNewItemForm
					userId={user ? user.id : undefined}
					listId={listId}
				/>
			</MobileLayout>
			<MediumLayout>
				<AddNewItemForm
					userId={user ? user.id : undefined}
					listId={listId}
					style={{ marginTop: "20px" }}
				/>
			</MediumLayout>

			<ListContainer>
				<ListItems
					listItems={lists && listId ?
						lists[listId] && lists[listId].items
						: undefined}
					listId={listId}
				/>

				<DesktopLayout>
					<AddNewItemDesktop 
						userId={user ? user.id : undefined}
						listId={listId}
					 />
				</DesktopLayout>
			</ListContainer>

			<Actions clearUser={clearUser} />
		</Container>
	)
}
