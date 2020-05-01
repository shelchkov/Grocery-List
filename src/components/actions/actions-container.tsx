import styled from "styled-components"

import { colors, sizes } from "../../utils/styles"
import { stylesGenerator } from "../../utils/styles-generator"

export const ActionsContainer = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;

	display: flex;
	justify-content: space-between;
	align-items: center;
	height: ${sizes[2]};
	padding: 13px 1.5rem;

	color: ${colors.darkBlue};
	background-color: ${colors.purple};

	${(p: Styles): string => stylesGenerator(p)}
`