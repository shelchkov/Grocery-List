import styled from "styled-components"

import { stylesGenerator } from "../../utils/styles-generator"

export const Div = styled.div`
	${(p: Styles): string => stylesGenerator(p)}
`
