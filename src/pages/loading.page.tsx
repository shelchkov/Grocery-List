import React, { ReactElement } from "react"

import { BaseContainer } from "../components/ui/containers"
import { Logo } from "../components/header/logo"
import { LoadingMessage } from "../components/loading/loading-message"

export const LoadingPage = (): ReactElement => (
	<BaseContainer
		display="flex"
		justifyContent="center"
		alignItems="center"
		flexDirection="column"
	>
		<Logo />
		<LoadingMessage />
	</BaseContainer>
)
