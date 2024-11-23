export type InventoryCategory = "items" | "weapons" | "clothes" | "keys";

export const WeaponsContainersList = ["weapon1", "weapon2", "weapon3", "weapon4", "weapon5"] as const;
export type WeaponsContainers = (typeof WeaponsContainersList)[number];

export const ClothesContainersList = [
	"hat",
	"glasses",
	"tshirt",
	"pant",
	"feet",
	"access",
	"bague",
	"montre",
	"ongle",
	"piercing",
	"bracelet",
	"bouclesoreilles",
	"collier",
	"phat",
	"pglasses",
	"ptshirt",
	"ppant",
	"pfeet",
	"paccess",
	"pbague",
	"pmontre",
	"pongle",
	"ppiercing",
	"pbracelet",
	"pbouclesoreilles",
	"pcollier",
] as const;
export type ClothesContainers = (typeof ClothesContainersList)[number];

export const AllContainerList = [
	"inventory",
	"target",
	"give",
	"use",
	"throw",
	"weapon-slots",
	...WeaponsContainersList,
	...ClothesContainersList,
] as const;
export type DragContainers = (typeof AllContainerList)[number];

export interface IInventoryItem {
	name: string;
	url?: string;
	label: string;
	weight: number;
	count: number;
	rows?: number;
	cols?: number;
	type: InventoryCategory;
	metadatas?: {
		renamed?: string;
		drawableId?: number;
		variationId?: number;
		index?: number;
		premium?: boolean;
		drawableTorsoId?: number;
		variationTorsoId?: number;
		drawableArmsId?: number;
		drawableTshirtId?: number;
		variationTshirtId?: number;
		variationArmsId?: number;
		ammo?: number;
		name?: string;
		canRename?: boolean;
		plate?: string;
		identity?: any;
	};
}

export interface IInventoryClothes {
	hat?: IInventoryItem;
	tshirt?: IInventoryItem;
	pant?: IInventoryItem;
	feet?: IInventoryItem;
	glasses?: IInventoryItem;
	access?: IInventoryItem;
	phat?: IInventoryItem;
	ptshirt?: IInventoryItem;
	ppant?: IInventoryItem;
	pfeet?: IInventoryItem;
	pglasses?: IInventoryItem;
	paccess?: IInventoryItem;
}

export interface IInventoryWeapons {
	1?: IInventoryItem;
	2?: IInventoryItem;
	3?: IInventoryItem;
	4?: IInventoryItem;
}

export interface IInventoryHud {
	hunger: number;
	thirst: number;
	maxWeight: number;
}

export interface IInventoryState {
	items: IInventoryItem[];
	clothes: IInventoryClothes;
	weapons: IInventoryWeapons;
	hud?: IInventoryHud;
	target?: {
		items: IInventoryItem[];
		maxWeight: number;
		name: string;
	};
}
