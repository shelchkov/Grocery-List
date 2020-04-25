import React, { ReactElement } from "react"

import { AddNewItemForm } from "./add-new-item.form"

interface Props {
	userId: string | undefined
	listId: string | undefined
	style?: Styles
}

// const style = {}

export const AddNewItemDesktop = (props: Props): ReactElement => (
	<AddNewItemForm {...props} isActive />
)
