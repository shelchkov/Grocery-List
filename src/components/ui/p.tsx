import styled from "styled-components"

import { stylesGenerator } from "../../utils/styles-generator"

export const P = styled.p<{ onClick?: any } & Styles>`
	${(p: Styles): string => stylesGenerator(p)}
`
