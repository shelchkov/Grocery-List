import styled from "styled-components"

import { colors } from "../../utils/styles"
import { stylesGenerator } from "../../utils/styles-generator"

export const NavBar = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 68px;
	padding: 0 40px;

	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${colors.darkBlue};

	${(p: Styles): string => stylesGenerator(p)}
`