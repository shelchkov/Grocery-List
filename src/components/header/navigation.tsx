import React, { ReactElement, useEffect } from "react"

import { Logo } from "../logo/logo"
import { Button } from "../button/button"
import { Div } from "../ui/div"
import { NavBar } from "./navbar"

import { BtnTypes } from "../../utils/enums"
import { useSignOut } from "../../effects/use-sign-out.effect"

interface Props {
	clearUser?: () => void
}

export const Navigation = ({ clearUser }: Props): ReactElement => {
	const { isLoading, isSuccess, startSignOut } = useSignOut()

	useEffect((): void => {
		isSuccess && clearUser && clearUser()
	// eslint-disable-next-line
	}, [isSuccess])

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
						clickHandler={startSignOut}
						style={{ marginLeft: "40px" }}
					/>
				</Div>}
			</NavBar>

			<Div height="68px" display={["none", "flex"]}/>
		</>
	)
}
