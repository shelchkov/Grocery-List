import React, { ReactElement } from "react"
import styled from "styled-components"

import { MediumLayout } from "../ui/layouts"
import { Logo } from "../logo/logo"

import { colors } from "../../utils/styles"

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

export const Navigation = (): ReactElement => (
	<MediumLayout>
		<NavBar>
			<Logo style={{ padding: "0" }} />

			<Menu>
				<MenuItem isFirst>Share List</MenuItem>
				<MenuItem>Sign Out</MenuItem>
			</Menu>
		</NavBar>
	</MediumLayout>
)
