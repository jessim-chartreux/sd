import React, { useContext, useEffect, useState } from "react";

import CreationContexte from "./CreationContexte";
import InputRange from "./utils/InputRange";
import MenuField from "./utils/MenuField";
import SquareSelector from "./utils/SquareSelector";
import { postAsync } from "../../utils/postAsync";

const get = v => v + 1;

const Visage: React.FC = () => {
	const { setData, data, setCanContinue, setHidden } = useContext(CreationContexte);
	const [n, sN] = useState({ x: data?.visage?.nose?.x ?? 0, y: data?.visage?.nose?.y ?? 0 });
	const [nP, sNP] = useState({ x: data?.visage?.noseProfile?.x ?? 0, y: data?.visage?.noseProfile?.y ?? 0 });
	const [nPo, sNPo] = useState({ x: data?.visage?.nosePointe?.x ?? 0, y: data?.visage?.nosePointe?.y ?? 0 });
	const [s, sS] = useState({ x: data?.visage?.sourcils?.x ?? 0, y: data?.visage?.sourcils?.y ?? 0 });
	const [p, sP] = useState({ x: data?.visage?.pommettes?.x ?? 0, y: data?.visage?.pommettes?.y ?? 0 });
	const [m, sM] = useState({ x: data?.visage?.menton?.x ?? 0, y: data?.visage?.menton?.y ?? 0 });
	const [mS, sMS] = useState({ x: data?.visage?.mentonShape?.x ?? 0, y: data?.visage?.mentonShape?.y ?? 0 });
	const [ma, sMa] = useState({ x: data?.visage?.machoire?.x ?? 0, y: data?.visage?.machoire?.y ?? 0 });
	const [j, sJ] = useState(data?.visage?.joues / 2 + 50 || 50);
	const [y, sY] = useState(data?.visage?.yeux / 2 + 50 || 50);
	const [l, sL] = useState(data?.visage?.levres / 2 + 50 || 50);
	const [c, sC] = useState(data?.visage?.cou / 2 + 50 || 50);

	useEffect(() => {
		setData({
			...data,
			visage: {
				nose: {
					x: n.x,
					y: n.y,
				},
				noseProfile: {
					x: nP.x,
					y: nP.y,
				},
				nosePointe: {
					x: nPo.x,
					y: nPo.y,
				},
				sourcils: {
					x: s.x,
					y: s.y,
				},
				pommettes: {
					x: p.x,
					y: p.y,
				},
				menton: {
					x: m.x,
					y: m.y,
				},
				mentonShape: {
					x: mS.x,
					y: mS.y,
				},
				machoire: {
					x: ma.x,
					y: ma.y,
				},
				joues: j * 2 - 100,
				yeux: y * 2 - 100,
				levres: l * 2 - 100,
				cou: c * 2 - 100,
			},
		});
		setCanContinue(true);
	}, [n, nP, nPo, s, p, m, mS, ma, j, y, l, c]);

	useEffect(() => {
		postAsync("CreationPersonnage", {
			onglet: "visage",
			currentData: data,
		});
	}, []);

	return (
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
	);
};

export default Visage;
