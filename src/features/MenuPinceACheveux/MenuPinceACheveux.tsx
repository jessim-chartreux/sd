import "./style.scss";

import React, { useContext, useEffect, useState } from "react";

import Button from "../../components/UI/Button/Buttton";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { playOnHoverSound } from "../../utils/sounds";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuPinceACheveux: React.FC = () => {
	useExitKeys();
	const context = useContext(GlobalContext);
	const [curr, setCurr] = useState(null);
	const [show, setShow] = useState(false);
	const [el, setEl] = useState(null);

	const data = React.useMemo(() => {
		return isDev
			? {
					current: 136,
					items: [
						{
							id: 45,
							valeur: "Coupe cheveux 45",
							img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
							default: false,
						},
						{
							id: 45,
							valeur: "Coupe cheveux 45",
							img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
							default: false,
						},
						{
							id: 45,
							valeur: "Coupe cheveux 45",
							img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
							default: false,
						},
						{
							id: 45,
							valeur: "Coupe cheveux 45",
							img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
							default: false,
						},
						{
							id: 45,
							valeur: "Coupe cheveux 45",
							img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
							default: false,
						},
						{
							id: 45,
							valeur: "Coupe cheveux 45",
							img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
							default: false,
						},
						{
							id: 48,
							valeur: "Coupe cheveux 48",
							img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
							default: false,
						},
						{
							id: 51,
							valeur: "Coupe cheveux 51",
							img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
							default: false,
						},
						{
							id: 76,
							valeur: "Coupe cheveux 76",
							img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
							default: false,
						},
						{
							id: 88,
							img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
							valeur: "Coupe cheveux 88",
							default: false,
						},
						{
							id: 100,
							img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
							valeur: "Coupe cheveux 100",
							default: false,
						},
						{
							id: 136,
							valeur: "Coupe de kingsley",
							img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
							default: true,
						},
						{
							id: 139,
							valeur: "Coupe cheveux 139",
							img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
							default: false,
						},
					],
					default: 45,
				}
			: context.data;
	}, [context.data]);

	useEffect(() => {
		if (!curr) {
			setCurr(data.items.find(e => e.id === data.current) ?? {});
			setEl(data.items.find(e => e.id === data.current) ?? {});
		}
	}, [curr, data]);

	return (
		<div className="PinceACheveux">
			<img src="https://cdn.sacul.cloud/v2/vision-cdn/PinceACheveux/banner.webp" className="Banner" />

			{!show && (
				<>
					<div className="Choice" onClick={() => setShow(true)}>
						<img src={curr?.img} />
						<div className="Id">
							{curr?.id}
							<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/right.webp" />
						</div>
					</div>

					<Button
						label="CHANGER DE COUPE"
						color="green"
						width={250}
						height={25}
						fontSize={11}
						margin={"auto 10px 10px 10px"}
						callback={() => {
							postAsync("PinceACheveux", {
								submit: curr,
							});
						}}
					/>
					<Button
						label="COUPE PAR DEFAUT"
						color="blue"
						width={200}
						height={25}
						fontSize={11}
						margin={"0 0 30px"}
						callback={() => {
							postAsync("PinceACheveux", {
								hair: data.items.find(e => e.id === data.default),
							});
							setCurr(data.items.find(e => e.id === data.default));
							setEl(data.items.find(e => e.id === data.default));
						}}
					/>
				</>
			)}
			{show && (
				<>
					<div className="Span">COUPES DE CHEVEUX</div>
					<div className="CoupeList">
						{data.items.map((e, i) => (
							<div
								key={i}
								className={"Coupe" + (el?.id === e.id ? " Selected" : "")}
								onClick={() => {
									postAsync("PinceACheveux", {
										hair: e,
									});
									playOnHoverSound();
									setEl(e);
								}}>
								<div className="ShowId">{e?.id}</div>
								<div className="Name">{e?.valeur}</div>
							</div>
						))}
					</div>
					<div
						className="Retour"
						onClick={() => {
							postAsync("PinceACheveux", {
								hair: curr,
							});
							setEl(curr);
							setShow(false);
							playOnHoverSound();
						}}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/left.webp" />
						RETOUR
					</div>
					<Button
						label="VALIDER"
						color="green"
						width={200}
						height={25}
						fontSize={11}
						margin={20}
						callback={() => {
							postAsync("PinceACheveux", {
								validate: el,
							});
							setCurr(el);
							setShow(false);
						}}
					/>
				</>
			)}
		</div>
	);
};

export default MenuPinceACheveux;
