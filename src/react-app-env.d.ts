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
	width?: string | string[]
	minWidth?: string | string[]
	maxWidth?: string | string[]
	height?: string | string[]
	maxHeight?: string | string[]
	padding?: string | string[]
	margin?: string | string[]
	marginTop?: string | string[]
	marginLeft?: string | string[]
	left?: string | string[]
	color?: string | string[]
	backgroundColor?: string | string[]
	display?: string | string[]
	flexDirection? :string | string[]
	justifyContent?: string | string[]
	alignItems?: string | string[]
	fontSize?: string | string[]
	fontWeight?: string | string[]
	textAlign?: string | string[]
	border?: string | string[]
	borderRadius?: string | string[]
	boxShadow?: string | string[]
	opacity?: string | string[]
	cursor?: string | string[]
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
