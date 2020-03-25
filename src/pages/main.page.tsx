import React, { ReactElement } from "react"
import styled from "styled-components"

import { Logo } from "../components/logo/logo"
import { AddNewItemForm } from "../components/add-new-item/add-new-item.form"
import { Input } from "../components/input/input"

import { spaces, colors } from "../utils/styles"

const Container = styled.div`
	min-height: 100vh;

  padding-left: ${spaces[1]};
  padding-right: ${spaces[1]};

  background-color: ${colors.grey};
`

export const MainPage = (): ReactElement => (
	<Container>
		<Logo />
		<AddNewItemForm />
		<Input placeholder="New Item" />
	</Container>
)
