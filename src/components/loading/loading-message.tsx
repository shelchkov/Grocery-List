import React, { ReactElement } from "react"
import styled from "styled-components"

import { P } from "../ui/p"

import { colors } from "../../utils/styles"
import { useTimer } from "../../effects/use-timer.effect"

interface LoadingState {
	opacity: string
	afterContent: string
}

const LoadingComponent = styled(P)<LoadingState & Styles>`
	width: 70px;
	margin: 0 auto;
	color: ${colors.lightGrey};
	transition: opacity 1s ease-in-out;

	&:after {
		content: '${(p): string => p.afterContent}';
	}
`

const getNextOpacity = (currentOpacity: string): string => {
	if (currentOpacity === ".5") {
		return ".7"
	}

	if (currentOpacity === ".7") {
		return ".9"
	}

	return ".5"
}

const getNextContent = (content: string): string =>
	content.length < 3 ? content + "." : ""

const getNextState = (prevState: LoadingState): LoadingState => ({
	afterContent: getNextContent(prevState.afterContent),
	opacity: getNextOpacity(prevState.opacity)
})

const initState = { opacity: ".9", afterContent: "" }

export const LoadingMessage = (): ReactElement => {
	const { currentState } = useTimer(initState, getNextState, 1000)

	return (
		<LoadingComponent {...currentState}>Loading</LoadingComponent>
	)
}
