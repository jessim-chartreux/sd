import React from "react";
import "./button.scss";

interface IFuelButtonProps {
	icon: string;
	onClick: () => void;
	children: React.ReactNode;
}

const FuelButton: React.FC<IFuelButtonProps> = props => {
	return (
		<div className="fuel-button" onClick={props.onClick}>
			<img src={props.icon} alt="Icon" className="icon" />
			{props.children}
		</div>
	);
};

export default FuelButton;
