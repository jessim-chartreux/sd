import "./style.scss";

import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../app";
import MenuBuilder from "../../components/MenuBuilder/MenuBuilder";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useEnterKey } from "../../hooks/useEnterKey";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuVestiaire: React.FC = () => {
	const context = useContext(GlobalContext);
	const [show, setShow] = useState("main");
	const [button, setButton] = useState(false);
	const [name, setName] = useState("");
	const [selections, setSelections] = useState<any[]>([]);
	const [logo, setLogo] = useState("https://cdn.sacul.cloud/v2/vision-cdn/MenuVestiaire/vestiaire.svg");
	const [selected, setSelected] = useState(null);

	useEnterKey(() => {
		if (selected) {
			if (selections.length === buttons.find((_e: { name: string }) => _e.name === show).progressBar.length - 1) {
				setShow("main");
				setSelections([]);
			} else {
				setSelections([...selections, selected]);
			}
			setSelected(null);
		}
	});

	const [a, setA] = useState("main");
	useExitKeys();

	useBackspaceKey(() => {
		setSelected(null);
		if (selections.length === 0) {
			setShow("main");
		} else {
			const _a = [...selections];
			while (_a[_a.length - 1]?.default === true) {
				_a.pop();
			}
			_a.pop();
			setSelections(_a);
			if (show === "finalSubmit") {
				setShow(a);
			}
		}
	});

	const _buttons = [
		{
			name: "haut",
			price: 10,
			progressBar: [
				{
					name: "haut",
				},
				{
					name: "variations",
				},
				{
					name: "sous-haut",
				},
				{
					name: "bras",
				},
			],
			width: "full",
			onClickCallback: () => {
				setShow("haut");
				postAsync("MenuVestiaireClickButton", { button: "haut" });
			},
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/tshirt.svg",
			hoverStyle: "fill-black stroke-black",
		},
		{
			name: "bas<span>divisions</span>",
			progressBar: [
				{
					name: "haut",
				},
				{
					name: "variations",
				},
				{
					name: "sous-haut",
				},
				{
					name: "bras",
				},
			],
			width: "full",
			onClickCallback: () => {
				setShow("bas");
				postAsync("MenuVestiaireClickButton", { button: "bas" });
			},
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/jeans.svg",
			hoverStyle: " stroke-black",
		},
		{
			name: "bas<span>divisions</span>",
			progressBar: [
				{
					name: "haut",
				},
				{
					name: "variations",
				},
				{
					name: "sous-haut",
				},
				{
					name: "bras",
				},
			],
			width: "full",
			onClickCallback: () => {
				setShow("chaussures");
				postAsync("MenuVestiaireClickButton", { button: "chaussures" });
			},
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/shoe.svg",
			hoverStyle: "fill-black ",
		},
		{
			name: "accessoires",
			progressBar: [
				{
					name: "haut",
				},
				{
					name: "variations",
				},
				{
					name: "sous-haut",
				},
				{
					name: "bras",
				},
			],
			width: "half",
			onClickCallback: () => {
				setShow("accessoires");
				postAsync("MenuVestiaireClickButton", { button: "accessoires" });
			},
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/hat.svg",
			hoverStyle: "fill-black stroke-black",
		},
		{
			name: "autres",
			progressBar: [
				{
					name: "haut",
				},
				{
					name: "variations",
				},
				{
					name: "sous-haut",
				},
				{
					name: "bras",
				},
			],
			width: "half",
			onClickCallback: () => {
				setShow("autres");
				postAsync("MenuVestiaireClickButton", { button: "autres" });
			},
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/bouton.svg",
			hoverStyle: "fill-black stroke-white",
		},
	];

	const catalogue = [
		{
			id: 1,
			price: 22,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
		},
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
		buttons: _buttons,
		showTurnAroundButtons: false,
		buttonAditionnalColor: "#FBBC04",
		headerImage: "https://cdn.sacul.cloud/v2/vision-cdn/headers/burgerShot.webp",
	};

	const data: any | null = isDev ? data_item : context.data;

	const buttons = data.buttons.map(
		(e: { onClickCallback: () => void; name: React.SetStateAction<string>; image: React.SetStateAction<string> }) => {
			e.onClickCallback = () => {
				setShow(e.name);
				setA(e.name);
				postAsync("MenuVestiaireClickButton", { button: e.name });
				setLogo(e.image);
			};
			return e;
		},
	);

	useEffect(() => {
		if (
			data.catalogue.filter(
				(e: { category: string; subCategory: any; targetId: any }) =>
					e.category === show &&
					e.subCategory === buttons.find((_e: { name: string }) => _e?.name === show)?.progressBar[selections.length]?.name &&
					(selections[selections.length - 1]?.idVariation === undefined
						? true
						: e?.targetId === selections[selections.length - 1]?.idVariation),
			).length === 0 &&
			show !== "main" &&
			show !== "finalSubmit"
		) {
			setSelections([...selections, { default: true }]);
		}
		if (selections.length === buttons.find((_e: { name: string }) => _e.name === show)?.progressBar.length && selections.length > 0) {
			setShow("finalSubmit");
		}
	}, [buttons, data.catalogue, selections, show]);

	const getTab = () => {
		if (show === "main") {
			return [
				{
					name: "",
					type: "buttons",
					elements: [...buttons],
				},
			] as any;
		}
		return [
			{
				name: "",
				type: "elements",
				elements: data.catalogue
					.sort((a: { id: number }, b: { id: number }) => a?.id - b?.id)
					.filter(
						(e: { category: string; subCategory: any; targetId: any }) =>
							e.category === show &&
							e.subCategory ===
								buttons.find((_e: { name: string }) => _e?.name === show)?.progressBar[selections.length]?.name &&
							(selections[selections.length - 1]?.idVariation === undefined
								? true
								: e?.targetId === selections[selections.length - 1]?.idVariation),
					)
					.map((e: any) => {
						e.onClickCallback = () => {
							postAsync("MenuVestiaireClickHabit", e);
							setSelected(e);
						};
						return e;
					}),
			},
		] as any;
	};

	return (
		<div className="MenuBinco">
			{show !== "finalSubmit" && (
				<MenuBuilder
					buttonAditionnalColor={data.buttonAditionnalColor}
					showTurnAroundButtons={data?.showTurnAroundButtons}
					style={{
						overrideClassName: {
							main: show === "main" ? "overrideBinco" : "",
						},
					}}
					selected={selected}
					submitButton={
						show === "main"
							? {
									label: "CRÉER UNE TENUE",
									onClickCallback: () => setButton(true),
									input: {
										isInput: button,
										onChange: (e: React.SetStateAction<string>) => setName(e),
										onBlur: (_e: any) => {
											postAsync("MenuVestiaireNomTenu", name);
										},
										value: name,
										placeholder: "NOM DE LA TENUE",
									},
								}
							: undefined
					}
					headerImage={data.headerImage}
					headerIcon={logo}
					headerIconName={show === "main" ? "VESTIAIRE" : show.toUpperCase()}
					tabs={getTab()}
					progressBar={
						show !== "main"
							? {
									current: selections.length,
									elements: buttons.find((e: { name: string }) => e.name === show)?.progressBar ?? [],
								}
							: undefined
					}
				/>
			)}
			{show === "finalSubmit" && (
				<MenuBuilder
					buttonAditionnalColor={data.buttonAditionnalColor}
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
							postAsync("MenuVestiaire", {
								selections,
							});
						},
						cancelLabel: "ANNULER",
						submitLabel: "VALIDER L'ACHAT",
						item: {
							label: (data.buttons.find((e: { name: string }) => e.name == a)?.price ?? 0) + " $",
							image: selections[0]?.image ?? "",
						},
					}}
				/>
			)}
		</div>
	);
};

export default MenuVestiaire;
