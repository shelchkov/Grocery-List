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
	onFocus?: () => void
}

export const Input = ({
	placeholder,
	onChange,
	errorMessage,
	style,
	type = InputTypes.text,
	value = "",
	onFocus,
}: Props): ReactElement => (
	<>
		<InputComponent
			placeholder={placeholder}
			onChange={onChange}
			type={type}
			value={value}
			onFocus={onFocus}
			{...style}
		/>
		
		{errorMessage !== null && <ErrorMessage message={errorMessage} />}
	</>
)
