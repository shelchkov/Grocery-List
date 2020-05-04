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

	useEffect((): (() => void) | void => {
		console.log("Start fetch w/", listId)

		if (!listId || (lists && lists[listId])) {
			return
		}

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

		return unsubscribe
	// eslint-disable-next-line
	}, [listId])

	// if (!listId) {
	// 	return
	// }

	return { lists }
}
