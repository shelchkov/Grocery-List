import React, { ReactElement } from "react"

import { ErrorMessage } from "./error-message"
import { InputComponent } from "./input-component"

import { InputTypes } from "../../utils/enums"

interface Props {
	placeholder?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	errorMessage?: string | null
	style?: Styles
	type?: InputTypes
	value?: string
}

export const Input = ({
	placeholder,
	onChange,
	errorMessage,
	style,
	type = InputTypes.text,
	value = ""
}: Props): ReactElement => (
	<>
		<InputComponent
			placeholder={placeholder}
			onChange={onChange}
			type={type}
			value={value}
			{...style}
		/>
		
		{errorMessage !== null && <ErrorMessage message={errorMessage} />}
	</>
)
