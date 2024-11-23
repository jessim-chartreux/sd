import "./clothes-slots.scss";

import { IInventoryClothes, IInventoryItem } from "../types";

import React from "react";

const InventoryClothesSlots: React.FC<{
	setDropTo: (zone: string) => void;
	onItemClick: (item: IInventoryItem) => void;
	onItemDragStart: (item: IInventoryItem, from: string) => void;
	canDrop: boolean;
	clothes: IInventoryClothes;
}> = props => {
	return (
		<div className="clothes-slots">
			<div
				className={`slot ${props.canDrop ? "drop-effect" : ""}`}
				onMouseEnter={() => props.setDropTo("hat")}
				onMouseLeave={() => props.setDropTo("")}
				style={{ backgroundImage: props.clothes.hat ? "" : "url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/hat.svg)" }}>
				{props.clothes.hat && (
					<div
						className="item-image"
						style={{
							backgroundImage: props.clothes.hat?.url
								? `url(${props.clothes.hat.url})`
								: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.clothes.hat.name}.webp)`,
							scale: props.clothes.hat?.url ? "1.3" : "1.0",
						}}
						onClick={() => props.onItemClick(props.clothes.hat)}
						onMouseDown={() => props.onItemDragStart(props.clothes.hat, "hat")}
					/>
				)}
				{props.clothes.phat && (
					<div
						className="item-image"
						style={{
							backgroundImage: props.clothes.hat?.url
								? `url(${props.clothes.hat.url})`
								: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.clothes.hat.name}.webp)`,
							scale: props.clothes.hat?.url ? "1.3" : "1.0",
						}}
						onClick={() => props.onItemClick(props.clothes.hat)}
						onMouseDown={() => props.onItemDragStart(props.clothes.hat, "hat")}
					/>
				)}
			</div>
			<div
				className={`slot ${props.canDrop ? "drop-effect" : ""}`}
				onMouseEnter={() => props.setDropTo("tshirt")}
				onMouseLeave={() => props.setDropTo("")}
				style={{ backgroundImage: props.clothes.tshirt ? "" : "url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/top.svg)" }}>
				{props.clothes.tshirt && (
					<div
						className="item-image"
						style={{
							backgroundImage: props.clothes.tshirt?.url
								? `url(${props.clothes.tshirt.url})`
								: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.clothes.tshirt.name}.webp)`,
							scale: props.clothes.tshirt?.url ? "1.3" : "1.0",
						}}
						onClick={() => props.onItemClick(props.clothes.tshirt)}
						onMouseDown={() => props.onItemDragStart(props.clothes.tshirt, "tshirt")}
					/>
				)}
				{props.clothes.ptshirt && (
					<div
						className="item-image"
						style={{
							backgroundImage: props.clothes.tshirt?.url
								? `url(${props.clothes.tshirt.url})`
								: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.clothes.tshirt.name}.webp)`,
							scale: props.clothes.tshirt?.url ? "1.3" : "1.0",
						}}
						onClick={() => props.onItemClick(props.clothes.tshirt)}
						onMouseDown={() => props.onItemDragStart(props.clothes.tshirt, "tshirt")}
					/>
				)}
			</div>
			<div
				className={`slot ${props.canDrop ? "drop-effect" : ""}`}
				onMouseEnter={() => props.setDropTo("pant")}
				onMouseLeave={() => props.setDropTo("")}
				style={{ backgroundImage: props.clothes.pant ? "" : "url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/pants.svg)" }}>
				{props.clothes.pant && (
					<div
						className="item-image"
						style={{
							backgroundImage: props.clothes.pant?.url
								? `url(${props.clothes.pant.url})`
								: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.clothes.pant.name}.webp)`,
							scale: props.clothes.pant?.url ? "1.3" : "1.0",
						}}
						onClick={() => props.onItemClick(props.clothes.pant)}
						onMouseDown={() => props.onItemDragStart(props.clothes.pant, "pant")}
					/>
				)}
				{props.clothes.ppant && (
					<div
						className="item-image"
						style={{
							backgroundImage: props.clothes.pant?.url
								? `url(${props.clothes.pant.url})`
								: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.clothes.pant.name}.webp)`,
							scale: props.clothes.pant?.url ? "1.3" : "1.0",
						}}
						onClick={() => props.onItemClick(props.clothes.pant)}
						onMouseDown={() => props.onItemDragStart(props.clothes.pant, "pant")}
					/>
				)}
			</div>
			<div
				className={`slot ${props.canDrop ? "drop-effect" : ""}`}
				onMouseEnter={() => props.setDropTo("feet")}
				onMouseLeave={() => props.setDropTo("")}
				style={{ backgroundImage: props.clothes.feet ? "" : "url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/shoes.svg)" }}>
				{props.clothes.feet && (
					<div
						className="item-image"
						style={{
							backgroundImage: props.clothes.feet?.url
								? `url(${props.clothes.feet.url})`
								: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.clothes.feet.name}.webp)`,
							scale: props.clothes.feet?.url ? "1.3" : "1.0",
						}}
						onClick={() => props.onItemClick(props.clothes.feet)}
						onMouseDown={() => props.onItemDragStart(props.clothes.feet, "feet")}
					/>
				)}
				{props.clothes.pfeet && (
					<div
						className="item-image"
						style={{
							backgroundImage: props.clothes.feet?.url
								? `url(${props.clothes.feet.url})`
								: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.clothes.feet.name}.webp)`,
							scale: props.clothes.feet?.url ? "1.3" : "1.0",
						}}
						onClick={() => props.onItemClick(props.clothes.feet)}
						onMouseDown={() => props.onItemDragStart(props.clothes.feet, "feet")}
					/>
				)}
			</div>
			<div
				className={`slot ${props.canDrop ? "drop-effect" : ""}`}
				onMouseEnter={() => props.setDropTo("glasses")}
				onMouseLeave={() => props.setDropTo("")}
				style={{
					backgroundImage: props.clothes.glasses ? "" : "url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/glasses.svg)",
				}}>
				{props.clothes.glasses && (
					<div
						className="item-image"
						style={{
							backgroundImage: props.clothes.glasses?.url
								? `url(${props.clothes.glasses.url})`
								: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.clothes.glasses.name}.webp)`,
							scale: props.clothes.glasses?.url ? "1.3" : "1.0",
						}}
						onClick={() => props.onItemClick(props.clothes.glasses)}
						onMouseDown={() => props.onItemDragStart(props.clothes.glasses, "glasses")}
					/>
				)}
				{props.clothes.pglasses && (
					<div
						className="item-image"
						style={{
							backgroundImage: props.clothes.glasses?.url
								? `url(${props.clothes.glasses.url})`
								: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.clothes.glasses.name}.webp)`,
							scale: props.clothes.glasses?.url ? "1.3" : "1.0",
						}}
						onClick={() => props.onItemClick(props.clothes.glasses)}
						onMouseDown={() => props.onItemDragStart(props.clothes.glasses, "glasses")}
					/>
				)}
			</div>
			<div
				className={`slot ${props.canDrop ? "drop-effect" : ""}`}
				onMouseEnter={() => props.setDropTo("access")}
				onMouseLeave={() => props.setDropTo("")}
				style={{ backgroundImage: props.clothes.access ? "" : "url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/bag.svg)" }}>
				{props.clothes.access && (
					<div
						className="item-image"
						style={{
							backgroundImage: props.clothes.access?.url
								? `url(${props.clothes.access.url})`
								: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.clothes.access.name}.webp)`,
							scale: props.clothes.access?.url ? "1.3" : "1.0",
						}}
						onClick={() => props.onItemClick(props.clothes.access)}
						onMouseDown={() => props.onItemDragStart(props.clothes.access, "access")}
					/>
				)}
				{props.clothes.paccess && (
					<div
						className="item-image"
						style={{
							backgroundImage: props.clothes.access?.url
								? `url(${props.clothes.access.url})`
								: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.clothes.access.name}.webp)`,
							scale: props.clothes.access?.url ? "1.3" : "1.0",
						}}
						onClick={() => props.onItemClick(props.clothes.access)}
						onMouseDown={() => props.onItemDragStart(props.clothes.access, "access")}
					/>
				)}
			</div>
		</div>
	);
};

export default InventoryClothesSlots;
