import styled from "styled-components"

import { colors, sizes } from "../../utils/styles"

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
	background-color: ${(p: Styles): string => 
		p.backgroundColor || colors.purple};
`