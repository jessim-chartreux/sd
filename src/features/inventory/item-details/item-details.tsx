import React, { useState, useMemo, useCallback } from "react";
import Input from "../../../shared/input";
import "./item-details.scss";

interface ItemDetailsProps {
	name: string;
	url?: string;
	label: string;
	count: number;
	weight: number;
	selectedQuantity: number;
	onQuantityChange: (quantity: number) => void;
	tabState: "rename" | "quantity" | "infos";
	setActiveTab: (tabState: "rename" | "quantity" | "infos") => void;
	doRename: (name: string) => void;
}

const InventoryItemDetails: React.FC<ItemDetailsProps> = props => {
	const [rename, setRename] = useState("");

	// Memoized value to calculate progress percentage
	const progressPercent = useMemo(() => {
		return Math.round(((props.selectedQuantity - 1) * 100) / (props.count - 1));
	}, [props.selectedQuantity, props.count]);

	const onKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter" && rename) {
				props.doRename(rename);
				setRename("");
			}
		},
		[rename, props],
	);

	const handleQuantityChange = useCallback(
		(value: number) => {
			if (value > props.count) {
				props.onQuantityChange(props.count);
			} else if (value < 1) {
				props.onQuantityChange(1);
			} else {
				props.onQuantityChange(value);
			}
		},
		[props],
	);

	if (props.tabState === "rename") {
		return (
			<div className="selected-item selected-item-column">
				<div className="title">
					<span>Renommer votre item</span>
					<button onClick={() => props.setActiveTab("infos")}>Fermer</button>
				</div>
				<Input
					placeholder="Ex: Weed Mango Fraîche"
					type="text"
					className="rename-input"
					value={rename}
					onChange={e => setRename(e.target.value)}
					onKeyDown={onKeyDown}
					aria-label="Rename Item"
				/>
			</div>
		);
	}

	if (props.tabState === "quantity") {
		return (
			<div className="selected-item selected-item-column">
				<div className="title">
					<span>Sélectionnez une quantité</span>
					<button onClick={() => props.setActiveTab("infos")}>Fermer</button>
				</div>
				<div className="quantity-container">
					<div className="quantity-container-30">
						<Input
							value={props.selectedQuantity}
							onChange={e => {
								const value = e.target.value.replace(/[.,]/g, "");
								handleQuantityChange(+value);
							}}
							min={1}
							max={props.count}
							className="quantity-input"
							type="number"
							aria-label="Select Quantity"
						/>
					</div>
					<div className="quantity-container-70">
						<Input
							value={props.selectedQuantity}
							onChange={e => props.onQuantityChange(+e.target.value)}
							min={1}
							max={props.count}
							style={{
								background: `linear-gradient(90deg, #FFF 0%, #FFF ${progressPercent}%, rgba(255, 255, 255, 0.25) ${progressPercent}%, rgba(255, 255, 255, 0.25) 100%)`,
							}}
							className="quantity-range"
							type="range"
							aria-label="Quantity Range"
						/>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="selected-item">
			<div className="selected-image">
				<div
					style={{
						backgroundImage: props.url
							? `url(${props.url})`
							: `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.name}.webp)`,
						transform: props.url ? "scale(1.4)" : "scale(1.0)",
					}}
				/>
			</div>
			<div className="item-details">
				<div className="item-infos">Nom de l'objet: {props.label}</div>
				<div className="item-infos">Vous en avez: {props.count}</div>
				<div className="item-infos">Poids: {props.weight}kg</div>
				<div className="selected-buttons">
					<button onClick={() => props.setActiveTab("quantity")}>Quantité</button>
					<button onClick={() => props.setActiveTab("rename")}>Renommer</button>
				</div>
			</div>
		</div>
	);
};

export default InventoryItemDetails;
