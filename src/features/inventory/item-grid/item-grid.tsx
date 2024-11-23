import React, { useMemo, useRef } from "react";
import InventoryItem from "../item/item";
import { IInventoryItem } from "../types";
import "./item-grid.scss";

interface IItemGridProps {
	items: IInventoryItem[];
	onItemClick?: (item: IInventoryItem) => void;
	onItemDragStart?: (item: IInventoryItem) => void;
	setDropTo?: (zone: string) => void;
	draggedItem?: IInventoryItem;
	selectedItem?: IInventoryItem;
	selectedItems?: IInventoryItem[];
	cols: number;
	rows: number;
	canDrop: boolean;
	containerName: "inventory" | "target";
	allSelected?: boolean;
	onItemRightClick?: (item: IInventoryItem) => void;
	separateByName?: boolean;
	separateByWeight?: boolean;
}

type CategoryName =
	| "outfit"
	| "tshirt"
	| "ptshirt"
	| "pglasses"
	| "phat"
	| "ppant"
	| "paccs"
	| "mask"
	| "pant"
	| "hat"
	| "access"
	| "glasses"
	| "feet"
	| "montre"
	| "bague"
	| "bracelet"
	| "bouclespreommes"
	| "collier"
	| "ongle"
	| "piercing"
	| "bouclesoreilles";

const categoryNames: Record<CategoryName, string> = {
	outfit: "Tenues",
	tshirt: "Hauts",
	ptshirt: "Hauts",
	pglasses: "Accessoires",
	phat: "Chapeaux",
	ppant: "Pantalons",
	paccs: "Accessoires",
	mask: "Masques",
	pant: "Pantalons",
	hat: "Chapeaux",
	access: "Accessoires",
	glasses: "Accessoires",
	feet: "Chaussures",
	montre: "Accessoires",
	bague: "Accessoires",
	bracelet: "Accessoires",
	bouclespreommes: "Accessoires",
	collier: "Accessoires",
	ongle: "Accessoires",
	piercing: "Accessoires",
	bouclesoreilles: "Accessoires",
};

const categories = ["Tenues", "Hauts", "Pantalons", "Chaussures", "Chapeaux", "Masques", "Accessoires"];
const weightCategories = ["Armes de poing", "Armes d'assault", "Armes lourdes", "Accessoires"];

const getWeightCategory = (weight: number): string => {
	if (weight <= 1) return "Accessoires";
	if (weight <= 2) return "Armes de poing";
	if (weight <= 4) return "Armes d'assault";
	return "Armes lourdes";
};

const InventoryItemGrid: React.FC<IItemGridProps> = props => {
	const gridRef = useRef<HTMLDivElement>(null);
	const gridCellSize = 94;
	const gridGap = 15;
	const gridHeight = props.rows * gridCellSize + (props.rows - 1) * gridGap;
	const gridWidth = props.cols * gridCellSize + (props.cols - 1) * gridGap;

	const calculatePlaceholders = (items: IInventoryItem[], totalCells: number) => {
		const occupiedCells = items.reduce((total, item) => total + (item.cols || 1) * (item.rows || 1), 0);
		const placeholdersNeeded = totalCells - occupiedCells;

		return Array.from({ length: placeholdersNeeded }, (_, index) => (
			<div className="item-container disable-hover" key={`placeholder-${index}`}></div>
		));
	};

	const placeholders = useMemo(() => {
		const totalCells = props.rows * props.cols;
		return calculatePlaceholders(props.items, totalCells);
	}, [props.items, props.rows, props.cols]);

	const renderCategoryItems = (categoryItems: IInventoryItem[], categoryKey: string) => (
		<>
			{categoryItems.map((item, index) => (
				<div
					className="item-container"
					key={`${categoryKey}-${index}`}
					onClick={() => props.onItemClick?.(item)}
					onMouseDown={() => props.onItemDragStart?.(item)}
					onContextMenu={() => props.onItemRightClick?.(item)}>
					<InventoryItem
						{...item}
						dragged={(props.allSelected && !!props.draggedItem) || props.draggedItem === item}
						selected={
							!!props.allSelected ||
							props.selectedItem === item ||
							(props.selectedItems && props.selectedItems.includes(item))
						}
					/>
				</div>
			))}
			{calculatePlaceholders(categoryItems, props.cols)}
		</>
	);

	const renderGridForCategory = (category: string, categoryItems: IInventoryItem[], index: number) => (
		<div className="category" key={`category-${index}`}>
			<div className="category-name">{category}</div>
			<div
				ref={gridRef}
				className={`inventory-grid ${props.canDrop ? "drop-effect" : ""}`}
				style={{ gridTemplateColumns: `${gridCellSize}px `.repeat(props.cols) }}>
				{renderCategoryItems(categoryItems, category)}
			</div>
		</div>
	);

	const filteredItemsByCategoryName = (category: string) =>
		props.items.filter(item => categoryNames[item.name as CategoryName] === category);

	const filteredItemsByWeightCategory = (category: string) =>
		props.items.filter(item => getWeightCategory(item.weight as number) === category);

	const renderCategories = () => {
		if (props.separateByName) {
			return categories.map((category, index) => {
				const categoryItems = filteredItemsByCategoryName(category);
				return categoryItems.length > 0 ? renderGridForCategory(category, categoryItems, index) : null;
			});
		}

		if (props.separateByWeight) {
			return weightCategories.map((category, index) => {
				const categoryItems = filteredItemsByWeightCategory(category);
				return categoryItems.length > 0 ? renderGridForCategory(category, categoryItems, index) : null;
			});
		}

		return null;
	};

	return (
		<div
			className="grid-container"
			onMouseEnter={() => props.setDropTo?.(props.containerName)}
			onMouseLeave={() => props.setDropTo?.("")}
			style={{
				height: gridHeight + "px",
				width: gridWidth + "px",
			}}>
			{renderCategories()}
			{!props.separateByName && !props.separateByWeight && (
				<div
					ref={gridRef}
					className={`inventory-grid ${props.canDrop ? "drop-effect" : ""}`}
					style={{ gridTemplateColumns: `${gridCellSize}px `.repeat(props.cols) }}>
					{props.items.map((item, index) => (
						<div
							className="item-container"
							key={`item-${index}`}
							onClick={() => props.onItemClick?.(item)}
							onMouseDown={() => props.onItemDragStart?.(item)}
							onContextMenu={() => props.onItemRightClick?.(item)}>
							<InventoryItem
								{...item}
								dragged={(props.allSelected && !!props.draggedItem) || props.draggedItem === item}
								selected={
									!!props.allSelected ||
									props.selectedItem === item ||
									(props.selectedItems && props.selectedItems.includes(item))
								}
							/>
						</div>
					))}
					{placeholders}
				</div>
			)}
		</div>
	);
};

export default InventoryItemGrid;
