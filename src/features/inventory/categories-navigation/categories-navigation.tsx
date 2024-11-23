import React from "react";
import { InventoryCategory } from "../types";
import "./categories-navigation.scss";

const InventoryCategoriesNavigation: React.FC<{ current: InventoryCategory; onChange: (category: InventoryCategory) => void }> = props => {
	return (
		<div className="category-navigation">
			<div className={props.current == "weapons" ? "active" : ""} onClick={() => props.onChange("weapons")}>
				Armes
			</div>
			<div className={props.current == "items" ? "active" : ""} onClick={() => props.onChange("items")}>
				Objets
			</div>
			<div className={props.current == "clothes" ? "active" : ""} onClick={() => props.onChange("clothes")}>
				Vêtements
			</div>
			<div className={props.current == "keys" ? "active" : ""} onClick={() => props.onChange("keys")}>
				Clés
			</div>
		</div>
	);
};

export default InventoryCategoriesNavigation;
