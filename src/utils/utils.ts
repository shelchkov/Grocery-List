import { ItemsSort } from "./enums"

export const copyObject = (object: any): any =>
	JSON.parse(JSON.stringify(object))

export const sortItems = (items: Item[], sortType: ItemsSort): Item[] => {
	switch (sortType) {
		case ItemsSort.createdAt:
			return (copyObject(items) as Item[]).sort(
				(item1, item2): number => {
					if (item1.createdAt < item2.createdAt) {
						return -1
					}

					if (item1.createdAt === item2.createdAt) {
						return 0
					}

					return 1
				}
			)

		default:
			return items
	}
}
