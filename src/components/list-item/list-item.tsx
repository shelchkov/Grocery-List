import React, { ReactElement } from "react"
import styled from "styled-components"

interface Props {
	name: string
	isChecked: boolean
}

const ItemContainer = styled.div`
	display: flex;
`

const Name = styled.p`
	margin: .3rem;
	margin-left: 1.2rem;
`

export const ListItem = ({ name, isChecked }: Props): ReactElement => (
	<ItemContainer>
		<Name>{name}</Name>
	</ItemContainer>
)
