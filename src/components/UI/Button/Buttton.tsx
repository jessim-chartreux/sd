import React from "react";
import { playOnClickSound, playOnHoverSound } from "../../../utils/sounds";
import "./style.scss";

const Button: React.FC<any> = ({
	label,
	height,
	width,
	fontSize,
	fontWeight,
	color,
	margin,
	callback,
	selected,
	padding,
	children,
	disabledType,
	selectedStyle = {
		filter: "brightness(1.1)",
	},
	disableHoverSound = false,
	submitSound = false,
	disabled = false,
	readOnly = false,
	customVisu,
}) => {
	return (
		<div
			onClick={() => {
				if (callback) callback();
				if (submitSound) {
					playOnClickSound();
				} else {
					playOnHoverSound();
				}
			}}
			className={
				"buttonCustom " + color + " " + (disabled ? "disabled" : "") + (readOnly ? "readOnly" : "") + " " + (disabledType ?? "")
			}
			style={{
				height,
				width,
				fontSize,
				fontWeight,
				padding,
				margin,
				...(selected ? { ...selectedStyle } : {}),
			}}>
			{label}
			{children}
			{disabled && disabledType === "goldSubscriptionRequired" && <span className="disabledGoldRequired">ABONNEMENT GOLD</span>}
			{customVisu}
		</div>
	);
};

export default Button;
