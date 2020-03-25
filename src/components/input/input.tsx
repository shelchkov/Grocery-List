import React, { ReactElement } from "react"
import styled from "styled-components"

import { spaces, colors } from "../../utils/styles"

interface Props {
	placeholder?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputComponent = styled.input`
	height: 30px;
	min-width: 209px;
	padding-left: 11px;

	color: ${colors.darkBlue};
	background: transparent;
	
	border-radius: ${spaces[0]};
	border: 1px solid ${colors.darkBlue};

	font-size: 14px;
	outline: none;

	&::placeholder {
		color: ${colors.lightGrey};
	}
`

export const Input = ({ placeholder, onChange }: Props): ReactElement => (
	<InputComponent placeholder={placeholder} onChange={onChange} />
)
