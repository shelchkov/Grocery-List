import React, { ReactElement } from "react"
import styled from "styled-components"
import {
	sizes,
	fontWeights,
	colors,
	textShadows
} from "../../utils/styles"

interface Props {
	style?: Styles
}

const LogoComponent = styled.p`
	padding: ${(p: Styles): string => p.padding || "3px 0 19px 0"};
	margin: 0;

	color: ${colors.lightGrey};

	font-family: 'Baloo Paaji 2';
	font-size: ${sizes[1]};
	font-weight: ${fontWeights[0]};
	text-align: center;
	letter-spacing: .22rem;

	text-shadow: ${textShadows[0]};
`

export const Logo = ({ style }: Props): ReactElement => 
	<LogoComponent {...style}>Grocery List</LogoComponent>
