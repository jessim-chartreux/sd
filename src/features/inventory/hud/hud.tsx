import React, { useState } from "react";
import "./hud.scss";

export interface IInventoryHudProps {
	hunger: number;
	thirst: number;
	weight: number;
	realWeight: number;
	realMaxWeight: number;
}

const InventoryHud: React.FC<IInventoryHudProps> = props => {
	const [weightHover, setWeightHover] = useState(false);
	return (
		<div className="inventory-hud">
			<div className="hud-item" style={{ backgroundImage: 'url("https://cdn.sacul.cloud/v2/vision-cdn/inventory/thirst.webp")' }}>
				<svg height="60" width="60">
					<circle cx="30" cy="30" r="28" fill="transparent" stroke="rgba(120, 214, 255, 0.2)" strokeWidth="4" />
				</svg>
				<svg height="60" width="60">
					<circle
						cx="30"
						cy="30"
						r="28"
						stroke="rgba(120, 214, 255, 1)"
						strokeWidth="4"
						fill="transparent"
						strokeDasharray={`${2 * Math.PI * 28 * props.thirst}, ${2 * Math.PI * 28}`}
						style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
					/>
				</svg>
			</div>
			<div className="hud-item" style={{ backgroundImage: 'url("https://cdn.sacul.cloud/v2/vision-cdn/inventory/hunger.webp")' }}>
				<svg height="60" width="60">
					<circle cx="30" cy="30" r="28" fill="transparent" stroke="rgba(115, 255, 96, 0.2)" strokeWidth="4" />
				</svg>
				<svg height="60" width="60">
					<circle
						cx="30"
						cy="30"
						r="28"
						stroke="rgba(115, 255, 96, 1)"
						strokeWidth="4"
						fill="transparent"
						strokeDasharray={`${2 * Math.PI * 28 * props.hunger}, ${2 * Math.PI * 28}`}
						style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
					/>
				</svg>
			</div>
			<div
				className="hud-item"
				style={{ backgroundImage: !weightHover && 'url("https://cdn.sacul.cloud/v2/vision-cdn/inventory/backpack.webp")' }}
				onMouseEnter={() => setWeightHover(true)}
				onMouseLeave={() => setWeightHover(false)}>
				{weightHover && (
					<p className="weight">
						{props.realWeight.toFixed(0) + "/" + props.realMaxWeight.toFixed(0)} <span>KG</span>
					</p>
				)}
				<svg height="60" width="60">
					<circle cx="30" cy="30" r="28" fill="transparent" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="4" />
				</svg>
				<svg height="60" width="60">
					<circle
						cx="30"
						cy="30"
						r="28"
						stroke="white"
						strokeWidth="4"
						fill="transparent"
						strokeDasharray={`${2 * Math.PI * 28 * props.weight}, ${2 * Math.PI * 28}`}
						style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
					/>
				</svg>
			</div>
		</div>
	);
};

export default InventoryHud;
