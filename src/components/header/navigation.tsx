import React, { ReactElement, useState } from "react"

import { Logo } from "../logo/logo"
import { Button } from "../button/button"
import { Div } from "../ui/div"
import { NavBar } from "./navbar"

import { signOut } from "../../utils/firebase"
import { BtnTypes } from "../../utils/enums"

interface Props {
	clearUser?: () => void
}

export const Navigation = ({ clearUser }: Props): ReactElement => {
	const [isLoading, setIsLoading] = useState<boolean>()

	const handleSignOut = (): void => {
		setIsLoading(true)
		signOut().then((data): void => {
			if (data.error) {
				setIsLoading(false)
				return
			}
			clearUser && clearUser()
		})
	}

	return (
		<>
			<NavBar display={["none", "flex"]}>
				<Logo style={{ padding: "0" }} />

				{clearUser && <Div display="flex">
					<Button
						text="Share List"
						buttonType={BtnTypes.MenuItem}
						isDisabled
					/>
					<Button
						text="Sign Out"
						buttonType={BtnTypes.MenuItem}
						isLoading={isLoading}
						clickHandler={handleSignOut}
						style={{ marginLeft: "40px" }}
					/>
				</Div>}
			</NavBar>

			<Div height="68px" display={["none", "flex"]}/>
		</>
	)
}
