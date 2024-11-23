import "./style.scss";

import React, { useContext, useEffect, useState } from "react";

import Apparence from "./Apparence";
import Button from "./utils/Button";
import Character from "./Character";
import CreationContexte from "./CreationContexte";
import { GlobalContext } from "../../app";
import Identity from "./Identity";
import Outfit from "./Outfit";
import Ped from "./Ped";
import SpawnPoint from "./SpawnPoint";
import Visage from "./Visage";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";

const CreationPersonnage: React.FC = () => {
	const context = useContext(GlobalContext);
	const [current, setCurrent] = useState(0);
	const [maxCurrent, setMaxCurrent] = useState(0);
	const [data, setData] = useState<any>({});
	const [canContinue, setCanContinue] = useState(false);
	const [hidden, setHidden] = useState(false);
	const [hidden2, setHidden2] = useState(false);
	const [camera, setCamera] = useState(1);
	const [isClicking, setIsClicking] = useState(false);
	const [oldX, setOldX] = useState(null);

	useEffect(() => {
		postAsync("CreationPersonnage", {
			newData: data,
		});
	}, [data]);

	const _data: any | null = isDev
		? {
				catalogue: [
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						label: "test",
					},
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
					},
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
					},
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
					},
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
					},
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
					},
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
					},
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
					},
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
					},
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
					},
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
					},
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
					},
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
					},
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
					},
					{
						id: 1,
						category: "hair",
						img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
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
				],
				buttons: [
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
						image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/tshirt.svg",
						hoverStyle: "fill-black stroke-black",
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
						image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/jeans.svg",
						hoverStyle: " stroke-black",
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
						image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/bouton.svg",
						hoverStyle: "fill-black stroke-white",
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
						image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/bouton.svg",
						hoverStyle: "fill-black stroke-white",
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
						image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/bouton.svg",
						hoverStyle: "fill-black stroke-white",
					},
				],
				peds: [
					{
						category: "man",
						label: "Ped 01",
						id: "g_m_y_ballaeast_01",
					},
					{
						category: "man",
						label: "Ped 02",
						id: "g_m_y_ballaeast_02",
					},
					{
						category: "man",
						label: "Ped 03",
						id: "g_m_y_ballaeast_03",
					},
					{
						category: "woman",
						label: "Femme 01",
						id: "g_m_y_ballaeast_01",
					},
				],
				pedsVariantes: [
					{
						category: "visage",
						subCategory: "man",
						id: 1,
						idVariante: 1,
					},
					{
						category: "visage",
						subCategory: "man",
						id: 2,
						idVariante: 2,
					},
					{
						category: "visage",
						subCategory: "man",
						id: 1,
						targetId: 1,
					},
					{
						category: "visage",
						subCategory: "man",
						id: 2,
						targetId: 1,
					},

					{
						category: "visage",
						subCategory: "man",
						id: 3,
						targetId: 1,
					},
					{
						category: "visage",
						subCategory: "man",
						id: 1,
						targetId: 2,
					},
				],
				hideItemList: ["bras"],
				premium: true,
			}
		: context.data;

	const store: any = {
		current,
		data,
		setData,
		canContinue,
		setCanContinue,
		hidden,
		hidden2,
		setHidden,
		setHidden2,
		catalogue: _data.catalogue,
		dataButtons: _data.buttons,
		peds: _data.peds,
		pedsVariantes: _data.pedsVariantes,
		hideItemList: _data.hideItemList,
		setCurrent,
		premium: _data.premium,
	};
	return (
		<CreationContexte.Provider value={store}>
			<div className={"CreationPersonnage " + (isClicking ? " selected" : "")} onMouseUp={() => setIsClicking(false)}>
				<div
					className={"cameraMove" + (isClicking ? " selected" : "")}
					onMouseDown={() => {
						setIsClicking(true);
					}}
					onMouseMove={e => {
						if (isClicking) {
							if (e.pageX < oldX) {
								postAsync("CreationPersonnageMouseMove", {
									moveCamera: -1,
								});
							} else if (e.pageX > oldX) {
								postAsync("CreationPersonnageMouseMove", {
									moveCamera: 1,
								});
							}

							setOldX(e.pageX);
						}
					}}></div>
				<div className="cameras__wrapper">
					<div
						onClick={() => {
							setCamera(0);
							postAsync("CreationPersonnageSetCamera", {
								newCamera: "full",
							});
						}}
						className={"camera" + (camera === 0 ? " --active" : "")}>
						<img src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/camera3.svg"} alt="" />
					</div>

					<div
						onClick={() => {
							setCamera(1);
							postAsync("CreationPersonnageSetCamera", {
								newCamera: "face",
							});
						}}
						className={"camera" + (camera === 1 ? " --active" : "")}>
						<img src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/eye.svg"} alt="" />
					</div>

					<div
						onClick={() => {
							setCamera(2);
							postAsync("CreationPersonnageSetCamera", {
								newCamera: "chest",
							});
						}}
						className={"camera" + (camera === 2 ? " --active" : "")}>
						<img src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/camera2.svg"} alt="" />
					</div>
					<div className="subCam">
						<div className={"camera" + (camera === 0 ? " --active" : "")}></div>
						<div className={"camera" + (camera === 1 ? " --active" : "")}></div>
						<div className={"camera" + (camera === 2 ? " --active" : "")}></div>
					</div>
				</div>
				<div className="menu">
					<header className="menu__header">
						<img src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/header.jpg"} alt="" />
					</header>

					<nav className={"menu__navigation " + (hidden || hidden2 ? "hidden" : "")}>
						<div
							className={`navigation__item ${current >= 0 ? "--finished" : ""}`}
							onClick={() => {
								maxCurrent >= 0 && setCurrent(0);
							}}>
							<div className="polygon">
								<img src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/print.svg"} alt="finger p" />
							</div>
							<span className="item__title"> Identité </span>
						</div>
						<div
							className={`navigation__item ${current >= 1 ? "--finished" : ""}`}
							onClick={() => {
								maxCurrent >= 1 && setCurrent(1);
							}}>
							<div className="polygon">
								<img src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/user.svg"} alt="finger p" />
							</div>
							<span className="item__title"> PERSONNAGE </span>
						</div>
						<div
							className={`navigation__item ${current >= 2 ? "--finished" : ""}`}
							onClick={() => {
								maxCurrent >= 2 && setCurrent(2);
							}}>
							<div className="polygon">
								<img src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/eye.svg"} alt="finger p" />
							</div>
							<span className="item__title"> VISAGE </span>
						</div>
						<div
							className={`navigation__item ${current >= 3 ? "--finished" : ""}`}
							onClick={() => {
								maxCurrent >= 3 && setCurrent(3);
							}}>
							<div className="polygon">
								<img
									style={{ transform: "translate(-2px, 2px)" }}
									src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/apparence.svg"}
									alt="finger p"
								/>
							</div>
							<span className="item__title"> APPARENCE </span>
						</div>
						<div
							className={`navigation__item ${current >= 4 ? "--finished" : ""}`}
							onClick={() => {
								maxCurrent >= 4 && setCurrent(4);
							}}>
							<div className="polygon">
								<img
									style={{ height: 22 }}
									src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/shirt.svg"}
									alt="finger p"
								/>
							</div>
							<span className="item__title"> VETEMENTS </span>
						</div>
					</nav>

					<div className={"menu__content "}>
						{current === 0 && <Identity />}
						{current === 1 && data?.identity?.characterChoice === "custom" && <Ped />}
						{current === 1 && data?.identity?.characterChoice !== "custom" && <Character />}
						{current === 2 && <Visage />}
						{current === 3 && <Apparence />}
						{current === 4 && <Outfit />}
						{current === 5 && <SpawnPoint onBack={() => setCurrent(4)} />}
					</div>

					<div className={"menu__interactions " + (hidden || hidden2 ? "hidden" : "")}>
						{current > 0 && (
							<Button onClick={() => setCurrent(current - 1)} type="WARN">
								<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</Button>
						)}
						<Button
							onClick={() => {
								setCurrent(current + 1);
								setMaxCurrent(current + 1);
							}}
							disabled={!canContinue}
							type="SUCCESS"
							customStyle={{ background: "linear-gradient(180deg, #33963C 0%, rgba(30, 180, 90, 0.14) 100%)" }}>
							<img
								height="17"
								width="17"
								src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/confirm.svg"}
								alt=""
							/>
						</Button>
					</div>
				</div>
			</div>
		</CreationContexte.Provider>
	);
};

export default CreationPersonnage;
