import styled from "styled-components"

import { colors, spaces } from "../../utils/styles"
import { stylesGenerator } from "../../utils/styles-generator"

export const InputComponent = styled.input`
	height: 30px;
	width: 213px;
	padding: 2px 0  0 11px;

	color: ${colors.darkBlue};
	background: transparent;
	
	border-radius: ${spaces[0]};
	border: 1px solid ${colors.darkBlue};

	font-size: 16px;
	outline: none;
	-webkit-appearance: none;

	&::placeholder {
		color: ${colors.lightGrey};
	}

	${(p: Styles): string => stylesGenerator(p)}
`
