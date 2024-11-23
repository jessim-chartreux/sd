import React from "react";
import "./range.scss";

interface IFuelRangeProps {
	value: number;
	min: number;
	max: number;
	onChange: (value: number) => void;
}

const FuelRange: React.FC<IFuelRangeProps> = props => {
	const progressPercent = Math.round((props.value * 100) / props.max);
	return (
		<input
			value={props.value}
			onChange={e => props.onChange(+e.target.value)}
			min={props.min}
			max={props.max}
			style={{ background: `linear-gradient(90deg, #FFF 0%, #FFF ${progressPercent}%, #2E5374 ${progressPercent}%, #2E5374 100%)` }}
			className="fuel-range"
			type="range"
		/>
	);
};

export default FuelRange;
