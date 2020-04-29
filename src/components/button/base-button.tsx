import styled from "styled-components"

import {
	sizes,
	colors,
	spaces,
	boxShadows,
	fontWeights
} from "../../utils/styles"

export const ButtonBase = styled.button`
	height: ${sizes[2]};
	${({ width }: Styles) => width && `width: ${width};`}
	margin-top: ${(p: Styles): string => p.marginTop || "0"};
	margin-left: ${(p: Styles): string => p.marginLeft || "0"};

	color: ${colors.grey};
	border: none;
	border-radius: ${spaces[0]};
	box-shadow: ${(p: Styles): string => p.boxShadow || boxShadows[0]};

	font-weight: ${fontWeights[0]};
	font-size: ${sizes[0]};

	opacity: ${(p: Styles): string => p.opacity || "1"};
	outline: none;
	cursor: ${(p: Styles): string => p.cursor || "pointer"};
	-webkit-appearance: none;
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
