import "./container.scss";

import React from "react";

export interface IFuelContainerProps {
	title: string;
	children: React.ReactNode;
}

const FuelContainer: React.FC<IFuelContainerProps> = props => {
	return (
		<div className="fuel-container">
			<div className="fuel-container_header">
				<img
					className="fuel-container_header_logo"
					src="https://cdn.sacul.cloud/v2/vision-cdn/fuelstation/logo-ltd.webp"
					alt="LTD Logo"
				/>
				<div className="fuel-container_header_title">{props.title}</div>
			</div>
			<div className="fuel-container_content">{props.children}</div>
		</div>
	);
};

export default FuelContainer;
