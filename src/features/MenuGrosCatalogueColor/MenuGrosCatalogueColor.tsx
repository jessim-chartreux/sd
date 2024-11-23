import "./style.scss";

import React, { useContext, useState } from "react";

import ColorPicker from "../../components/UI/ColorPicker/ColorPicker";
import { GlobalContext } from "../../app";
import MenuBuilder from "../../components/MenuBuilder/MenuBuilder";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuBarber: React.FC = () => {
	const context = useContext(GlobalContext);
	const [show, setShow] = useState("main");
	const [selections, setSelections] = useState<any>({});
	useExitKeys();

	useBackspaceKey(() => {
		setShow("main");
	});

	const buttons = [
		{
			name: "cheveux",
			width: "full",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/tshirt.svg",
			hoverStyle: "fill-black stroke-black",
			opacity: true,
			color1: true,
			color2: true,
			colorFard: true,
		},
		{
			name: "cheveux2",
			width: "full",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/tshirt.svg",
			hoverStyle: "fill-black stroke-black",
		},
		{
			name: "cheveux2",
			width: "full",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/tshirt.svg",
			hoverStyle: "fill-black stroke-black",
		},
		{
			name: "cheveux2",
			width: "full",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/tshirt.svg",
			hoverStyle: "fill-black stroke-black",
		},
		{
			name: "cheveux2",
			width: "full",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/tshirt.svg",
			hoverStyle: "fill-black stroke-black",
			type: "coverBackground",
		},
	];

	const catalogue = [
		{
			id: 0,
			label: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "cheveux",
			price: 12,
		},
		{
			id: 0,
			label: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			category: "cheveux",
		},
	];

	const data: any | null = isDev
		? {
				catalogue,
				buttons: buttons,
				headerIcon: "https://cdn.sacul.cloud/v2/vision-cdn/icons/market-cart.webp",
				headerIconName: "VEHICULES",
				headerImage: "https://cdn.sacul.cloud/v2/vision-cdn/headers/burgerShot.webp",
				callbackName: "MenuCatalogue",
				showTurnAroundButtons: false,
				disableSubmit: true,
				hideItemList: ["cheveux"],
			}
		: context.data;

	data.buttons = data.buttons.map((e: any) => {
		e.onClickCallback = () => {
			setShow(e.name);
			postAsync(data.callbackName, {
				button: e.name,
			});
		};

		return e;
	});

	const getTab = () => {
		if (show === "main") {
			return [
				{
					name: "",
					type: "buttons",
					elements: [...data.buttons],
				},
			] as any;
		}
		return [
			{
				name: "",
				type: "elements",
				...(data.hideItemList?.includes(show) ? { variation: "no-image" } : {}),
				elements: data.catalogue
					.filter(e => e.category === show)
					.map((e: any) => {
						e.onClickCallback = () => {
							const _s = {
								...selections,
							};
							if (!_s[show]) {
								_s[show] = {};
							}
							_s[show].item = e;
							setSelections(_s);
							if (e.ownCallbackName) {
								postAsync(e.ownCallbackName, e);
							} else {
								postAsync(data.callbackName, e);
							}
						};
						return e;
					}),
			},
		] as any;
	};

	return (
		<div className="MenuGrosCatalogueColor">
			{show !== "finalSubmit" && (
				<MenuBuilder
					submitButton={
						show !== "main" && !data.disableSubmit
							? {
									label: "VALIDER",
									onClickCallback: () =>
										postAsync(data.callbackName, {
											changedData: selections,
										}),
								}
							: undefined
					}
					showTurnAroundButtons={data?.showTurnAroundButtons}
					selected={selections?.[show]?.item ?? null}
					headerImage={data.headerImage}
					headerIcon={data.headerIcon}
					headerIconName={data.headerIconName}
					tabs={getTab()}
				/>
			)}
			{show !== "main" && (
				<ColorPicker
					sO={data.buttons.find(e => e.name === show).opacity}
					sC1={data.buttons.find(e => e.name === show).color1}
					sC2={data.buttons.find(e => e.name === show).color2}
					sCF={data.buttons.find(e => e.name === show)?.colorFard}
					changeColor1={n => {
						const _s = {
							...selections,
						};
						if (!_s[show]) {
							_s[show] = {};
						}
						_s[show].color1 = n;
						setSelections(_s);
						postAsync(data.callbackName, {
							type: "color1",
							value: n,
						});
					}}
					changeColorF={n => {
						const _s = {
							...selections,
						};
						if (!_s[show]) {
							_s[show] = {};
						}
						_s[show].colorF = n;
						setSelections(_s);
						postAsync(data.callbackName, {
							type: "colorF",
							value: n,
						});
					}}
					changeColor2={n => {
						const _s = {
							...selections,
						};
						if (!_s[show]) {
							_s[show] = {};
						}
						_s[show].color2 = n;
						setSelections(_s);
						postAsync(data.callbackName, {
							type: "color2",
							value: n,
						});
					}}
					changeOpacity={n => {
						const _s = {
							...selections,
						};
						if (!_s[show]) {
							_s[show] = {};
						}
						_s[show].opacity = n;
						setSelections(_s);
						postAsync(data.callbackName, {
							type: "opacity",
							value: n,
						});
					}}
				/>
			)}
		</div>
	);
};

export default MenuBarber;
