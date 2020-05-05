import React, { ReactElement } from "react"

import { ItemName } from "./item-name"
import { Button } from "../button/button"

import { BtnTypes } from "../../utils/enums"

interface Props {
	handleDelete: () => void
	stopDeleting: () => void
}

export const DeletingItem = ({
	handleDelete,
	stopDeleting
}: Props): ReactElement => (
	<>
		<ItemName>Delete?</ItemName>
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
)
