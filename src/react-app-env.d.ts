/// <reference types="react-scripts" />

interface User {
	id: string
	email: string
	displayName: string
	isVerified: boolean
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
}
