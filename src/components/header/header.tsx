import React, { ReactElement } from "react"

import { Logo } from "./logo"
import { Navigation } from "./navigation"

interface Props {
	clearUser?: () => void
}

export const Header = ({ clearUser }: Props): ReactElement => (
	<>
		<Logo style={{ display: ["block", "none"] }} />
		<Navigation clearUser={clearUser} />
	</>
)
