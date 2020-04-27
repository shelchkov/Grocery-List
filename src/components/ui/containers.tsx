import styled from "styled-components"

import { spaces, colors, breakpoints } from "../../utils/styles"

export const Container = styled.div`
	min-height: 100vh;

	padding-left: ${spaces[1]};
	padding-right: ${spaces[1]};

	background-color: ${colors.grey};

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
