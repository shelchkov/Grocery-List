import styled from "styled-components"

import {
	ButtonBase,
	OutlinedButton,
	WithoutBgButton
} from "./base-button"

import { colors } from "../../utils/styles"

export const AddNewItemBtn = styled(ButtonBase)`
	width: 150px;
	background-color: ${colors.green};
`

export const ShareListBtn = styled(ButtonBase)`
	width: 130px;
	background-color: ${colors.darkGreen};
`

export const SignOutBtn = styled(ShareListBtn)`
	background-color: ${colors.orange};
`

export const DeleteItemBtn = styled(OutlinedButton)`
	height: 29px;
	margin-left: auto;
	padding: 0 14px;
`

export const NoBtn = styled(DeleteItemBtn)`
	margin-left: 12px;
	color: ${colors.grey};
	background-color: ${colors.darkGreen};
	border: none;
`

export const DesktopActionBtn = styled(WithoutBgButton)`
	color: ${colors.darkBlue};
`
