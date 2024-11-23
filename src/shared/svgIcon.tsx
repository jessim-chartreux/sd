import React from "react";
import { ReactSVG } from "react-svg";

interface SvgIconProps {
	width?: number;
	height?: number;
	widthVh?: number;
	heightVh?: number;
	className?: string;
	src: string;
	onClick?: VoidFunction;
}

const SvgIcon: React.FC<SvgIconProps> = props => {
	const { width, height, heightVh, widthVh, ...otherProps } = props;

	return (
		<ReactSVG
			onClick={props.onClick}
			beforeInjection={svg => {
				if (width) svg.setAttribute("width", props.width + "px");
				if (widthVh) svg.setAttribute("width", props.widthVh + "vh");
				if (height) svg.setAttribute("height", props.height + "px");
				if (heightVh) svg.setAttribute("height", props.heightVh + "vh");
			}}
			{...otherProps}
		/>
	);
};

export default SvgIcon;
