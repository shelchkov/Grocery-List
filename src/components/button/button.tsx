import React, { ReactElement } from "react"
import styled from "styled-components"
import { colors, sizes, spaces, boxShadows } from "../../utils/styles"

interface Props {
	text: string
	buttonStyles: Styles
}

const ButtonBase = styled.button`
	width: {(p): string => p.width || "auto"};
	height: {(p): string => p.height || sizes[1]}
	background-color: ${(p): string => p.backgroundColor};
	color: ${colors.grey};

	border-radius: ${spaces[0]};
	box-shadow: ${boxShadows[0]};

	font-family: 'Oxygen';
	font-weight: 400;
	font-size: ${sizes[0]};
`

export const Button = ({ text, buttonStyles }: Props): ReactElement => (
	<ButtonBase {...buttonStyles}>{text}</ButtonBase>
)
