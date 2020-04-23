import { ItemsSort } from "./enums"
import { SignInInputs, SignInErrors } from "./validation"
import { SignUpInputs, SignUpErrors } from "./validation"

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

		case ItemsSort.checked:
			return (copyObject(items) as Item[]).sort(
				(item1, item2): number => {
					if (item1.isChecked === item2.isChecked) {
						return 0
					}

					if (item1.isChecked < item2.isChecked) {
						return -1
					}

					return 1
				}
			)

		default:
			return items
	}
}

export const getDate = (): string => Date.now().toString()

export const getSignInError = (errorCode: string): SignInErrors => {
	switch(errorCode) {
		case "auth/invalid-email":
			return { [SignInInputs.email]: ["Email is not valid"] }

		case "auth/user-disabled":
			return { [SignInInputs.email]: ["User has been disabled"] }

		case "auth/user-not-found":
			return { [SignInInputs.email]: ["User was not found"] }

		case "auth/wrong-password":
			return { [SignInInputs.password]: ["Wrong password"] }

		default:
			return {}
	}
}

export const getSignUpError = (errorCode: string): SignUpErrors => {
	switch(errorCode) {
		case "auth/email-already-in-use":
			return { [SignUpInputs.email]: ["Email is already in use"] }

		case "auth/invalid-email":
			return { [SignUpInputs.email]: ["Email is not valid"] }

		case "auth/weak-password":
			return {
				[SignUpInputs.password]: ["Password is not strong enought"]
			}

		default:
			return {}
	}
}
