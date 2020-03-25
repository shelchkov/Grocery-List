import React, { ReactElement } from "react"
import styled from "styled-components"

import { Logo } from "../components/logo/logo"
import { AddNewItemForm } from "../components/add-new-item/add-new-item.form"

import { spaces, colors } from "../utils/styles"

interface Props {
	user: User | null
}

const Container = styled.div`
	min-height: 100vh;

	padding-left: ${spaces[1]};
	padding-right: ${spaces[1]};

	background-color: ${colors.grey};
`

export const MainPage = ({ user }: Props): ReactElement => (
	<Container>
		<Logo />
		<AddNewItemForm user={user} listId="RKIS9avcsuajAtOIyi7J" />
	</Container>
)
