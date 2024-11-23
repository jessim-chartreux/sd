import "./style.scss";

import React, { useContext, useState } from "react";

import { GlobalContext } from "../../app";
import MenuBuilder from "../../components/MenuBuilder/MenuBuilder";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuGrosCatalogue: React.FC = () => {
	const context = useContext(GlobalContext);
	const [show, setShow] = useState("main");

	const [selected, setSelected] = useState<any>(null);
	useExitKeys();

	useBackspaceKey(() => {
		setShow("main");
	});

	const _buttons = [
		{
			name: "haut",
			isPremium: true,
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
			image: "https://cdn.discordapp.com/attachments/1063934823976144966/1143950049479512174/bd49bb3f81599c1dd8840e5935b016d3.webp",
			hoverStyle: "fill-black stroke-black",
			type: "coverBackground",
		},
		{
			name: "bas",
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
			onClickCallback: () => setShow("bas"),
			image: "https://cdn.discordapp.com/attachments/1063934823976144966/1143950880484380782/6195753d4857e454549ef299af774a24.webp",
			hoverStyle: " stroke-black",
			type: "coverBackground",
		},
		{
			name: "chaussures",
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
			onClickCallback: () => setShow("chaussures"),
			image: "https://cdn.discordapp.com/attachments/1063934823976144966/1143950880484380782/6195753d4857e454549ef299af774a24.webp",
			hoverStyle: "fill-black ",
			type: "coverBackground",
		},
		{
			name: "chaussures",
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
			onClickCallback: () => setShow("chaussures"),
			image: "https://cdn.discordapp.com/attachments/1063934823976144966/1143950880484380782/6195753d4857e454549ef299af774a24.webp",
			hoverStyle: "fill-black ",
			type: "coverBackground",
		},
		{
			name: "chaussures",
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
			onClickCallback: () => setShow("chaussures"),
			image: "https://cdn.discordapp.com/attachments/1063934823976144966/1143950880484380782/6195753d4857e454549ef299af774a24.webp",
			hoverStyle: "fill-black ",
			type: "coverBackground",
		},
		{
			name: "chaussures",
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
			onClickCallback: () => setShow("chaussures"),
			image: "https://cdn.discordapp.com/attachments/1063934823976144966/1143950880484380782/6195753d4857e454549ef299af774a24.webp",
			hoverStyle: "fill-black ",
			type: "coverBackground",
		},
		{
			name: "accessoires",
			isPremium: true,
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
			onClickCallback: () => setShow("accessoires"),
			image: "https://cdn.discordapp.com/attachments/1063934823976144966/1143950880484380782/6195753d4857e454549ef299af774a24.webp",
			hoverStyle: "fill-black stroke-black",
			type: "coverBackground",
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
			onClickCallback: () => setShow("autres"),
			image: "https://cdn.discordapp.com/attachments/1063934823976144966/1143950880484380782/6195753d4857e454549ef299af774a24.webp",
			hoverStyle: "fill-black stroke-white",
			type: "coverBackground",
		},
	];

	const catalogue = [
		{
			id: 0,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
			label: "Haut",
			isPremium: true,
		},
		{
			id: 10,
			price: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "haut",
			subCategory: "haut",
			isPremium: true,
			owned: true,
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
			subCategory: "haut",
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
	];

	const data: any | null = isDev
		? {
				catalogue,
				buttons: _buttons,
				headerIcon: "https://cdn.sacul.cloud/v2/vision-cdn/icons/market-cart.webp",
				headerIconName: "VEHICULES",
				headerImage: "https://cdn.sacul.cloud/v2/vision-cdn/headers/burgerShot.webp",
				callbackName: "MenuGrosCatalogue",
				showTurnAroundButtons: false,
				disableSubmit: false,
				isUserPremium: false,
			}
		: context.data;

	data.buttons = data.buttons.map((e: any) => {
		e.onClickCallback = () => {
			setShow(e.name);
			postAsync(data.callbackName, { button: e.name });
		};
		return e;
	});

	const buttons = data.buttons;

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
				minimumElements: 9,
				elements: data.catalogue
					.filter(e => e.category === show)
					.map((e: any) => {
						e.onClickCallback = () => {
							setSelected(e);
							if (e.ownCallbackName) {
								postAsync(e.ownCallbackName, e);
							}
						};
						return e;
					}),
			},
		] as any;
	};

	return (
		<div className={`MenuGrosCatalogue ` + data.preset}>
			{show !== "finalSubmit" && (
				<MenuBuilder
					submitButton={
						show !== "main" && !data.disableSubmit
							? {
									label: `PAYER ${selected ? selected?.price + "$" : ""}`,
									disabled: !selected || (selected?.isPremium && !data.isUserPremium),
									customVisu: selected?.owned ? (
										<div className="Button-recup">RÉCUPÉRER</div>
									) : selected?.isPremium ? (
										data.isUserPremium ? undefined : (
											<div className="Button-recup">PREMIUM</div>
										)
									) : undefined,
									onClickCallback: () =>
										selected?.owned ? postAsync("getItem", selected) : postAsync(data.callbackName, selected),
								}
							: undefined
					}
					headerImage={data.headerImage}
					headerImageCallback={() => {
						postAsync(data.callbackName, { reset: true });
						setShow("main");
						setSelected(null);
					}}
					selected={selected}
					headerIcon={data.headerIcon}
					headerIconName={data.headerIconName}
					tabs={getTab()}
					style={{
						overrideClassName: {
							main: show !== "main" ? "" : "overrideBinco",
						},
					}}
					// isBoutique={show !== 'finalSubmit' && show !== 'main'}
					showTurnAroundButtons={data?.showTurnAroundButtons}
				/>
			)}
		</div>
	);
};

export default MenuGrosCatalogue;
