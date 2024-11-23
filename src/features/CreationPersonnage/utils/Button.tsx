import clsx from "clsx";
import React from "react";

const Button: React.FC<any> = ({ disabled, className, onClick, customStyle, children, type = "NONE" }) => {
	const btnClass = clsx("btn", `btn-${type}`, className, disabled ? "disabled" : "");

	return (
		<button style={{ ...customStyle }} className={btnClass} disabled={disabled} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
