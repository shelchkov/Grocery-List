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

const signInErrors: { [key: string]: string[] } = {
	required: [SignInInputs.email, SignInInputs.password],
}

const checkers: { [key: string]: (value?: string) => boolean } = {
	required: (value?: string): boolean => !value
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

		fields.forEach((input: string): void => {
			if (checkers[error](formData[input as SignInInputs])) {
				errors[input as SignInInputs] = 
				errors[input as SignInInputs] ? [
					...(errors[input as SignInInputs] as string[]),
					error
				] : [ error ]
			}
		})
	})

	return errors
}
