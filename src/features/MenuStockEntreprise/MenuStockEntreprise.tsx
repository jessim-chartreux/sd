import "react-circular-progressbar/dist/styles.css";
import "./style.scss";

import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../app";
import MenuBuilder from "../../components/MenuBuilder/MenuBuilder";
import { formatNumberForDollar } from "../../utils/utils";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuStockEntreprise: React.FC = () => {
	const context = useContext(GlobalContext);
	const [stockage, setStockage] = useState({});
	const [stockQuantity, setStockQuantity] = useState({});
	const [tab, setTab] = useState("Commande");
	useExitKeys();

	const data: any | null = isDev
		? {
				headerImage: "https://cdn.sacul.cloud/v2/vision-cdn/headers/burgerShot.webp",
				elements: [
					{
						id: 1,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						price: 12,
					},
					{
						id: 2,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						price: 12,
					},
				],
				stocks: [
					{
						id: 1,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						quantity: 12,
					},
					{
						id: 2,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						quantity: 6,
					},
				],
				headerIcon: "https://cdn.sacul.cloud/v2/vision-cdn/icons/market-cart.webp",
				headerIconName: "VEHICULES",
				callbackName: "Stock",
			}
		: context.data;

	const buildTabs = (): any => {
		return [
			{
				name: "Commande",
				type: "shop",
				elements: data.elements.map(e => {
					e.secondaryLabel = formatNumberForDollar(e.price);
					return e;
				}),
				minimumElements: 9,
			},
			{
				name: "Gestion",
				type: "shop",
				elements: data.stocks.map(e => {
					e.secondaryLabel = e.quantity;
					return e;
				}),
				minimumElements: 9,
			},
		];
	};

	const [tabs, _setTabs] = useState(buildTabs);

	useEffect(() => {
		const _stockage = {};
		data.elements.map(e => {
			_stockage[e.id] = 0;
			return e;
		});
		setStockage(_stockage);
		const _stockQuantity = {};
		data.stocks.map(e => {
			_stockQuantity[e.id] = e.quantity;
			return e;
		});
		setStockQuantity(_stockQuantity);
	}, [data.elements, data.stocks]);

	const handleValidation = () => {
		const items =
			data.elements
				.filter((e: { id: string | number }) => stockage[e.id])
				.map((e: { quantity: any; id: string | number }) => {
					e.quantity = stockage[e.id];
					return e;
				}) ?? [];

		postAsync(data.callbackName, {
			items,
			type: "commande",
		});
	};

	return (
		<div className="MenuCatalogue">
			<MenuBuilder
				headerImage={data.headerImage}
				headerIcon={data.headerIcon}
				headerIconName={data.headerIconName}
				style={{
					width: 490,
					overrideClassName: {
						main: "MenuStockEntreprise",
					},
				}}
				submitButton={
					tab === "Commande"
						? {
								label: "VALIDER LA COMMANDE",
								onClickCallback: () => {
									handleValidation();
								},
							}
						: {
								label: "VALIDER",
								onClickCallback: () => {
									postAsync(data.callbackName, {
										items: data.stocks.map(e => {
											e.quantity = stockQuantity[e.id];
											return e;
										}),
										type: "gestion",
									});
								},
							}
				}
				onTabChange={_tab => setTab(_tab.name)}
				tabs={tabs}
				showTurnAroundButtons={data?.showTurnAroundButtons}
				stockage={{
					Commande: {
						set: setStockage,
						get: stockage,
					},
					Gestion: {
						set: setStockQuantity,
						get: stockQuantity,
					},
				}}
			/>
		</div>
	);
};

export default MenuStockEntreprise;
