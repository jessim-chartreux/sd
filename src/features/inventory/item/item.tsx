import "./item.scss";

import React, { useEffect, useMemo, useState } from "react";

import { IInventoryItem } from "../types";

type IItem = IInventoryItem & { dragged?: boolean; selected: boolean };

const InventoryItem: React.FC<IItem> = React.memo((props: IItem) => {
	const [loading, setLoading] = useState(true);

	const imageSrc = useMemo(() => {
		return props.url ? `url(${props.url})` : `url(https://cdn.sacul.cloud/v2/vision-cdn/inventory/items/${props.name}.webp)`;
	}, [props.url, props.name]);

	useEffect(() => {
		const img = new Image();
		img.src = props.url || `assets/inventory/items/${props.name}.webp`;
		img.onload = () => setLoading(false);
		img.onerror = () => setLoading(false);
	}, [props.url, props.name]);

	return (
		<div className={`inventory-item ${props.dragged ? "dragged" : ""} ${props.selected ? "inventory-item-selected" : ""}`}>
			<div className="item-quantity">{props.count}</div>
			{loading ? (
				<div className="item-image-loading-spinner" />
			) : (
				<div className="item-image" style={{ backgroundImage: imageSrc, scale: props.url ? "1.4" : "1.0" }} />
			)}
			<div
				className="item-label"
				style={props.metadatas?.premium ? { background: "linear-gradient(180deg, #ffc826 0%, #fb9d04 100%)" } : {}}>
				{props.metadatas?.renamed || props.label}
			</div>
		</div>
	);
});

InventoryItem.displayName = "InventoryItem";

export default InventoryItem;
