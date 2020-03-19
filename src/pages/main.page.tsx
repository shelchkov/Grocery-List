import React, { ReactElement } from "react"
import styled from "styled-components"

import { Logo } from "../components/logo/logo"
import { Button } from "../components/button/button"

import { spaces, colors } from "../utils/styles"
import { BtnTypes } from "../utils/enums"

const Container = styled.div`
  padding-left: ${spaces[1]};
  padding-right: ${spaces[1]};

  background-color: ${colors.grey};
`

export const MainPage = (): ReactElement => (
	<Container>
		<Logo />
        <Button
          text="Add New Item"
          buttonType={BtnTypes.AddNewItem}
        />
	</Container>
)
