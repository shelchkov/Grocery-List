import React, { ReactElement, useState, useEffect } from "react"
import styled from "styled-components"

import { colors } from "../../utils/styles"
import { stylesGenerator } from "../../utils/styles-generator"

interface LoadingStyles {
	opacity: string
	afterContent: string
}

const LoadingComponent = styled.p<LoadingStyles>`
	width: 70px;
	margin: 0;
	color: ${colors.lightGrey};
	transition: opacity 1s ease-in-out;

	&:after {
		content: '${(p): string => p.afterContent}';
	}

	${(p: Styles): string => stylesGenerator(p)}
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

const getNextContent = (content: string): string => content.length < 3 ?
	content + "." : ""

const initStyles = { opacity: ".9", afterContent: "" }

export const LoadingMessage = (): ReactElement => {
	const [loadingStyles, setLoadingStyles] = useState(initStyles)

	useEffect((): (() => void) => {
		const timerId = setTimeout((): void => {
			setLoadingStyles({
				opacity: getNextOpacity(loadingStyles.opacity),
				afterContent: getNextContent(loadingStyles.afterContent)
			})
		}, 1000)

		return (): void => {
			clearInterval(timerId)
		}
	}, [loadingStyles])

	return (
		<LoadingComponent {...loadingStyles}>Loading</LoadingComponent>
	)
}
