import React, { ReactElement } from "react"

import { AddNewItemForm } from "./add-new-item.form"

import { colors } from "../../utils/styles"

interface Props {
	userId: string | undefined
	listId: string | undefined
	style?: Styles
}

const style = {
	padding: "28px 40px 30px 40px",
	flexDirection: "column",
	alignItems: "center",
	height: "auto",
	maxHeight: "84px",
	marginTop: "60px",
	backgroundColor: colors.lightGrey,
	border: `1px solid ${colors.darkBlue}`,
	borderRadius: "10px"
}

const buttonsStyle = {
	marginTop: "16px"
}

const inputStyle = {
	backgroundColor: colors.grey
}

export const AddNewItemDesktop = (props: Props): ReactElement => (
	<AddNewItemForm
		isActive
		{...props}
		style={{ ...props.style, ...style }}
		buttonsStyle={buttonsStyle}
		inputStyle={inputStyle}
	/>
)
