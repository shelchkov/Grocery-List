import React, { ReactElement } from "react"
import styled from "styled-components"

import { ErrorMessage } from "./error-message"

import { spaces, colors } from "../../utils/styles"
import { InputTypes } from "../../utils/enums"

interface Props {
	placeholder?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	errorMessage?: string | null
	style?: Styles
	type?: InputTypes
}

const InputComponent = styled.input`
	height: 30px;
	width: ${(p): string => p.width ? p.width.toString() : "213px"};
	padding: 2px 0  0 11px;

	color: ${colors.darkBlue};
	background: ${(p: Styles): string => p.backgroundColor || "transparent"};
	
	border-radius: ${spaces[0]};
	border: 1px solid ${colors.darkBlue};

	font-size: 16px;
	outline: none;
	-webkit-appearance: none;

	&::placeholder {
		color: ${colors.lightGrey};
	}
`

export const Input = ({
	placeholder,
	onChange,
	errorMessage,
	style,
	type = InputTypes.text,
}: Props): ReactElement => (
	<>
		<InputComponent
			placeholder={placeholder}
			onChange={onChange}
			type={type}
			{...style}
		/>
		
		{errorMessage !== null && <ErrorMessage message={errorMessage} />}
	</>
)
