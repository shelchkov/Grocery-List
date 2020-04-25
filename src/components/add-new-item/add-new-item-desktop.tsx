import React, { ReactElement } from "react"
import styled from "styled-components"

import { AddNewItemForm } from "./add-new-item.form"

import { colors } from "../../utils/styles"

interface Props {
	userId: string | undefined
	listId: string | undefined
	style?: Styles
}

const FormContainer = styled.div`
	margin-top: 60px;
	max-height: 142px;
	background-color: ${colors.lightGrey};
	border: 1px solid ${colors.darkBlue};
	border-radius: 10px;
`

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
	<FormContainer>
		<AddNewItemForm
			{...props}
			isActive
			style={style}
			buttonsStyle={buttonsStyle}
			inputStyle={inputStyle}
		/>
	</FormContainer>
)
