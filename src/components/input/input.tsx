import React, { ReactElement } from "react"
import styled from "styled-components"

import { ErrorMessage } from "./error-message"

import { spaces, colors } from "../../utils/styles"

interface Props {
	placeholder?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	errorMessage?: string
	style?: Styles
}

const InputComponent = styled.input`
	height: 30px;
	min-width: ${(p): string => p.width ? p.width.toString() : "213px"};
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

export const Input = ({
	placeholder,
	onChange,
	errorMessage,
	style,
}: Props): ReactElement => (
	<>
		<InputComponent
			placeholder={placeholder}
			onChange={onChange}
			width={style && style.width}
		/>
		<ErrorMessage message={errorMessage} />
	</>
)
