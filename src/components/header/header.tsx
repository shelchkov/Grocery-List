import React, { ReactElement } from "react"

import { MobileLayout } from "../ui/layouts"
import { Logo } from "../logo/logo"
import { Navigation } from "../navigation/navigation"

export const Header = (): ReactElement => (
	<>
		<MobileLayout><Logo /></MobileLayout>
		<Navigation />
	</>
)
