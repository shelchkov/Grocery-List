const stylesList: { [key: string]: string } = {
	width: "width",
	height: "height",
	padding: "padding",
	marginTop: "margin-top",
	marginLeft: "margin-left",

	color: "color",
	backgroundColor: "background-color",
	
	flexDirection: "flex-direction",
	alignItems: "align-items",

	boxShadow: "box-shadow",
	opacity: "opacity",
	cursor: "cursor",
}

const getStyle = (property: string, value: string): string => {
	const propertyName = stylesList[property]
	return propertyName ? `${propertyName}: ${value}; ` : ""
}

export const stylesGenerator = (styles: Styles): string => {
	const properties = Object.keys(styles)
	return properties.reduce((acc, property): string => acc + 
		getStyle(property, (styles as {[key :string]: string})[property])
	, "")
}
