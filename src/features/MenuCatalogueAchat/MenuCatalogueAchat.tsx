import "react-circular-progressbar/dist/styles.css";
import "./style.scss";

import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../app";
import MenuBuilder from "../../components/MenuBuilder/MenuBuilder";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuCatalogueAchat: React.FC = () => {
	useExitKeys();
	const context = useContext(GlobalContext);

	const data: any | null = isDev
		? {
				headerImage: "https://cdn.sacul.cloud/v2/vision-cdn/headers/burgerShot.webp",
				elements: [
					{
						id: 1,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						price: 10,
						ownCallbackName: "MenuCatalogueCallback1",
						category: "Onglet",
						subCategory: "test",
					},
					{
						id: 3,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						price: 10,
						ownCallbackName: "MenuCatalogueCallback1",
						category: "Onglet",
						subCategory: "test",
					},
					{
						id: 4,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						price: 10,
						ownCallbackName: "MenuCatalogueCallback1",
						category: "Onglet",
						subCategory: "test",
					},
					{
						id: 2,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						price: 10,
						ownCallbackName: "MenuCatalogueCallback2",
					},
				],
				headerIcon: "https://cdn.sacul.cloud/v2/vision-cdn/icons/market-cart.webp",
				headerIconName: "BOUTIQUE",
				callbackName: "MenuBuy",
				showTurnAroundButtons: true,
				multipleSelection: false,
			}
		: context.data;
	const [selected, setSelected] = useState(data.multipleSelection ? [] : null);

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

	const toggleSelected = e => {
		if (Array.isArray(selected)) {
			if (!selected.map(a => a.id).includes(e.id)) {
				setSelected([...selected, e]);
			} else {
				setSelected(selected.filter(_e => _e.id !== e.id));
			}
		} else {
			setSelected(e);
		}
	};

	const [tabs, setTabs] = useState(
		buildTabs(
			data.elements.map(e => {
				e.onClickCallback = () => {
					toggleSelected(e);
					if (e.ownCallbackName) {
						postAsync(e.ownCallbackName, e);
					}
				};
				return e;
			}),
		),
	);

	useEffect(() => {
		setTabs(
			buildTabs(
				data.elements.map(e => {
					e.onClickCallback = () => {
						toggleSelected(e);
						if (e.ownCallbackName) {
							postAsync(e.ownCallbackName, e);
						}
					};
					return e;
				}),
			),
		);
	}, [selected]);

	return (
		<div className="MenuCatalogueAchat">
			<MenuBuilder
				headerImage={data.headerImage}
				headerIcon={data.headerIcon}
				headerIconName={data.headerIconName}
				selected={selected}
				style={{
					width: 490,
				}}
				tabs={tabs}
				submitButton={{
					label: "VALIDER",
					onClickCallback: () => {
						postAsync(data.callbackName, selected);
					},
					disabled: data.multipleSelection ? selected.length === 0 : !selected,
				}}
				showTurnAroundButtons={data?.showTurnAroundButtons}
			/>
		</div>
	);
};

export default MenuCatalogueAchat;
