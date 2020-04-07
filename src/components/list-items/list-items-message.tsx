import React, { ReactElement } from "react"

import styled from "styled-components"

import { colors } from "../../utils/styles"

interface Props {
	text: string
}

const MessageContainer = styled.p`
	margin-top: 1.5rem;
	color: ${colors.lightGrey};
	font-size: 18px;
	text-align: center;
`

export const ListItemsMessage = ({ text }: Props): ReactElement => (
	<MessageContainer>
		{text}
	</MessageContainer>
)
