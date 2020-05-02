import styled from "styled-components"

import { Div } from "./div"

import { colors, spaces, breakpoints } from "../../utils/styles"
import { stylesGenerator } from "../../utils/styles-generator"

export const BaseContainer = styled(Div)`
	min-height: 100vh;
	background-color: ${colors.grey};
`

export const Container = styled(BaseContainer)`
	padding-left: ${spaces[1]};
	padding-right: ${spaces[1]};

	@media (min-width: ${breakpoints.sm}) {
		padding-left: 40px;
		padding-right: 40px;
	}
`

export const SignInContainer = styled.div`
	margin-top: 22px;
`

export const SignInButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`

export const DesktopFormContainer = styled.div`
	padding: 0 40px 30px 40px;
	margin: 160px 40px 20px 40px;
	background-color: ${(p: { isActive: boolean }): string =>
		p.isActive ? colors.lightGrey : "transparent"};
	border: 1px solid ${(p: { isActive: boolean }): string =>
		p.isActive ? colors.darkBlue : "none"};
	border-radius: 10px;
`

export const FormsContainer = styled(Div)`
	display: flex;
	margin: 0 auto;
`

export const ListContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
`

export const NewItemFormContainer = styled.form`
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
