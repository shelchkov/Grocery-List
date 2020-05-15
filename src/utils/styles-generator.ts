import { breakpoints } from "./styles"

const stylesList: { [key: string]: string } = {
	width: "width",
	minWidth: "min-width",
	maxWidth: "max-width",
	height: "height",
	maxHeight: "max-height",
	padding: "padding",
	margin: "margin",
	marginTop: "margin-top",
	marginLeft: "margin-left",

	position: "position",
	top: "top",
	left: "left",
	right: "right",

	color: "color",
	backgroundColor: "background-color",
	
	display: "display",
	flexDirection: "flex-direction",
	justifyContent: "justify-content",
	alignItems: "align-items",

	fontSize: "font-size",
	fontWeight: "font-weight",
	textAlign: "text-align",

	border: "border",
	borderRadius: "border-radius",
	boxShadow: "box-shadow",
	opacity: "opacity",
	cursor: "cursor",
}

const getStyle = (
	property: string,
	styles: Styles,
	breakpoint: number
): string => {
	const propertyName = stylesList[property]

	if (!propertyName) {
		return ""
	}

	const values = (styles as {[key :string]: string})[property]
	const value = Array.isArray(values) ? values[breakpoint] :
		(breakpoint === 0 && values)

	return value ? `${propertyName}: ${value}; ` : ""
}

const getBreakpointStyles = (
	properties: string[],
	styles: Styles,
	breakpoint: number
): string => properties.reduce((acc, property): string => acc + 
		getStyle(property, styles, breakpoint)
	, "")

export const stylesGenerator = (styles: Styles): string => {
	const properties = Object.keys(styles)
	const medium = getBreakpointStyles(properties, styles, 1)
	const desktop = getBreakpointStyles(properties, styles, 2)

	return getBreakpointStyles(properties, styles, 0) + 
		(medium && `@media (min-width: ${breakpoints.sm}) {	${medium}}`) +
		(desktop && `@media (min-width: ${breakpoints.lg}) { ${desktop}}`)
}
