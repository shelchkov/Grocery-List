import styled from "styled-components"

import {
	sizes,
	colors,
	spaces,
	boxShadows,
	fontWeights
} from "../../utils/styles"
import { stylesGenerator } from "../../utils/styles-generator"

export const ButtonBase = styled.button`
	height: ${sizes[2]};

	color: ${colors.grey};
	border: none;
	border-radius: ${spaces[0]};
	box-shadow: ${boxShadows[0]};

	font-weight: ${fontWeights[0]};
	font-size: ${sizes[0]};

	outline: none;
	cursor: pointer;
	-webkit-appearance: none;

	${(p: Styles): string => stylesGenerator(p)}
`

export const OutlinedButton = styled(ButtonBase)`
	color: ${colors.orange};
	background-color: transparent;
	border: 1px solid ${colors.orange};
`

export const WithoutBgButton = styled(ButtonBase)`
	background-color: transparent;
	color: ${colors.grey};
	box-shadow: none;
`
