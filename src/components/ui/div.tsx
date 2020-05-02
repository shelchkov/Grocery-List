import styled from "styled-components"

import { stylesGenerator } from "../../utils/styles-generator"

export const Div = styled.div`
	${(p: Styles): string => {
		console.log(p)
		const styles = stylesGenerator(p)
		console.log(styles)
		return styles
	}}
`
