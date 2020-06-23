import React, { ReactElement } from "react"

import { InputComponent } from "./input-component"
import { ErrorMessage } from "./error-message"

import { InputTypes, InputModes } from "../../utils/enums"

interface Props {
	placeholder?: string
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	errorMessage?: string | null
	style?: Styles
	type?: InputTypes
	value?: string
	onFocus?: () => void
	mode?: InputModes
}

export const Input = ({
	placeholder,
	onChange,
	errorMessage,
	style,
	type = InputTypes.text,
	value = "",
	onFocus,
	mode,
}: Props): ReactElement => (
	<>
		<InputComponent
			placeholder={placeholder}
			onChange={onChange}
			type={type}
			value={value}
			onFocus={onFocus}
			inputMode={mode}
			{...(style as any)}
		/>
		
		{errorMessage !== null && <ErrorMessage message={errorMessage} />}
	</>
)
