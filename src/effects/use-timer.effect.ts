import { useState, useEffect } from "react"

interface Timer {
	currentState: any
}

export const useTimer = (
	initState: any,
	getNextState: (prevState: any) => any,
	interval: number
): Timer => {
	const [currentState, setCurrentState] = useState(initState)

	useEffect((): (() => void) => {
		const timerId = setTimeout((): void => {
			setCurrentState(getNextState(currentState))
		}, interval)

		return (): void => {
			clearInterval(timerId)
		}
	//eslint-disable-next-line
	}, [currentState])

	return { currentState }
}
