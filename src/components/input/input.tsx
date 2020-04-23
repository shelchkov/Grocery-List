import React, { ReactElement } from "react"
import styled from "styled-components"

import { ErrorMessage } from "./error-message"

import { spaces, colors } from "../../utils/styles"
import { InputTypes, InputModes } from "../../utils/enums"

interface Props {
	placeholder?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	errorMessage?: string | null
	style?: Styles
	type?: InputTypes
	inputMode?: InputModes
}

const InputComponent = styled.input`
	height: 30px;
	min-width: ${(p): string => p.width ? p.width.toString() : "213px"};
	padding: 2px 0  0 11px;

	color: ${colors.darkBlue};
	background: transparent;
	
	border-radius: ${spaces[0]};
	border: 1px solid ${colors.darkBlue};

	font-size: 16px;
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
	type = InputTypes.text,
	inputMode
}: Props): ReactElement => (
	<>
		<InputComponent
			placeholder={placeholder}
			onChange={onChange}
			width={style && style.width}
			type={type}
			inputMode={inputMode}
		/>
		
		{errorMessage !== null && <ErrorMessage message={errorMessage} />}
	</>
)
