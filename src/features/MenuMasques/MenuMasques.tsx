import "./style.scss";

import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../app";
import MenuBuilder from "../../components/MenuBuilder/MenuBuilder";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useEnterKey } from "../../hooks/useEnterKey";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuMasques: React.FC = () => {
	const context = useContext(GlobalContext);
	const [show, setShow] = useState(null);
	const [selections, setSelections] = useState<any[]>([]);
	const [pro, setPro] = useState([]);
	const [catalogue, setCatalogue] = useState([
		{
			id: 0,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "menumasque",
			subCategory: "masque",
			idVariation: 3,
		},
		{
			id: 10,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "menumasque",
			subCategory: "masque",
			idVariation: 2,
			isPremium: true,
		},
		{
			id: 20,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "menumasque",
			subCategory: "variations",
			targetId: 1,
		},
		{
			id: 20,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "menumasque",
			subCategory: "variations",
			targetId: 3,
		},
		{
			id: 20,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "menumasque",
			subCategory: "variations",
			targetId: 3,
		},
		{
			id: 20,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "menumasque",
			subCategory: "variations",
			targetId: 3,
		},
		{
			id: 30,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "menumasque",
			subCategory: "variations",
			targetId: 2,
			isPremium: true,
		},
		{
			id: 10000,
			price: 30,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "menumasque",
			subCategory: "variations",
			targetId: 2,
			isPremium: true,
		},
		{
			id: 40,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "menumasque",
			subCategory: "variations",
			targetId: 1,
		},
		{
			id: 50,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
			targetId: 3,
		},
		{
			id: 60,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "menumasque",
			subCategory: "haut",
		},
		{
			id: 70,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
		},
		{
			id: 80,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
		},
		{
			id: 90,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
		},
		{
			id: 100,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
		},
		{
			id: 110,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
		},
		{
			id: 120,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
		},
		{
			id: 130,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "bras",
		},
		{
			id: 140,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "bas",
			subCategory: "haut",
		},
		{
			id: 160,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "variations",
		},
		{
			id: 150,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "sous-haut",
		},
	]);
	const [selected, setSelected] = useState<any>(null);

	useExitKeys();

	const onMessage = React.useCallback(
		(event: any) => {
			if (event?.data?.type === "unlockedItem") {
				const data = isDev ? { catalogue } : context?.data;
				context.setData(
					data?.catalogue?.map(e => {
						if (JSON.stringify(e) === JSON.stringify(event?.data?.item)) {
							e.owned = true;
						}
						return e;
					}),
				);

				if (isDev) {
					setCatalogue(
						data?.catalogue?.map(e => {
							if (JSON.stringify(e) === JSON.stringify(event?.data?.item)) {
								e.owned = true;
							}
							return e;
						}),
					);
				}
			}
			if (event?.data?.type === "unlockedItems") {
				const data = isDev ? { catalogue } : context?.data;
				const localData = event?.data?.items?.map(e => JSON.stringify(e));
				context.setData(
					data?.catalogue?.map(e => {
						if (localData.includes(JSON.stringify(e))) {
							e.owned = true;
						}
						return e;
					}),
				);

				if (isDev) {
					setCatalogue(
						data?.catalogue?.map(e => {
							if (JSON.stringify(e) === JSON.stringify(event?.data?.item)) {
								e.owned = true;
							}
							return e;
						}),
					);
				}
			}
		},
		[catalogue, context],
	);

	React.useEffect(() => {
		window.addEventListener("message", onMessage);
		return () => window.removeEventListener("message", onMessage);
	}, [onMessage]);

	useBackspaceKey(() => {
		{
			const _a = [...selections];
			while (_a[_a.length - 1]?.default === true) {
				_a.pop();
			}
			_a.pop();
			setSelections(_a);
			if (show === "paiement") {
				setShow(data.category);
			}
		}
	});

	useEnterKey(() => {
		if (!selected || (selections[selections?.length - 1]?.isPremium && !selected?.owned && selected?.targetId !== undefined)) return;
		if (selected) {
			if (selections.length === pro.length - 2) setShow("paiement");
			setSelections([...selections, selected]);
			setSelected(null);
		}
	});

	const progressBar = [
		{
			name: "masque",
		},
		{
			name: "variations",
		},
	];

	const data_item = {
		catalogue: catalogue,
		progressBar,
		headerIcon: "https://cdn.sacul.cloud/v2/vision-cdn/icons/market-cart.webp",
		headerIconName: "VEHICULES",
		headerImage: "https://cdn.sacul.cloud/v2/vision-cdn/headers/burgerShot.webp",
		callbackName: "MenuGrosCatalogue",
		showTurnAroundButtons: false,
		category: "menumasque",
	};

	const data: any | null = isDev ? data_item : context.data;

	useEffect(() => {
		if (!show) setShow(data.category);
	}, [data.category, show]);

	useEffect(() => {
		setPro([...data.progressBar, { name: "paiement" }]);
	}, [data.progressBar]);

	useEffect(() => {
		const length = data.catalogue.filter(
			e =>
				e.category === show &&
				e.subCategory === pro[selections.length]?.name &&
				(selections[selections.length - 1]?.idVariation === undefined
					? true
					: e?.targetId === selections[selections.length - 1]?.idVariation),
		).length;
		if (pro.length > 0 && show !== "paiement" && length === 0) {
			setSelections([...selections, { default: true }]);
		}
		if (selections.length === pro.length && selections.length > 0) {
			setShow("paiement");
		}
	}, [data.catalogue, pro, selections, show]);

	const getTab = () => {
		return [
			{
				name: "",
				type: "elements",
				elements: data.catalogue
					.filter(
						e =>
							e.category === show &&
							e.subCategory === pro[selections.length]?.name &&
							(selections[selections.length - 1]?.idVariation === undefined
								? true
								: e?.targetId === selections[selections.length - 1]?.idVariation),
					)
					.map((e: any) => {
						e.onClickCallback = () => {
							setSelected(e);
							postAsync("MenuMasquesClickHabit", e);
						};
						return e;
					}),
			},
		] as any;
	};

	return (
		<div className="MenuMasques">
			{show !== "paiement" && (
				<MenuBuilder
					headerImage={data.headerImage}
					headerIcon={data.headerIcon}
					headerIconName={data.headerIconName}
					tabs={getTab()}
					progressBar={
						show !== "main"
							? {
									current: selections.length,
									elements: pro,
								}
							: undefined
					}
					selectedParent={selections[selections.length - 1]}
					selected={selected}
				/>
			)}
			{show === "paiement" && (
				<MenuBuilder
					headerImage={data.headerImage}
					headerIcon={data.headerIcon}
					headerIconName={data.headerIconName}
					finalSubmit={{
						onCancel: () => {
							setShow(data.category);
							setSelections([]);
						},
						onSubmit: () => {
							postAsync("MenuMasques", {
								selections,
							});
						},
						cancelLabel: "ANNULER",
						submitLabel: "VALIDER L'ACHAT",
						item: {
							label: selections[0]?.label,
							image: selections[0]?.image ?? "",
						},
					}}
				/>
			)}
		</div>
	);
};

export default MenuMasques;
