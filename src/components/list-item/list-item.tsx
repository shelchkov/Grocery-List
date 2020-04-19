import React, { ReactElement, useState } from "react"
import styled from "styled-components"

import { CheckedIcon } from "./checked-icon"
import { UncheckedIcon } from "./unchecked-icon"
import { Button } from "../button/button"

import { sizes, colors } from "../../utils/styles"
import { BtnTypes } from "../../utils/enums"
import { Response } from "../../utils/firebase"

interface Props {
	name: string
	isChecked: boolean
	toggleCheckItem: () => void
	deleteItem?: () => Promise<Response>
}

const ItemContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 14px;
`

const NameContainer = styled.p`
	margin: 0;
	color: ${colors.darkBlue};
	font-size: ${sizes[3]};
`

const IconContainer = styled.div`
	height: 26px;
	margin-right: 13px;
`

export const ListItem = ({
	name,
	isChecked,
	toggleCheckItem,
	deleteItem
}: Props): ReactElement => {
	const [isDeleting, setIsDeleting] = useState<boolean>(false)

	const startDeleting = (): void => setIsDeleting(true)

	const stopDeleting = (): void => setIsDeleting(false)

	const handleDelete = (): void => {
		if (!deleteItem) {
			console.warn("No item id or list id was provided")

			return 
		}

		deleteItem().then(({ error }): void => {
			error && console.error("Error while deleting item:", error)
			error && setIsDeleting(false)
		})
	}

	return (
		<ItemContainer>
			{isDeleting ? (
				<>
					<NameContainer>Delete?</NameContainer>
					<Button
						text="Yes"
						buttonType={BtnTypes.DeleteItem}
						clickHandler={handleDelete}
						style={{ width: "60px "}}
					/>
					<Button
						text="No"
						buttonType={BtnTypes.No}
						clickHandler={stopDeleting}
						style={{ width: "60px "}}
					/>
				</>
			) : (
				<>
					<IconContainer onClick={toggleCheckItem}>
						{isChecked ? <CheckedIcon /> : <UncheckedIcon />}
					</IconContainer>
					<NameContainer>{name}</NameContainer>
					<Button
						text="Delete"
						buttonType={BtnTypes.DeleteItem}
						clickHandler={startDeleting}
					/>
				</>
			)}
		</ItemContainer>
	)
}
