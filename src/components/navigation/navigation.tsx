import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { MediumDesktopLayout } from "../ui/layouts"
import { Logo } from "../logo/logo"
import { Button } from "../button/button"

import { colors } from "../../utils/styles"
import { signOut } from "../../utils/firebase"
import { BtnTypes } from "../../utils/enums"

interface Props {
	clearUser?: () => void
}

const NavBar = styled.div`
	position: fixed;
	top: 0;
	left: 40px;
	right: 40px;
	height: 68px;
	padding: 0 40px;
	margin-left: -40px;
	margin-right: -40px;
	
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${colors.darkBlue};
`

const Menu = styled.div`
	display: flex;
`

const EmptySpace = styled.div`
	height: 68px;
`

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
		<MediumDesktopLayout>
			<NavBar>
				<Logo style={{ padding: "0" }} />

				{clearUser && <Menu>
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
				</Menu>}
			</NavBar>

			<EmptySpace />
		</MediumDesktopLayout>
	)
}
