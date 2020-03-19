import React, { ReactElement } from "react"
import styled from "styled-components"
import { sizes, fontWeights, colors, textShadows } from "../../utils/styles"

const LogoComponent = styled.p`
	margin: .7rem 0;

	color: ${colors.lightGrey};

	font-family: 'Baloo Paaji 2';
	font-size: ${sizes[1]};
	font-weight: ${fontWeights[0]};
	text-align: center;
	letter-spacing: .22rem;

	text-shadow: ${textShadows[0]};
`

export const Logo = (): ReactElement => {
	return <LogoComponent>Grocery List</LogoComponent>
}
