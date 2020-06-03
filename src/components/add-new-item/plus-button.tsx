import React, { ReactElement } from "react"
import { P } from "../ui/p"

import { sizes, colors, spaces, boxShadows } from "../../utils/styles"

interface Props {
	text: string
	isLoading: boolean
	handleClick: (event: React.FormEvent<HTMLFormElement>) => void
}

export const PlusButton = ({
	text,
	isLoading,
	handleClick
}: Props): ReactElement => (
	<P
		minWidth={sizes[2]}
		height={sizes[2]}
		margin="0 0 0 12px"
		backgroundColor={colors.green}
		color={colors.grey}
		fontSize="23px"
		fontWeight="700"
		textAlign="center"
		borderRadius={spaces[0]}
		boxShadow={boxShadows[0]}
		cursor="pointer"
		onClick={handleClick}
	>
		{isLoading ? "..." : text}
	</P>
)
