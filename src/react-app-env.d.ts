/// <reference types="react-scripts" />
interface User {
	id: string
	email: string
	displayName: string
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
	id: string
}

interface List {
	id: string
	items: Item[]
	access?: string[]
}
