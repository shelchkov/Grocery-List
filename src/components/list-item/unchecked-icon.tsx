import React, { ReactElement } from "react"
import styled from "styled-components"

import { colors } from "../../utils/styles"

const CircleComponent = styled.circle`
	stroke: ${colors.orange};
	stroke-width: 3px;
	fill: none;
`

export const UncheckedIcon = (): ReactElement => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		preserveAspectRatio="xMidYMid"
		width="26"
		height="26"
		viewBox="0 0 26 26"
	>
		<CircleComponent cx="13" cy="13" r="11.5"/>
	</svg>

)
