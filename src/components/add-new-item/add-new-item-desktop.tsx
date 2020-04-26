import React, { ReactElement } from "react"

import { AddNewItemForm } from "./add-new-item.form"
import { DesktopFormContainer } from "./form-container"

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
	height: "auto"
}

const buttonsStyle = {
	marginTop: "16px"
}

const inputStyle = {
	backgroundColor: colors.grey
}

export const AddNewItemDesktop = (props: Props): ReactElement => (
	<DesktopFormContainer>
		<AddNewItemForm
			{...props}
			isActive
			style={style}
			buttonsStyle={buttonsStyle}
			inputStyle={inputStyle}
		/>
	</DesktopFormContainer>
)
