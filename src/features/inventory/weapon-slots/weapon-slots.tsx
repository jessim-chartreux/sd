import React from "react";
import { IInventoryItem, IInventoryWeapons } from "../types";
import "./weapon-slots.scss";

const InventoryWeaponSlots: React.FC<{
	setDropTo: (zone: string) => void;
	onItemClick: (item: IInventoryItem) => void;
	onItemDragStart: (item: IInventoryItem, from: string) => void;
	canDrop: boolean;
	weapons: IInventoryWeapons;
}> = props => {
	return (
		<>
			<div className="weapon-slots">
				<div
					className={`slot ${props.canDrop ? "drop-effect" : ""}`}
					onMouseEnter={() => props.setDropTo("weapon1")}
					onMouseLeave={() => props.setDropTo("")}>
					{props.weapons[1] && (
						<div
							className="item-image"
							style={{
								backgroundImage: props.weapons[1].url
									? `url(${props.weapons[1].url})`
									: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.weapons[1].name}.webp)`,
							}}
							onClick={() => props.onItemClick(props.weapons[1])}
							onMouseDown={() => props.onItemDragStart(props.weapons[1], "weapon1")}
						/>
					)}
					<div className="placeholder">1</div>
				</div>
				<div
					className={`slot ${props.canDrop ? "drop-effect" : ""}`}
					onMouseEnter={() => props.setDropTo("weapon2")}
					onMouseLeave={() => props.setDropTo("")}>
					{props.weapons[2] && (
						<div
							className="item-image"
							style={{
								backgroundImage: props.weapons[2].url
									? `url(${props.weapons[2].url})`
									: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.weapons[2].name}.webp)`,
							}}
							onClick={() => props.onItemClick(props.weapons[2])}
							onMouseDown={() => props.onItemDragStart(props.weapons[2], "weapon2")}
						/>
					)}
					<div className="placeholder">2</div>
				</div>
				<div
					className={`slot ${props.canDrop ? "drop-effect" : ""}`}
					onMouseEnter={() => props.setDropTo("weapon3")}
					onMouseLeave={() => props.setDropTo("")}>
					{props.weapons[3] && (
						<div
							className="item-image"
							style={{
								backgroundImage: props.weapons[3].url
									? `url(${props.weapons[3].url})`
									: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.weapons[3].name}.webp)`,
							}}
							onClick={() => props.onItemClick(props.weapons[3])}
							onMouseDown={() => props.onItemDragStart(props.weapons[3], "weapon3")}
						/>
					)}
					<div className="placeholder">3</div>
				</div>
				<div
					className={`slot ${props.canDrop ? "drop-effect" : ""}`}
					onMouseEnter={() => props.setDropTo("weapon4")}
					onMouseLeave={() => props.setDropTo("")}>
					{props.weapons[4] && (
						<div
							className="item-image"
							style={{
								backgroundImage: props.weapons[4].url
									? `url(${props.weapons[4].url})`
									: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.weapons[4].name}.webp)`,
							}}
							onClick={() => props.onItemClick(props.weapons[4])}
							onMouseDown={() => props.onItemDragStart(props.weapons[4], "weapon4")}
						/>
					)}
					<div className="placeholder">4</div>
				</div>
				<div
					className={`slot ${props.canDrop ? "drop-effect" : ""}`}
					onMouseEnter={() => props.setDropTo("weapon5")}
					onMouseLeave={() => props.setDropTo("")}>
					{props.weapons[5] && (
						<div
							className="item-image"
							style={{
								backgroundImage: props.weapons[5].url
									? `url(${props.weapons[5].url})`
									: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.weapons[5].name}.webp)`,
							}}
							onClick={() => props.onItemClick(props.weapons[5])}
							onMouseDown={() => props.onItemDragStart(props.weapons[5], "weapon5")}
						/>
					)}
					<div className="placeholder">5</div>
				</div>
			</div>
			<div className="weapon-slots-background" />
		</>
	);
};

export default InventoryWeaponSlots;
