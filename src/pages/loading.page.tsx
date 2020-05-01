import React, { ReactElement } from "react"

import { Logo } from "../components/logo/logo"
import { LoadingMessage } from "../components/loading/loading-message"
import { BaseContainer } from "../components/ui/containers"

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
