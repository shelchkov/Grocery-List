import styled from "styled-components"

import { spaces, colors } from "../../utils/styles"

export const Container = styled.div`
	min-height: 100vh;

	padding-left: ${spaces[1]};
	padding-right: ${spaces[1]};

	background-color: ${colors.grey};
`

export const SignInContainer = styled.div`
	margin-top: 22px;
`

export const SignInButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`
