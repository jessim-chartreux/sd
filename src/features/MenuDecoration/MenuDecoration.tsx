import "./style.scss";

import React, { useContext, useState } from "react";

import { GlobalContext } from "../../app";
import MenuBuilder from "../../components/MenuBuilder/MenuBuilder";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuDecoration: React.FC = () => {
	const context = useContext(GlobalContext);
	const [show, setShow] = useState("main");
	const [title, setTitle] = useState("DÉCORATION D'INTÉRIEUR");

	const [a, setA] = useState("main");
	useExitKeys();

	useBackspaceKey(() => {
		if (a == show) {
			setShow("main");
			setA("main");
		} else {
			setShow(a);
		}
	});

	const data: any | null = isDev
		? {
				headerIcon: "https://cdn.sacul.cloud/v2/vision-cdn/icons/market-cart.webp",
				headerIconName: "VEHICULES",
				showTurnAroundButtons: false,
				items: [
					{
						name: "main",
						type: "buttons",
						elements: [
							{
								name: "mobilier",
								width: "full",
								image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/jeans.svg",
								hoverStyle: " stroke-black",
							},
							{
								name: "décoration",
								width: "full",
								image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/jeans.svg",
								hoverStyle: " stroke-black",
							},
							{
								name: "décoration",
								width: "full",
								image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/jeans.svg",
								hoverStyle: " stroke-black",
							},
							{
								name: "décoration",
								width: "full",
								image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/jeans.svg",
								hoverStyle: " stroke-black",
							},
						],
					},
					{
						name: "mobilier",
						type: "buttons",
						elements: [
							{
								name: "chaise",
								width: "full",
								image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/jeans.svg",
								hoverStyle: " stroke-black",
							},
							{
								name: "lit",
								width: "full",
								image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/jeans.svg",
								hoverStyle: " stroke-black",
							},
							{
								name: "chaise",
								width: "full",
								image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/jeans.svg",
								hoverStyle: " stroke-black",
							},
							{
								name: "lit",
								width: "full",
								image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/jeans.svg",
								hoverStyle: " stroke-black",
							},
							{
								name: "chaise",
								width: "full",
								image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/jeans.svg",
								hoverStyle: " stroke-black",
							},
							{
								name: "lit",
								width: "full",
								image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/jeans.svg",
								hoverStyle: " stroke-black",
							},
							{
								name: "chaise",
								width: "full",
								image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/jeans.svg",
								hoverStyle: " stroke-black",
							},
							{
								name: "lit",
								width: "full",
								image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/jeans.svg",
								hoverStyle: " stroke-black",
							},
						],
					},
					{
						name: "chaise",
						type: "elements",
						elements: [
							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},
							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},
							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},
							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},
							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},
							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},

							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},
							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},
							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},
							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},
							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},
							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},
							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},
							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},
							{
								name: 1,
								id: 1,
								image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
								price: 12,
							},
						],
					},
				],
			}
		: context.data;

	data.items.forEach(e => {
		e.elements.forEach(_e => {
			if (e.type === "buttons") {
				_e.onClickCallback = () => {
					setShow(_e.name);
					setA(show);
					postAsync("MenuBincoClickButton", { button: _e.name });
					setTitle(_e.name.toUpperCase());
				};
			} else {
				_e.onClickCallback = () => {
					postAsync("MenuBincoClickButton", { item: _e });
				};
			}
		});
	});

	const getTab = () => {
		return data.items.filter(e => e.name === show);
	};

	return (
		<div className="MenuBinco DecoInterieur">
			<div className="DecoInterieur-Title">{title}</div>
			<MenuBuilder
				style={{
					overrideClassName: {
						main:
							data.items.find(e => e.name === show)?.type === "buttons"
								? "overrideBinco" + (show === "main" ? " main" : "")
								: show === "main"
									? " main"
									: "",
						header: "overrideDeco",
					},
				}}
				submitButton={
					show === "main"
						? {
								label: "SYNCHRONISER L'INTÉRIEUR",
								onClickCallback: () =>
									postAsync("MenuDecoration", {
										button: "synchroniser",
									}),
							}
						: undefined
				}
				headerImage={"https://cdn.sacul.cloud/v2/vision-cdn/MenuDecoration/header.webp"}
				headerIcon={data.headerIcon}
				headerIconName={data.headerIconName}
				tabs={getTab()}
				origin="decoration"
			/>
		</div>
	);
};

export default MenuDecoration;
