const errorMessages = {
	required: "Required Field",
}

export enum SignInInputs {
	email = "email",
	password = "password"
}

export interface SignInFormData {
	[SignInInputs.email]?: string,
	[SignInInputs.password]?: string
}

interface SignInErrors {
	[SignInInputs.email]?: string[],
	[SignInInputs.password]?: string[]
}

const signInErrors: { 
	[key: string]: string[] | (string | number)[][]
} = {
	required: [SignInInputs.email, SignInInputs.password],
	minLength: [[SignInInputs.password, 4]]
}

const checkers: {
	[key: string]: (value?: string, parameter?: number | string) => boolean
} = {
	required: (value?: string): boolean => !value,
	minLength: (value?: string, parameter?: number | string): boolean =>
		value && parameter && value.length < parameter || false
}

export const signInValidation = (
	formData?: SignInFormData
): SignInErrors => {
	if (!formData) {
		return Object.keys(SignInInputs).map((key): string => 
			errorMessages.required) as SignInErrors
	}

	const errors: SignInErrors = {}

	Object.keys(signInErrors).forEach((error: string): void => {
		const fields = signInErrors[error]

		fields.forEach((input: string | (string | number)[]): void => {
			const field = Array.isArray(input) ? input[0] : input
			const parameters = Array.isArray(input) ? input[1] : undefined

			if (checkers[error](
				formData[field as SignInInputs],
				parameters
			)) {
				errors[field as SignInInputs] = 
				errors[field as SignInInputs] ? [
					...(errors[field as SignInInputs] as string[]),
					error
				] : [ error ]
			}
		})
	})

	return errors
}
