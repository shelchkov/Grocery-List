import React, { ReactElement } from "react"
import styled from "styled-components"
import { colors, sizes, spaces, boxShadows } from "../../utils/styles"

interface Props {
	text: string
	buttonStyles: Styles
}

const ButtonBase = styled.button`
	width: ${(p: Styles): string => p.width ? p.width.toString() : "auto"};
	height: ${(p): string => p.height ? p.height.toString() : sizes[1]};
	background-color: ${(p: Styles): string =>
		p.backgroundColor ? p.backgroundColor.toString() : colors.green};
	color: ${colors.grey};

	border: none;
	border-radius: ${spaces[0]};
	box-shadow: ${boxShadows[0]};

	font-family: 'Oxygen';
	font-weight: 400;
	font-size: ${sizes[0]};

	outline: none;
	cursor: pointer;
`

export const Button = ({ text, buttonStyles }: Props): ReactElement => {
	console.log(buttonStyles)

	return (
	<ButtonBase {...buttonStyles}>{text}</ButtonBase>
)}
