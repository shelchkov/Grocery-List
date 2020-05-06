import { useState, useEffect } from "react"

import { getUserInfo } from "../utils/firebase"

export const useUserInfoFetch = (
	userId: string | undefined
): UserInfo | undefined => {
	console.log("useUserInfo")
	const [userInfo, setUserInfo] = useState<UserInfo>()

	useEffect((): void => {
		console.log(userId)
		if (!userId) {
			return
		}

		getUserInfo(userId).then((data?: UserInfo): void => {
			console.log(data)

			if (!data) {
				return
			}

			setUserInfo(data)
		})
	}, [userId])

	return userInfo
}
