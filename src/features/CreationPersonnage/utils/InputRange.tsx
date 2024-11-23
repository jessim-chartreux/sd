import clsx from "clsx";
import React from "react";

const InputRange: React.FC<any> = ({ rangeName, className, onChange, customStyle, max = 10, min = 0, defaultV = 5 }) => {
	const classx = clsx("range__wrapper", className);

	return (
		<div className={classx}>
			<span className="range__label">{rangeName}</span>
			<div className="range__bottom">
				<input type="range" max={max} defaultValue={defaultV} min={min} onChange={onChange} style={customStyle} />
			</div>
			<div className="range__labels">
				<span />
				<span />
			</div>
		</div>
	);
};

export default InputRange;
