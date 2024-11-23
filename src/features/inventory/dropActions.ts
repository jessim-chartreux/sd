import { postAsync } from "../../utils/postAsync";
import {
	ClothesContainers,
	ClothesContainersList,
	DragContainers,
	IInventoryItem,
	WeaponsContainers,
	WeaponsContainersList,
} from "./types";

export const useItem = (item: IInventoryItem, quantity: number) => postAsync("inventory-use-item", { item, quantity });

export const putClothe = (item: IInventoryItem) => {
	if (ClothesContainersList.includes(item.name as ClothesContainers)) {
		postAsync("inventory-put-clothe", { item });
	}
};

// Helper function to extract weapon bind number
const extractWeaponBind = (container: string): number => {
	return parseInt(container.replace("weapon", ""), 10);
};

// Main function to determine the drop action based on context
export const getDropAction = (
	from: DragContainers,
	to: DragContainers,
	item: IInventoryItem,
	selectedQuantity: number,
	allSelected: boolean,
): (() => void) | undefined => {
	// Use item from inventory
	if (to === "use" && item.type === "items" && from === "inventory") {
		return () => useItem(item, selectedQuantity);
	}

	// Throw item from inventory
	if (to === "throw" && from === "inventory") {
		return () => postAsync("inventory-throw-item", { item, quantity: selectedQuantity });
	}

	// Give item from inventory
	if (to === "give" && from === "inventory") {
		return () => postAsync("inventory-give-item", { item, quantity: selectedQuantity });
	}

	// Equip clothes
	if (from === "inventory" && ClothesContainersList.includes(to as ClothesContainers) && item.name === to) {
		return () => putClothe(item);
	}

	// Bind weapon
	if (from === "inventory" && WeaponsContainersList.includes(to as WeaponsContainers)) {
		const bind = extractWeaponBind(to);
		return () => postAsync("inventory-bind-weapon", { item, bind });
	}

	// Remove clothes
	if (ClothesContainersList.includes(from as ClothesContainers) && to === "inventory") {
		return () => postAsync("inventory-remove-clothe", { item });
	}

	// Unbind weapon
	if (WeaponsContainersList.includes(from as WeaponsContainers) && to === "inventory") {
		const bind = extractWeaponBind(from);
		return () => postAsync("inventory-unbind-weapon", { item, bind });
	}

	// Take item from target
	if (to === "inventory" && from === "target") {
		if (allSelected) {
			return () => postAsync("inventory-take-all");
		}
		return () => postAsync("inventory-take-item", { item, quantity: selectedQuantity });
	}

	// Put item to target
	if (to === "target" && from === "inventory") {
		return () => postAsync("inventory-put-item", { item, quantity: selectedQuantity });
	}

	return undefined; // Explicit return for undefined cases
};

// Check if an item can be dropped based on context
export const canDrop = (from: DragContainers, to: DragContainers, item: IInventoryItem, selectedQuantity: number): boolean =>
	!!getDropAction(from, to, item, selectedQuantity, false);
