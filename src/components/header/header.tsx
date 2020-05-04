import React, { ReactElement } from "react"

import { Logo } from "./logo"
import { Navigation } from "./navigation"

export const Header = (): ReactElement => (
	<>
		<Logo style={{ display: ["block", "none"] }} />
		<Navigation />
	</>
)
