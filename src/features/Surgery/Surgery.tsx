import "./style.scss";

import React, { useContext, useEffect, useState } from "react";

import Button from "./utils/Button";
import { GlobalContext } from "../../app";
import InputRange from "./utils/InputRange";
import MenuField from "./utils/MenuField";
import SquareSelector from "./utils/SquareSelector";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const _get = v => v + 1;

const Surgery: React.FC = () => {
	const context = useContext(GlobalContext);
	const [n, sN] = useState({ x: 0, y: 0 });
	const [nP, sNP] = useState({ x: 0, y: 0 });
	const [nPo, sNPo] = useState({ x: 0, y: 0 });
	const [s, sS] = useState({ x: 0, y: 0 });
	const [p, sP] = useState({ x: 0, y: 0 });
	const [m, sM] = useState({ x: 0, y: 0 });
	const [mS, sMS] = useState({ x: 0, y: 0 });
	const [ma, sMa] = useState({ x: 0, y: 0 });
	const [j, sJ] = useState(50);
	const [y, sY] = useState(50);
	const [l, sL] = useState(50);
	const [c, sC] = useState(50);

	useExitKeys();

	const _data: any | null = isDev ? null : context.data;

	useEffect(() => {
		sN({ x: _data?.visage?.nose?.x ?? 0, y: _data?.visage?.nose?.y ?? 0 });
		sNP({ x: _data?.visage?.noseProfile?.x ?? 0, y: _data?.visage?.noseProfile?.y ?? 0 });
		sNPo({ x: _data?.visage?.noseProfile?.x ?? 0, y: _data?.visage?.noseProfile?.y ?? 0 });
		sS({ x: _data?.visage?.sourcils?.x ?? 0, y: _data?.visage?.sourcils?.y ?? 0 });
		sP({ x: _data?.visage?.pommettes?.x ?? 0, y: _data?.visage?.pommettes?.y ?? 0 });
		sM({ x: _data?.visage?.menton?.x ?? 0, y: _data?.visage?.menton?.y ?? 0 });
		sMS({ x: _data?.visage?.mentonShape?.x ?? 0, y: _data?.visage?.mentonShape?.y ?? 0 });
		sMa({ x: _data?.visage?.machoire?.x ?? 0, y: _data?.visage?.machoire?.y ?? 0 });
		sJ(_data?.visage?.joues / 2 + 50 || 50);
		sY(_data?.visage?.yeux / 2 + 50 || 50);
		sL(_data?.visage?.levres / 2 + 50 || 50);
		sC(_data?.visage?.cou / 2 + 50 || 50);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const keyListener = (e: KeyboardEvent) => {
			if (e.key === "a") {
				postAsync("SurgeryKeyEvent", { key: "a" });
			} else if (e.key === "e") {
				postAsync("SurgeryKeyEvent", { key: "e" });
			}
		};

		const mouseListener = (e: WheelEvent) => {
			if (!isInsideSurgeryDiv(e)) {
				if (e.deltaY > 0) {
					postAsync("SurgeryKeyEvent", { key: "mouseDown" });
				} else if (e.deltaY < 0) {
					postAsync("SurgeryKeyEvent", { key: "mouseUp" });
				}
			}
		};

		const isInsideSurgeryDiv = (e: WheelEvent) => {
			const targetElement = e.target as HTMLElement;
			return targetElement.closest(".menu");
		};

		window.addEventListener("keydown", keyListener);
		window.addEventListener("wheel", mouseListener);

		return () => {
			window.removeEventListener("keydown", keyListener);
			window.removeEventListener("wheel", mouseListener);
		};
	}, []);

	useEffect(() => {
		postAsync("SurgeryPreview", {
			n,
			nP,
			nPo,
			s,
			p,
			m,
			mS,
			ma,
			j,
			y,
			l,
			c,
		});
	}, [n, nP, nPo, s, p, m, mS, ma, j, y, l, c]);

	const submit = () => {
		postAsync("SurgeryValidate", {
			n,
			nP,
			nPo,
			s,
			p,
			m,
			mS,
			ma,
			j,
			y,
			l,
			c,
		});
	};

	return (
		<div className="Surgery">
			<div className="menu">
				<header className="menu__header">
					<img src={"https://cdn.sacul.cloud/v2/vision-cdn/Surgery/header.webp"} alt="" />
				</header>
				<div className="traits__wrapper">
					<div className="_container _square">
						<MenuField fieldName="NEZ" className="visageMenu">
							<div className="flexDiv --evenly">
								<SquareSelector value={n} setValue={sN} typesNames={["Haut", "large", "bas", "fin"]} />
							</div>
						</MenuField>
					</div>

					<div className="_container _square">
						<MenuField fieldName="PROFIL DU NEZ" className="visageMenu">
							<div className="flexDiv --evenly">
								<SquareSelector value={nP} setValue={sNP} typesNames={["courbé", "long", "incurvé", "Court"]} />
							</div>
						</MenuField>
					</div>

					<div className="_container _square">
						<MenuField fieldName="POINTE DU NEZ" className="visageMenu">
							<div className="flexDiv --evenly">
								<SquareSelector
									value={nPo}
									setValue={sNPo}
									typesNames={["cassé à gauche", "pointe haute", "cassé à droite", "pointe basse"]}
								/>
							</div>
						</MenuField>
					</div>

					<div className="_container _square">
						<MenuField fieldName="SOURCILS" className="visageMenu">
							<div className="flexDiv --evenly">
								<SquareSelector value={s} setValue={sS} typesNames={["Haut", "extérieur", "bas", "intérieur"]} />
							</div>
						</MenuField>
					</div>

					<div className="_container _square">
						<MenuField fieldName="POMMETTES" className="visageMenu">
							<div className="flexDiv --evenly">
								<SquareSelector value={p} setValue={sP} typesNames={["Haut", "creuse", "bas", "gonflée"]} />
							</div>
						</MenuField>
					</div>

					<div className="_container _square">
						<MenuField fieldName="MENTON" className="visageMenu">
							<div className="flexDiv --evenly">
								<SquareSelector value={m} setValue={sM} typesNames={["Haut", "extérieur", "bas", "intérieur"]} />
							</div>
						</MenuField>
					</div>

					<div className="_container _square">
						<MenuField fieldName="FORME DU MENTON" className="visageMenu">
							<div className="flexDiv --evenly">
								<SquareSelector value={mS} setValue={sMS} typesNames={["pointu", "rond", "arrondi", "carré"]} />
							</div>
						</MenuField>
					</div>

					<div className="_container _square">
						<MenuField fieldName="MACHOIRE" className="visageMenu">
							<div className="flexDiv --evenly">
								<SquareSelector value={ma} setValue={sMa} typesNames={["ronde", "fine", "carrée", "large"]} />
							</div>
						</MenuField>
					</div>

					<div className="_container line">
						<div className="label _left">gonflées</div>
						<div className="label _right">creuses</div>
						<MenuField fieldName="JOUES" className="visageMenu">
							<InputRange
								onChange={event => {
									sJ(event.target.valueAsNumber);
								}}
								className="--flex"
								max={100}
								min={1}
								defaultV={j}
								customStyle={{
									background:
										j < 50
											? `linear-gradient(90deg, transparent 0%, transparent ${j}%, #5e6cb6 ${j}%, #5e6cb6 50%, #5e6cb6 ${j}%, transparent ${j}%, transparent 100%)`
											: j === 50
												? ""
												: `linear-gradient(90deg, transparent 0%, transparent 50%, #5e6cb6 50%, #5e6cb6 ${j}%, transparent ${j}%, transparent 100%)`,
								}}
							/>
						</MenuField>
					</div>

					<div className="_container line">
						<div className="label _left">ouverts</div>
						<div className="label _right">plissés</div>
						<MenuField fieldName="YEUX" className="visageMenu">
							<InputRange
								onChange={event => {
									sY(event.target.valueAsNumber);
								}}
								className="--flex"
								max={100}
								min={1}
								defaultV={y}
								customStyle={{
									background:
										y < 50
											? `linear-gradient(90deg, transparent 0%, transparent ${y}%, #5e6cb6 ${y}%, #5e6cb6 50%, #5e6cb6 ${y}%, transparent ${y}%, transparent 100%)`
											: y === 50
												? ""
												: `linear-gradient(90deg, transparent 0%, transparent 50%, #5e6cb6 50%, #5e6cb6 ${y}%, transparent ${y}%, transparent 100%)`,
								}}
							/>
						</MenuField>
					</div>

					<div className="_container line">
						<div className="label _left">épaisses</div>
						<div className="label _right">minces</div>
						<MenuField fieldName="LEVRES" className="visageMenu">
							<InputRange
								onChange={event => {
									sL(event.target.valueAsNumber);
								}}
								className="--flex"
								max={100}
								min={1}
								defaultV={l}
								customStyle={{
									background:
										l < 50
											? `linear-gradient(90deg, transparent 0%, transparent ${l}%, #5e6cb6 ${l}%, #5e6cb6 50%, #5e6cb6 ${l}%, transparent ${l}%, transparent 100%)`
											: l === 50
												? ""
												: `linear-gradient(90deg, transparent 0%, transparent 50%, #5e6cb6 50%, #5e6cb6 ${l}%, transparent ${l}%, transparent 100%)`,
								}}
							/>
						</MenuField>
					</div>

					<div className="_container line">
						<div className="label _left">mince</div>
						<div className="label _right">épais</div>
						<MenuField fieldName="COU" className="visageMenu">
							<InputRange
								onChange={event => {
									sC(event.target.valueAsNumber);
								}}
								className="--flex"
								max={100}
								min={1}
								defaultV={c}
								customStyle={{
									background:
										c < 50
											? `linear-gradient(90deg, transparent 0%, transparent ${c}%, #5e6cb6 ${c}%, #5e6cb6 50%, #5e6cb6 ${c}%, transparent ${c}%, transparent 100%)`
											: c === 50
												? ""
												: `linear-gradient(90deg, transparent 0%, transparent 50%, #5e6cb6 50%, #5e6cb6 ${c}%, transparent ${c}%, transparent 100%)`,
								}}
							/>
						</MenuField>
					</div>
				</div>
				<div className={"menu__interactions "}>
					<p>9500 $</p>
					<Button
						onClick={submit}
						type="SUCCESS"
						customStyle={{ background: "linear-gradient(180deg, #33963C 0%, rgba(30, 180, 90, 0.14) 100%)" }}>
						<img height="17" width="17" src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/confirm.svg"} alt="" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Surgery;
