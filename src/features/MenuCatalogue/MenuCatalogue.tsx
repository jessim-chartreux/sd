import "react-circular-progressbar/dist/styles.css";
import "./style.scss";

import React, { useContext, useState } from "react";

import { GlobalContext } from "../../app";
import MenuBuilder from "../../components/MenuBuilder/MenuBuilder";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuCatalogue: React.FC = () => {
	useExitKeys();
	const context = useContext(GlobalContext);
	const [selected, setSelected] = useState(null);

	const data: any | null = isDev
		? {
				headerImage: "https://cdn.sacul.cloud/v2/vision-cdn/headers/burgerShot.webp",
				elements: [
					{
						id: 1,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						category: "grades",
						subCategory: "test",
					},
					{
						id: 1,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						category: "grades2",
					},
					{
						id: 1,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						category: "grades",
					},
					{
						id: 1,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						category: "grades",
					},
					{
						id: 1,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						category: "grades",
					},
					{
						id: 1,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						category: "grades",
					},
					{
						id: 1,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						category: "grades",
					},
					{
						id: 1,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						category: "grades",
					},
					{
						id: 1,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						category: "grades",
					},

					{
						id: 1,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						category: "grades",
					},
					{
						id: 1,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "Véhicule 1",
						category: "grades",
					},
				],
				headerIcon: "https://cdn.sacul.cloud/v2/vision-cdn/icons/market-cart.webp",
				headerIconName: "VEHICULES",
				callbackName: "MenuCatalogue",
				showTurnAroundButtons: false,
			}
		: context.data;

	const buildTabs = (el: any[]) => {
		const _tabs: any[] = [];

		el.forEach((_el: any) => {
			if (!_el.category) _el.category = "default";
			if (!_tabs.find((e: any) => e.name === _el.category)) {
				_tabs.push({
					name: _el.category,
					type: "elements",
					elements: [],
				});
			}
			_tabs.find((e: any) => e.name === _el.category)?.elements.push(_el);
		});

		_tabs.forEach(tab => {
			if (tab.elements.find(a => a.subCategory)) {
				const _elem = tab.elements;
				const newElements: any = [];
				tab.type = "categories";
				_elem.forEach(b => {
					if (!newElements.find((e: any) => e.name === b.subCategory)) {
						newElements.push({
							name: b.subCategory,
							elements: [],
						});
					}
					newElements.find((e: any) => e.name === b.subCategory)?.elements.push(b);
				});

				tab.elements = newElements;
			}
		});

		return _tabs;
	};

	return (
		<div className="MenuCatalogue">
			<MenuBuilder
				headerImage={data.headerImage}
				headerIcon={data.headerIcon}
				headerIconName={data.headerIconName}
				selected={selected}
				style={{
					width: 490,
				}}
				tabs={buildTabs(
					data.elements.map(e => {
						e.onClickCallback = () => {
							postAsync(data.callbackName, e);
						};
						return e;
					}),
				)}
				showTurnAroundButtons={data?.showTurnAroundButtons}
			/>
		</div>
	);
};

export default MenuCatalogue;
