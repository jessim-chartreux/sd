import "./inventory.scss";

import { ClothesContainers, ClothesContainersList, DragContainers, IInventoryItem, IInventoryState, InventoryCategory } from "./types";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { canDrop, getDropAction, putClothe, useItem } from "./dropActions";

import { GlobalContext } from "../../app";
import InventoryActionButtons from "./action-buttons/action-buttons";
import InventoryCategoriesNavigation from "./categories-navigation/categories-navigation";
import InventoryHud from "./hud/hud";
import InventoryItem from "./item/item";
import InventoryItemDetails from "./item-details/item-details";
import InventoryItemGrid from "./item-grid/item-grid";
import InventoryWeaponSlots from "./weapon-slots/weapon-slots";
import { isDev } from "../../utils/isDev";
import { mockState } from "./mockState";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const Inventory: React.FC = () => {
	useExitKeys();

	const context = useContext(GlobalContext);

	const initialInventoryState: IInventoryState = useMemo(
		() => (isDev ? mockState : (context.data as IInventoryState) || { items: [], clothes: {}, weapons: {} }),
		[context.data],
	);

	const [state, setState] = useState<IInventoryState>(initialInventoryState);
	const [category, setCategory] = useState<InventoryCategory>("items");
	const [selected, setSelected] = useState<{
		item: IInventoryItem;
		selectedQuantity: number;
		from: "inventory" | "target" | "weapon-slots";
	} | null>(null);

	const [dragedItem, setDragedItem] = useState<IInventoryItem | null>(null);
	const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [tab, setTab] = useState<"rename" | "quantity" | "infos">("infos");
	const [allSelected, setAllSelected] = useState(false);

	const dragFrom = useRef<DragContainers | "">("");
	const dropTo = useRef<DragContainers | "">("");
	const dragTimeout = useRef<NodeJS.Timeout>();

	const setDropTo = useCallback((to: DragContainers | "") => (dropTo.current = to), []);

	useEffect(() => {
		const handleCategoryState = () => {
			if (!state.target) {
				const lastCategory = sessionStorage.getItem("inventory_category") as InventoryCategory;
				if (!!lastCategory && ["items", "weapons", "clothes", "keys"].includes(lastCategory)) {
					setCategory(lastCategory);
				}
			} else {
				setCategory("items");
			}
		};
		handleCategoryState();
	}, [state.target]);

	useEffect(() => {
		const handleWeaponsUpdate = () => {
			const newWeapons = { ...state.weapons };
			Object.keys(newWeapons).forEach(key => {
				if (!newWeapons[key]) return;

				if (!state.items.find(i => i.name === newWeapons[key].name)) {
					postAsync("inventory-unbind-weapon", { item: newWeapons[key], bind: key });
				}
			});
		};
		handleWeaponsUpdate();
	}, [state.weapons, state.items]);

	const onMessage = useCallback((event: any) => {
		if (event.data.type === "updateInventory") {
			setState((event.data.data as IInventoryState) || { items: [], clothes: {}, weapons: {} });
		}
	}, []);

	useEffect(() => {
		window.addEventListener("message", onMessage);
		return () => window.removeEventListener("message", onMessage);
	}, [onMessage]);

	const startDrag = useCallback(
		(item: IInventoryItem, from: DragContainers) => {
			dragTimeout.current = setTimeout(() => {
				setDragedItem(item);
				dragFrom.current = from;

				if (selected?.item !== item) {
					const fromParsed = () => {
						if (from === "inventory") return "target";
						if (from === "target") return "inventory";
						if (from === "weapon-slots") return "inventory";
					};

					const qty = selected?.selectedQuantity > 1 && selected?.selectedQuantity <= item.count ? selected?.selectedQuantity : 1;
					setSelected({ item: item, selectedQuantity: qty, from: fromParsed() });
					setTab("infos");
				}
			}, 150);
		},
		[selected],
	);

	const mouseMove = useCallback((e: MouseEvent) => {
		setMousePos({
			x: e.clientX,
			y: e.clientY,
		});
	}, []);

	const mouseUp = useCallback(() => {
		if (dragedItem != null) {
			if (dragFrom.current) {
				let dropTarget = dropTo.current;
				if (!dropTarget) {
					// Check if mouse is outside of UI bounds
					const element = document.elementFromPoint(mousePos.x, mousePos.y);
					if (element?.id === "inventory" || element?.id === "weapon-slots") {
						dropTarget = "throw";
					}
				}
				if (dropTarget) {
					const action = getDropAction(dragFrom.current, dropTarget, dragedItem, selected?.selectedQuantity, allSelected);
					if (action) action();
				}
			}
			setDragedItem(null);
		}
		if (dragTimeout.current) {
			clearTimeout(dragTimeout.current);
			dragTimeout.current = undefined;
		}
	}, [dragedItem, mousePos, selected, allSelected]);

	useEffect(() => {
		document.addEventListener("mousemove", mouseMove);
		document.addEventListener("mouseup", mouseUp);
		return () => {
			document.removeEventListener("mousemove", mouseMove);
			document.removeEventListener("mouseup", mouseUp);
		};
	}, [mouseMove, mouseUp]);

	const onCategoryChange = useCallback((newCategory: InventoryCategory) => {
		setSelected(null);
		dragFrom.current = "";
		dropTo.current = "";
		setCategory(newCategory);
		sessionStorage.setItem("inventory_category", newCategory);
	}, []);

	const onItemClick = useCallback(
		(item: IInventoryItem, from: "inventory" | "target") => {
			if (selected?.item === item) {
				setSelected(null);
			} else {
				setSelected({ item: item, selectedQuantity: 1, from });
			}
			setTab("infos");
		},
		[selected],
	);

	const displayedItems = useMemo(() => {
		return state.items.filter(item => (category === "keys" ? item.name === "keys" : item.type === category && item.name !== "keys"));
	}, [state.items, category]);

	const canDropItem = useMemo(() => {
		return (
			!!dragFrom.current &&
			!!dropTo.current &&
			!!dragedItem &&
			canDrop(dragFrom.current, dropTo.current, dragedItem, selected?.selectedQuantity)
		);
	}, [dragedItem, selected?.selectedQuantity]);

	const renameItem = useCallback((newName: string, item: IInventoryItem) => {
		postAsync("inventory-rename", { item, rename: newName });
	}, []);

	const targetWeight = useMemo(() => {
		return (state.target?.items || []).reduce((acc, item) => {
			return acc + item.count * item.weight;
		}, 0);
	}, [state.target?.items]);

	const playerWeight = useMemo(() => {
		return (state.items || []).reduce((acc, item) => {
			return acc + item.count * item.weight;
		}, 0);
	}, [state.items]);

	const onItemRightClick = useCallback(
		(item: IInventoryItem) => {
			if (category === "clothes" && ClothesContainersList.includes(item.name as ClothesContainers)) {
				putClothe(item);
			} else {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useItem(item, selected?.selectedQuantity || item.count);
			}
		},
		[category, selected],
	);

	return (
		<div id="inventory" className={`inventory ${state.target ? "inventory-with-target" : ""}`}>
			{!!state.hud && (
				<InventoryHud
					thirst={state.hud.thirst}
					hunger={state.hud.hunger}
					weight={playerWeight / state.hud.maxWeight}
					realWeight={playerWeight}
					realMaxWeight={state.hud.maxWeight}
				/>
			)}
			{!!dragedItem && (
				<div
					className="item-container disable-hover dragging-item"
					style={{
						width: "94px",
						height: "94px",
						left: Math.ceil(mousePos.x - 94 / 2) + "px",
						top: Math.ceil(mousePos.y - 94 / 2) + "px",
					}}>
					<InventoryItem {...dragedItem} dragged={false} selected={false} />
				</div>
			)}
			<div className="inventory-base-container" onMouseEnter={e => e.stopPropagation()}>
				<div className="player-inventory">
					{!state.target && <InventoryActionButtons layout="horizontal" setDropTo={setDropTo} canDrop={canDropItem} />}
					<div className="inventory-main-container">
						<InventoryCategoriesNavigation current={category} onChange={onCategoryChange} />
						<div className="inventory-grids-container" style={{ flexDirection: category === "weapons" ? "column" : "row" }}>
							<InventoryItemGrid
								containerName="inventory"
								separateByName={category === "clothes"}
								separateByWeight={category === "weapons"}
								canDrop={canDropItem}
								cols={4}
								rows={4}
								items={displayedItems}
								onItemClick={i => onItemClick(i, "inventory")}
								setDropTo={setDropTo}
								onItemDragStart={i => startDrag(i, "inventory")}
								draggedItem={dragedItem}
								selectedItem={selected?.item}
								onItemRightClick={onItemRightClick}
							/>
						</div>
					</div>
					{selected && !state.target && (
						<InventoryItemDetails
							{...selected.item}
							label={selected.item.metadatas?.renamed || selected.item.label}
							onQuantityChange={e => setSelected(selected => ({ ...selected, selectedQuantity: e }))}
							selectedQuantity={selected.selectedQuantity}
							doRename={name => renameItem(name, selected.item)}
							tabState={tab}
							setActiveTab={e => setTab(e)}
						/>
					)}
				</div>
				{!!state.target && (
					<InventoryActionButtons
						layout="vertical"
						setDropTo={setDropTo}
						canDrop={canDropItem}
						allSelected={allSelected}
						toggleSelected={() => setAllSelected(selected => !selected)}
						selectedQuantity={selected?.selectedQuantity}
						setSelectedQuantity={e => setSelected(selected => ({ ...selected, selectedQuantity: e }))}
					/>
				)}
				{!!state.target && (
					<div className="target-inventory">
						<div className="inventory-main-container">
							<div className="inventory-target-header">
								<div className="inventory-target-name">{state.target.name}</div>
								<div
									className="inventory-target-weight"
									style={{ backgroundImage: 'url("https://cdn.sacul.cloud/v2/vision-cdn/inventory/weight.svg")' }}>
									<svg height="40" width="40">
										<circle
											cx="20"
											cy="20"
											r="16"
											fill="transparent"
											stroke="rgba(255, 255, 255, 0.2)"
											strokeWidth="3"
										/>
									</svg>
									<svg height="40" width="40">
										<circle
											cx="20"
											cy="20"
											r="16"
											stroke="white"
											strokeWidth="3"
											fill="transparent"
											strokeDasharray={`${2 * Math.PI * 16 * (targetWeight / state.target.maxWeight)}, ${2 * Math.PI * 16}`}
											style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
										/>
									</svg>
								</div>
							</div>
							<div className="inventory-grids-container">
								<InventoryItemGrid
									containerName="target"
									canDrop={canDropItem}
									cols={4}
									rows={4}
									items={state.target.items}
									onItemClick={i => onItemClick(i, "target")}
									setDropTo={setDropTo}
									onItemDragStart={i => startDrag(i, "target")}
									allSelected={allSelected}
									selectedItem={selected?.item}
									draggedItem={dragedItem}
								/>
							</div>
						</div>
					</div>
				)}
				<InventoryWeaponSlots
					canDrop={canDropItem}
					onItemClick={i => onItemClick(i, "inventory")}
					onItemDragStart={startDrag}
					setDropTo={setDropTo}
					weapons={state.weapons}
				/>
			</div>
		</div>
	);
};

export default Inventory;
