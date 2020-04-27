import styled from "styled-components"

import { colors } from "../../utils/styles"

export const FormContainer = styled.form`
	display: flex;
	flex-direction: ${(p: Styles): string => p.flexDirection || "row"};
	justify-content: flex-end;
	align-items: ${(p: Styles): string => p.alignItems || "stretch"};
	max-width: 272px;
	height: ${(p: Styles): string => p.height || "34px"};
	margin-left: auto;
	margin-top: ${(p: Styles): string => p.marginTop || "0"};
	padding: ${(p: Styles): string => p.padding || "0"};

	background-color: ${(p: Styles): string => p.backgroundColor ||
		"transparent"};
`
export const DesktopFormContainer = styled.div`
	margin-top: 60px;
	max-height: 142px;
	background-color: ${colors.lightGrey};
	border: 1px solid ${colors.darkBlue};
	border-radius: 10px;
`
