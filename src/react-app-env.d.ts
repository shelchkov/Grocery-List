/// <reference types="react-scripts" />
interface User {
	id: string
	email: string | null
	displayName: string | null
	isVerified: boolean
	lists?: List[]
}

interface UserInfo {
	lists: string[]
	displayName: string
}

interface Styles {
	width?: string
	height?: string
	backgroundColor?: string
	color?: string
}

interface Item {
	name: string
	isChecked: boolean
	id?: string
	createdAt: string
}

interface List {
	id: string
	items: Item[]
	access?: string[]
}
