import styled from "styled-components"

import { breakpoints } from "../../utils/styles"

export const MobileLayout = styled.div`
	@media (min-width: ${breakpoints.sm}) {
		display: none;
	}
`

export const MediumLayout = styled.div`
	display: none;
	
	@media (min-width: ${breakpoints.sm}) and
		(max-width: ${breakpoints.preLg}) {
			display: flex;
			width: 100%;
	}
`

export const MediumDesktopLayout = styled.div`
	display: none;
	
	@media (min-width: ${breakpoints.sm}) {
		display: flex;
		width: 100%;
	}
`

export const DesktopLayout = styled.div`
	display: none;

	@media (min-width: ${breakpoints.lg}) {
		display: flex;
	}
`
