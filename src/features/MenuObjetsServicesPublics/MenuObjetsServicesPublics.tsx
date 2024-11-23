import "./style.scss";

import React, { useContext, useState } from "react";

import { GlobalContext } from "../../app";
import MenuBuilder from "../../components/MenuBuilder/MenuBuilder";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuObjetsServicesPublics: React.FC = () => {
	const context = useContext(GlobalContext);
	const [show, setShow] = useState("main");

	const [_a, setA] = useState("main");
	useExitKeys();

	const data: any | null = isDev
		? {
				headerImage: "https://cdn.sacul.cloud/v2/vision-cdn/MenuDecoration/header.webp",
				headerTitle: "la daronne a alex",
				items: [
					{
						name: "main",
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
				callbackName: "MenuLSPD",
			}
		: context.data;

	const [title, setTitle] = useState(data.headerTitle);

	useBackspaceKey(() => {
		setShow("main");
		setTitle(data.headerTitle);
	});

	data.items.forEach(e => {
		e.elements.forEach(_e => {
			if (e.type === "buttons") {
				_e.onClickCallback = () => {
					setShow(_e.name);
					setA(_e.name);
					// postAsync('MenuBincoClickButton', { button: _e.name });
					setTitle(_e.name.toUpperCase());
				};
			} else {
				_e.onClickCallback = () => {
					postAsync(data.callbackName, _e);
				};
			}
		});
	});

	const getTab = () => {
		return data.items.filter(e => e.name === show);
	};

	return (
		<div className="MenuBinco ServicesPublics">
			<div className="ServicesPublics-Title">{title}</div>
			<MenuBuilder
				style={{
					overrideClassName: {
						main:
							data.items.find(e => e.name === show)?.type === "buttons"
								? "overrideBinco" + (show === "main" ? " main" : "")
								: show === "main"
									? " main"
									: "",
						header: "overrideServices",
					},
				}}
				headerImage={data.headerImage}
				headerIcon={data.headerIcon}
				headerIconName={data.headerIconName}
				tabs={getTab()}
			/>
		</div>
	);
};

export default MenuObjetsServicesPublics;
