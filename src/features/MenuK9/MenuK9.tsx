import "./style.scss";

import React, { useContext, useEffect, useState } from "react";

import Button from "../../components/UI/Button/Buttton";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { playOnHoverSound } from "../../utils/sounds";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuK9: React.FC = () => {
	useExitKeys();
	const context = useContext(GlobalContext);
	const [curr, setCurr] = useState(null);
	const [show, setShow] = useState(false);
	const [el, setEl] = useState(null);

	const data = React.useMemo(() => {
		return isDev
			? {
					current: 2,
					apparences: [
						{
							id: 1,
							image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						},
						{
							id: 2,
							image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						},
						{
							id: 3,
							image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						},
						{
							id: 4,
							image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						},
						{
							id: 5,
							image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						},
						{
							id: 6,
							image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						},
						{
							id: 7,
							image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						},
						{
							id: 8,
							image: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						},
					],
					actions: [
						{
							id: 1,
							label: "S'asseoire",
							callbackName: "actionSit",
						},
						{
							id: 1,
							label: "Remuer la queue",
							callbackName: "actionSit2",
						},
					],
					poses: [
						{
							id: 1,
							label: "Assis",
							callbackName: "poseSit",
						},
						{
							id: 2,
							label: "Debout",
							callbackName: "actionSit2",
						},
					],
					attaques: [
						{
							id: 1,
							label: "Assis",
							callbackName: "poseSit",
						},
						{
							id: 2,
							label: "Debout",
							callbackName: "actionSit2",
						},
						{
							id: 3,
							label: "Debout2",
							callbackName: "actionSit2",
						},
						{
							id: 4,
							label: "Debou3",
							callbackName: "actionSit2",
						},
					],
					header: "https://cdn.sacul.cloud/v2/vision-cdn/PinceACheveux/banner.webp",
				}
			: context.data;
	}, [context.data]);

	useEffect(() => {
		if (!curr) {
			setCurr(data.apparences.find(e => e.id === data.current) ?? null);
			setEl(data.apparences.find(e => e.id === data.current) ?? null);
		}
	}, [curr, data]);

	return (
		<div className="MenuK9">
			<img src={data.header} className="Banner" />

			{!show && (
				<>
					<div className="Span">GESTION</div>
					<div className="Actions">
						<div className="SubSpan">ACTIONS</div>
						<div className="List">
							{data.actions?.map((e, i) => (
								<div key={i} className="Element" onClick={() => postAsync("MenuK9", { button: e.callbackName })}>
									{e.label}
								</div>
							))}
						</div>
					</div>
					<div className="Poses">
						<div className="SubSpan">POSES</div>
						<div className="List">
							{data.poses?.map((e, i) => (
								<div key={i} className="Element" onClick={() => postAsync("MenuK9", { button: e.callbackName })}>
									{e.label}
								</div>
							))}
						</div>
					</div>
					<div className="Attaques">
						<div className="SubSpan">ATTAQUES</div>
						<div className="List">
							{data.attaques?.map((e, i) => (
								<div key={i} className="Element" onClick={() => postAsync("MenuK9", { button: e.callbackName })}>
									{e.label}
								</div>
							))}
						</div>
					</div>

					<div className="Buttons">
						<Button
							label="APPARAÎTRE"
							color="green"
							width={174}
							height={25}
							fontSize={11}
							margin={"auto 10px 10px 10px"}
							callback={() => {
								postAsync("MenuK9", {
									button: "appear",
								});
							}}
						/>
						<Button
							label="SUPPRIMER"
							color="red"
							width={174}
							height={25}
							fontSize={11}
							margin={"auto 10px 10px 10px"}
							callback={() => {
								postAsync("MenuK9", {
									button: "disappear",
								});
							}}
						/>
					</div>

					<div className="ChoiceContainer">
						<div className="Choice" onClick={() => setShow(true)}>
							<img src={curr?.image} />
							<div className="Id">
								{curr?.id}
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/right.webp" />
							</div>
						</div>

						<Button
							label="CHANGER L'APPARENCE"
							color="green"
							width={175}
							height={25}
							fontSize={11}
							margin={"auto 10px 10px 10px"}
							callback={() => {
								postAsync("MenuK9", {
									submit: curr,
								});
							}}
						/>
					</div>
				</>
			)}
			{show && (
				<>
					<div className="Span">SÉLECTION</div>
					<div className="CoupeList">
						{data.apparences.map((e, i) => (
							<div
								key={i}
								className={"Choice" + (el?.id === e.id ? " Selected" : "")}
								onClick={() => {
									postAsync("MenuK9", {
										apparence: e,
									});
									playOnHoverSound();
									setEl(e);
								}}>
								<img src={e?.image} />
								<div className="Id">{e?.id}</div>
							</div>
						))}
					</div>
					<div
						className="Retour"
						onClick={() => {
							postAsync("MenuK9", {
								hair: curr,
							});
							setEl(curr);
							setShow(false);
							playOnHoverSound();
						}}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/left.webp" />
					</div>
					<Button
						label="VALIDER"
						color="green"
						width={200}
						height={25}
						fontSize={11}
						margin={20}
						callback={() => {
							postAsync("MenuK9", {
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

export default MenuK9;
