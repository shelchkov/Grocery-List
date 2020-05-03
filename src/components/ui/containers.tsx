import styled from "styled-components"

import { Div } from "./div"

import { colors, spaces, breakpoints, sizes } from "../../utils/styles"
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

export const SignInContainer = styled.form`
	margin-top: 22px;
	width: 272px;

	@media (min-width: ${breakpoints.sm}) {
		margin-top: 52px;
	}
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

export const FormsContainer = styled.div`
	margin: 0 auto;
	display: flex;
	justify-content: center;

	${(p: Styles): string => stylesGenerator(p)}
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

	background-color: transparent;

	${(p: Styles): string => stylesGenerator(p)}
`

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
