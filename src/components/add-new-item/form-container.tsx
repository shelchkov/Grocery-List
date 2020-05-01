import styled from "styled-components"

import { colors } from "../../utils/styles"
import { stylesGenerator } from "../../utils/styles-generator"

export const FormContainer = styled.form`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: stretch;
	max-width: 272px;
	height: 34px;
	margin-left: auto;

	background-color: "transparent";

	${(p: Styles): string => stylesGenerator(p)}
`
export const DesktopFormContainer = styled.div`
	margin-top: 60px;
	max-height: 142px;
	background-color: ${colors.lightGrey};
	border: 1px solid ${colors.darkBlue};
	border-radius: 10px;
`
