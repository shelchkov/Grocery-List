import styled from "styled-components"

import { Div } from "../ui/div"

import { colors } from "../../utils/styles"

export const NavBar = styled(Div)`
	position: fixed;
	top: 0;
	left: 40px;
	right: 40px;
	height: 68px;
	padding: 0 40px;
	margin-left: -40px;
	margin-right: -40px;
	
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${colors.darkBlue};
`