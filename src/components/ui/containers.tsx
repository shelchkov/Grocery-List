import styled from "styled-components"

import { colors, spaces, breakpoints } from "../../utils/styles"
import { stylesGenerator } from "../../utils/styles-generator"

export const BaseContainer = styled.div`
	min-height: 100vh;
	background-color: ${colors.grey};

	${(p: Styles): string => stylesGenerator(p)}
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
