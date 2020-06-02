import { useState, useEffect } from "react"

import { getListItems } from "../utils/firebase"
import { ListAccess } from "../utils/enums"

interface Lists {
	[key: string]: List
}

interface ListsObj {
	lists: Lists | undefined
}

export const useListsFetch = (
	listId: string | undefined,
): ListsObj => {
	console.log("useLists", listId)
	const [lists, setLists] = useState<Lists>()

	let cleanUp: (() => void)[] = []

	useEffect((): void => {
		if (!listId || (lists && lists[listId])) {
			return
		}

		console.log("Start fetch w/", listId)

		const { unsubscribe } = getListItems(
			listId,
			(items: Item[]): void => {
				console.log("Items were received")
				console.log(items)

				setLists({
					...lists,
					[listId]: {
						items: items,
						id: listId,
						access: [ListAccess.check]
					}
				})
			}
		)

		cleanUp.push(unsubscribe)
	// eslint-disable-next-line
	}, [listId])

	useEffect((): (() => void) => (): void => {
		console.log("cleanUp")
		console.log(cleanUp)
		cleanUp.forEach((fn) => fn())
	// eslint-disable-next-line
	}, [])

	return { lists }
}
