const errorMessages: {
	[key: string]: (parameter?: number | string) => string
} = {
	required: (): string => "Required Field",
	minLength: (parameter?: number | string): string =>
		`Minimum length is ${parameter} characters`
}

export enum SignInInputs {
	email = "email",
	password = "password"
}

export interface SignInFormData {
	[SignInInputs.email]?: string,
	[SignInInputs.password]?: string
}

export interface SignInErrors {
	[SignInInputs.email]?: string[],
	[SignInInputs.password]?: string[]
}

const signInErrors: { 
	[key: string]: SignInInputs[] | (SignInInputs | number)[][]
} = {
	required: [SignInInputs.email, SignInInputs.password],
	minLength: [[SignInInputs.password, 4]]
}

const checkers: {
	[key: string]: (value?: string, parameter?: number | string) =>
		boolean
} = {
	required: (value?: string): boolean => !value,
	minLength: (value?: string, parameter?: number | string): boolean => {
		if (!value || !parameter) {
			return false
		}

		return value.length < parameter
	}
}

export const signInValidation = (
	formData?: SignInFormData
): SignInErrors | undefined => {
	if (!formData) {
		return Object.keys(SignInInputs).map((key): string => 
			errorMessages.required()) as SignInErrors
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
				const errorMessage = errorMessages[error](parameters)

				errors[field as SignInInputs] = 
				errors[field as SignInInputs] ? [
					...(errors[field as SignInInputs] as string[]),
					errorMessage
				] : [ errorMessage ]
			}
		})
	})

	if (Object.keys(errors).length === 0) {
		return
	}

	return errors
}


export enum SignUpInputs {
	name = "name",
	email = "email",
	password = "password"
}

export interface SignUpFormData {
	[SignUpInputs.name]?: string,
	[SignUpInputs.email]?: string,
	[SignUpInputs.password]?: string
}

export interface SignUpErrors {
	[SignUpInputs.name]?: string[],
	[SignUpInputs.email]?: string[],
	[SignUpInputs.password]?: string[]
}
