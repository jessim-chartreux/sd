import "./style.scss";

import React, { useContext, useEffect, useState } from "react";

import Button from "../../components/UI/Button/Buttton";
import { GlobalContext } from "../../app";
import MenuBuilder from "../../components/MenuBuilder/MenuBuilder";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useEnterKey } from "../../hooks/useEnterKey";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuProgress: React.FC = () => {
	const context = useContext(GlobalContext);

	const [name, setName] = useState("");
	const [selections, setSelections] = useState<any[]>([]);
	const [selected, setSelected] = useState(null);

	useExitKeys();

	useEnterKey(() => {
		if (selected) {
			if (selections.length === data.progressBar.length - 1) setShow("finalSubmit");
			setSelections([...selections, selected]);
			setSelected(null);
		}
	});

	useBackspaceKey(() => {
		setSelected(null);
		if (selections.length === 0) {
			return;
		} else {
			const _a = [...selections];
			while (_a[_a.length - 1]?.default === true) {
				_a.pop();
			}
			_a.pop();
			setSelections(_a);
			if (show === "finalSubmit") {
				setShow("default");
			}
		}
	});

	const catalogue = [
		{
			id: 0,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
		},
		{
			label: "Variation N°1",
			subCategory: "variations",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			targetId: 0,
			id: 0,
			category: "haut",
		},
		{
			label: "Haut N°0",
			subCategory: "haut",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			idVariation: 0,
			id: 0,
			category: "haut",
		},
		{
			id: 10,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
			idVariation: 1,
		},
		{
			id: 20,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
		},
		{
			id: 30,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
		},
		{
			id: 40,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
		},
		{
			id: 50,
			price: 20,
			label: "Bras trop joli",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "bras",
		},
		{
			id: 60,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
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
		{
			id: 160,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "bras",
		},
	];

	const data_item = {
		catalogue: catalogue,
		headerIcon: "https://cdn.sacul.cloud/v2/vision-cdn/icons/market-cart.webp",
		headerIconName: "VEHICULES",
		showTurnAroundButtons: true,
		callbackName: "progressMenu",
		hideItemList: ["bras"],
		progressBar: [
			{
				name: "haut",
			},
			{
				name: "bas",
			},
			{
				name: "autre",
			},
		],
		headerImage: "https://cdn.sacul.cloud/v2/vision-cdn/headers/binco.webp",
	};

	const data: any | null = isDev ? data_item : context.data;
	const [show, setShow] = useState("default");

	useEffect(() => {
		if (
			data.catalogue.filter(
				(e: { category: any; targetId: any }) =>
					e.category === data.progressBar[selections.length]?.name &&
					(selections[selections.length - 1]?.idVariation === undefined
						? true
						: e?.targetId === selections[selections.length - 1]?.idVariation),
			).length === 0 &&
			show !== "finalSubmit"
		) {
			setSelections([...selections, { default: true }]);
		}
		if (selections?.length === data.progressBar.length && selections.length > 0) {
			setShow("finalSubmit");
		}
	}, [data.catalogue, data.progressBar, selections, show]);

	const getTab = () => {
		return [
			{
				name: "",
				type: "elements",
				elements: data.catalogue
					.sort((a: { id: number }, b: { id: number }) => a?.id - b?.id)
					.filter(
						(e: { category: any; targetId: any }) =>
							e.category === data.progressBar[selections.length]?.name &&
							(selections[selections.length - 1]?.idVariation === undefined
								? true
								: e?.targetId === selections[selections.length - 1]?.idVariation),
					)
					.map((_e: any) => {
						_e.onClickCallback = () => {
							postAsync(data.callbackName, _e);
							setSelected(_e);
						};
						return _e;
					}),
			},
		] as any;
	};

	return (
		<div className="MenuProgress">
			{show !== "finalSubmit" && (
				<MenuBuilder
					showTurnAroundButtons={data?.showTurnAroundButtons}
					showValidationButtons={show !== "main" && show !== "finalSubmit"}
					style={{
						overrideClassName: {
							main: show === "main" ? "overrideBinco" : "",
							header: show === "main" ? "overrideBinco" : "",
						},
					}}
					selected={selected}
					headerImage={data.headerImage}
					headerIcon={data.headerIcon}
					headerIconName={data.headerIconName}
					tabs={getTab()}
					progressBar={
						show !== "finalSubmit"
							? {
									current: selections.length,
									elements: data.progressBar,
								}
							: undefined
					}
				/>
			)}
			{show === "finalSubmit" && (
				<MenuBuilder
					showTurnAroundButtons={data?.showTurnAroundButtons}
					headerImage={data.headerImage}
					headerIcon={"https://cdn.sacul.cloud/v2/vision-cdn/icons/market-cart.webp"}
					headerIconName={"PAIEMENT"}
					finalSubmit={{
						onCancel: () => {
							setShow("main");
							setSelections([]);
						},
						onSubmit: () => {
							postAsync(data.callbackName, {
								selections,
							});
						},
						cancelLabel: "ANNULER",
						submitLabel: "VALIDER L'ACHAT",
						item: {
							label: (selections[0]?.price ?? 0) + " $",
							image: selections[0]?.image ?? "",
						},
					}}
				/>
			)}
			{show === "finalSubmit" && (
				<div className="submit">
					<input type="text" value={name} onChange={e => setName(e.currentTarget.value)}></input>
					<Button
						color="green"
						fontWeight={700}
						fontSize={12}
						label="VALIDER"
						width={133}
						height={25}
						style={{ display: "flex" }}
						callback={() =>
							postAsync(data.callbackName, {
								values: selections,
								name,
							})
						}
						disabled={name === ""}
					/>
				</div>
			)}
		</div>
	);
};

export default MenuProgress;
