import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { MediumDesktopLayout } from "../ui/layouts"
import { Logo } from "../logo/logo"

import { colors } from "../../utils/styles"
import { signOut } from "../../utils/firebase"

interface Props {
	clearUser: () => void
}

const NavBar = styled.div`
	height: 68px;
	width: 100%;
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

const MenuItem = styled.p`
	margin: 0 0 0 ${(p: { isFirst?: boolean }): string =>
		p.isFirst ? "0" : "40px"};
	color: ${colors.grey};
	cursor: pointer;
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
			clearUser()
		})
	}

	return (
		<MediumDesktopLayout>
			<NavBar>
				<Logo style={{ padding: "0" }} />

				<Menu>
					<MenuItem isFirst>Share List</MenuItem>
					<MenuItem onClick={handleSignOut}>
						{isLoading ? "Signing Out..." : "Sign Out"}
					</MenuItem>
				</Menu>
			</NavBar>
		</MediumDesktopLayout>
	)
}
