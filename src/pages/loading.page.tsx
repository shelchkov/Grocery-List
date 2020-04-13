import React, { ReactElement, useState, useEffect } from "react"
import styled from "styled-components"

import { Logo } from "../components/logo/logo"

import { colors } from "../utils/styles"

const Container = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: ${colors.grey};
`

interface LoadingStyles {
	opacity: string
	afterContent: string
}

const LoadingMessage = styled.p<LoadingStyles>`
	margin: 0;
	color: ${colors.lightGrey};
	opacity: ${(p): string => p.opacity};
	transition: opacity 1s ease-in-out;

	&:after {
		content: '${(p): string => p.afterContent}';
	}
`

const initStyles = { opacity: ".6", afterContent: "" }

export const LoadingPage = (): ReactElement => {
	const [loadingStyles, setLoadingStyles] = useState(initStyles)

	useEffect((): (() => void) => {
		console.log("useEffect")
		const timerId = setTimeout((): void => {
			console.log("Timeout")
			const newOpacity = 
				loadingStyles.opacity === ".3" ? ".6" : ".3"
			const newContent = loadingStyles.afterContent.length < 3 ?
				loadingStyles.afterContent + "." : ""
			setLoadingStyles({
				opacity: newOpacity,
				afterContent: newContent
			})
		}, 1000)

		// setTimeout((): void => {}, 200)

		console.log(timerId)

		return (): void => {
			console.log("Clear")
			clearInterval(timerId)
		}
	}, [loadingStyles])

	return (
		<Container>
			<Logo />
			<LoadingMessage {...loadingStyles}>Loading</LoadingMessage>
		</Container>
	)
}
