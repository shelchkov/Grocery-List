interface Colors {
	[key: string]: string
}

export const colors: Colors = {
	grey: "#f3f3fa",
	green: "#82cd79",
	darkGreen: "#699c76",
	orange: "#ef492e",
	darkBlue: "#41515a",
	lightGrey: "#b9c0c2",
	purple: "#615af9",
}

export const sizes: string[] = ["15px", "26px", "34px", "21px"]

export const spaces: string[] = ["10px", "24px"]

export const boxShadows: string[] = 
	["-4px 4px 10px -1px rgba(164,168,177,0.14)"]

export const textShadows: string[] = 
	["-4px 4px 7px rgba(164,168,177,0.2)"]

export const fontWeights: number[] = [400]

export const breakpoints: { [key: string]: string } = {
	sm: "32rem",
	preLg: "1023px",
	lg:"64rem"
}
