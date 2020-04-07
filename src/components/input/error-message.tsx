import React, { ReactElement } from "react"

import styled from "styled-components"

import { colors } from "../../utils/styles"

interface Props {
	message?: string
}

const ErrorContainer = styled.p`
	margin: 1px 0 5px 8px;
	min-height: 16px;
	font-size: 13px;
	color: ${colors.orange};
`

export const ErrorMessage = ({ message }: Props): ReactElement => (
	<ErrorContainer>
		{message}
	</ErrorContainer>
)
