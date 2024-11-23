import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { playOnHoverSound, playOnClickSound } from "../../utils/sounds";
import { close } from "../../hooks/useExitKeys";

import InventoryItemGrid from "../inventory/item-grid/item-grid";

import dummy_inv from "./dummy_inv.json";
import "./InventoryCleaner.scss";

/* type InventoryItem = {
	name: string;
	weight: number;
	type: string;
	count: number;
	label: string;
	cols: number;
	metadatas: any[];
	rows: number;
}; */

const InventoryCleaner: React.FC = () => {
	const context = useContext(GlobalContext);

	const data = isDev
		? {
				balance: 1545,
				premium: true,
				unique_id: "69",
				inventory: dummy_inv,
				fullname: "John Doe",
				source: 1,
			}
		: context.data;

	useEffect(() => {
		const onKeyPressed = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				close();
			}
		};
		document.addEventListener("keyup", onKeyPressed);
		return () => document.removeEventListener("keyup", onKeyPressed);
	});

	const [step, setStep] = useState(0);
	const [selectedItems, setSelectedItems] = useState<any[]>([]);

	const selectItem = (item: any) => {
		if (selectedItems.includes(item)) {
			setSelectedItems(selectedItems.filter(i => i !== item));
		} else {
			setSelectedItems([...selectedItems, item]);
		}
	};

	const deleteItems = async () => {
		setStep(3);

		const current_inv = data.inventory;
		const new_inv = current_inv.filter(item => !selectedItems.includes(item));

		postAsync("InventoryCleaner_deleteItems", {
			source: data.source,
			inventory: new_inv,
		});

		setTimeout(() => {
			close();
		}, 2000);
	};

	return (
		<div id="InventoryCleaner" className={isDev ? "dev" : ""}>
			{/* Welcome screen */}
			{step === 0 && (
				<div className="step-1">
					<h1>Inventory Cleaner</h1>
					<p>
						Cet outil permet de nettoyer l'inventaire de n'importe quel joueur en supprimant des items.
						<br />
						<br />
						<b>Attention, cet outil est à utiliser avec précautions, aucun remboursement n'est possible!</b>
						<br />
						<br />
						Vous êtes sur le point de nettoyer l'inventaire de <b>{data.fullname}</b>.
					</p>
					<div className="buttons">
						<button onClick={close}>Annuler</button>
						<button onClick={() => setStep(1)}>Continuer</button>
					</div>
				</div>
			)}

			{/* Select items to delete */}
			{step === 1 && (
				<div className="step-2">
					<h1>Sélectionnez les items que vous souhaitez supprimer.</h1>
					<div className="Inventory">
						<InventoryItemGrid
							containerName="inventory"
							cols={7}
							rows={4}
							items={data.inventory}
							onItemClick={(item: any) => {
								playOnHoverSound();
								selectItem(item);
							}}
							selectedItems={selectedItems}
							canDrop={false}
						/>
					</div>
					{selectedItems.length > 0 ? (
						<p>Vous avez actuellement sélectionné {selectedItems.length} items.</p>
					) : (
						<p>Sélectionnez les items que vous souhaitez supprimer pour continuer.</p>
					)}
					<button
						className={selectedItems.length === 0 ? "disabled" : ""}
						onClick={() => {
							if (selectedItems.length === 0) return;
							playOnClickSound();
							setStep(2);
						}}>
						Supprimer les items
					</button>
				</div>
			)}

			{/* Confirm items deletion */}
			{step === 2 && (
				<div className="step-3">
					<h1>Êtes-vous sûr de vouloir supprimer ces items?</h1>
					<div className="Inventory">
						<InventoryItemGrid containerName="inventory" cols={7} rows={4} items={selectedItems} canDrop={false} />
					</div>
					<p>Cette action est irréversible!</p>
					<div className="buttons">
						<button className="cancel" onClick={() => setStep(1)}>
							Sélectionner d'autres items
						</button>
						<button
							className="confirm"
							onClick={() => {
								playOnClickSound();
								deleteItems();
							}}>
							Supprimer les items
						</button>
					</div>
				</div>
			)}

			{/* Deleting items */}
			{step === 3 && (
				<div className="step-4">
					<div className="spinner"></div>
					<h1>Suppression des items en cours...</h1>
					<p>
						{selectedItems.length} items vont être supprimés.
						<br />
						<br />
						Veuillez patienter...
					</p>
				</div>
			)}
		</div>
	);
};

export default InventoryCleaner;
