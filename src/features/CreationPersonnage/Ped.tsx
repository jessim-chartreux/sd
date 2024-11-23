import React, { useContext, useEffect, useState } from "react";

import Button from "./utils/Button";
import CreationContexte from "./CreationContexte";
import MenuField from "./utils/MenuField";
import { postAsync } from "../../utils/postAsync";

const Ped: React.FC = () => {
	const { setHidden, peds, setHidden2, pedsVariantes, setCurrent, setData, data } = useContext(CreationContexte);
	const [show, sShow] = useState(null);
	const [pledList, sPledList] = useState([]);
	const [colorList, sColorList] = useState([]);
	const [typeList, sTypeList] = useState([]);
	const [sexe, sSexe] = useState(data?.ped?.sexe ?? "man");
	const [selectedPled, sSelectedPled] = useState(data?.ped?.selectedPled ?? null);
	const [u, sU] = useState(false);

	const [local, setLocal] = useState<any>(data?.ped?.physique ?? {});

	useEffect(() => {
		postAsync("CreationPersonnage", {
			onglet: "ped",
		});
	}, []);

	useEffect(() => {
		setData({
			...data,
			ped: {
				sexe,
				selectedPled,
				physique: local,
			},
		});
	}, [local, sexe, selectedPled]);

	useEffect(() => {
		if (show) {
			sTypeList(pedsVariantes.filter(e => e.category === show && e.idVariante && e.subCategory === sexe));
			_setLocal(show, "type", pedsVariantes.filter(e => e.category === show && e.idVariante && e.subCategory === sexe)[0]);
			sU(true);
		}
	}, [show]);

	useEffect(() => {
		if (u) {
			sU(false);
			updateColorList();
		}
	}, [u]);

	const updateColorList = () => {
		sColorList(
			pedsVariantes.filter(e => e.category === show && e.targetId === local?.[show]?.type?.idVariante && e.subCategory === sexe),
		);
		_setLocal(
			show,
			"color",
			pedsVariantes.filter(
				e => e.category === show && e.targetId && e.targetId === local?.[show]?.type?.idVariante && e.subCategory === sexe,
			)[0] ?? { default: true },
		);
	};

	useEffect(() => {
		sPledList(peds.filter(e => e.category === sexe));
	}, [sexe]);

	useEffect(() => {
		sSelectedPled(data?.ped?.selectedPled ?? pledList[0] ?? {});
	}, [pledList]);

	useEffect(() => {
		setHidden(false);
		setHidden2(true);
	}, []);

	const _setLocal = (cat, subCat, value) => {
		const _loc = { ...local };
		if (!_loc[cat]) _loc[cat] = {};
		if (!_loc[cat][subCat]) _loc[cat][subCat] = {};
		_loc[cat][subCat] = value;
		setLocal(_loc);
	};

	return (
		<div className="Peds">
			<div className="pedHeader">
				<div className="txt">SÉLECTION PERSONNAGE PED</div>
			</div>
			<MenuField fieldName="SEXE">
				<div className="Selector">
					<div
						className="LeftArrow"
						onClick={() => {
							if (sexe === "man") sSexe("woman");
							else sSexe("man");
						}}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/left.svg" />
					</div>
					<div className="Name">{sexe === "man" ? "HOMME" : "FEMME"}</div>
					<div
						className="RightArrow"
						onClick={() => {
							if (sexe === "man") sSexe("woman");
							else sSexe("man");
						}}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/right.svg" />
					</div>
				</div>
			</MenuField>

			<MenuField fieldName="CHOISIR UN PED">
				<div className="Selector">
					<div
						className="LeftArrow"
						onClick={() => {
							const i = pledList.findIndex(e => e.id === selectedPled.id);
							if (i === 0) {
								sSelectedPled(pledList[pledList.length - 1]);
							} else {
								sSelectedPled(pledList[i - 1]);
							}
						}}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/left.svg" />
					</div>
					<div className="Name">{selectedPled?.label}</div>
					<div
						className="RightArrow"
						onClick={() => {
							const i = pledList.findIndex(e => e.id === selectedPled.id);
							if (i === pledList.length - 1) {
								sSelectedPled(pledList[0]);
							} else {
								sSelectedPled(pledList[i + 1]);
							}
						}}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/right.svg" />
					</div>
				</div>
			</MenuField>

			<MenuField fieldName="PHYSIQUE">
				<div className="ButtonContainer">
					<div className={"Button" + (show === "haut" ? " Selected" : "")} onClick={() => sShow("haut")}>
						HAUT
					</div>
					<div className={"Button" + (show === "bas" ? " Selected" : "")} onClick={() => sShow("bas")}>
						BAS
					</div>
					<div className={"Button" + (show === "chaussure" ? " Selected" : "")} onClick={() => sShow("chaussure")}>
						CHAUSSURE
					</div>
					<div className={"Button" + (show === "accessoires" ? " Selected" : "")} onClick={() => sShow("accessoires")}>
						ACCESSOIRES
					</div>
				</div>
			</MenuField>

			<div className="Submit">
				<Button
					onClick={() => {
						setCurrent(0);
						setHidden(false);
						setHidden2(false);
					}}
					type="WARN"
					customStyle={{ marginRight: 10 }}>
					<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</Button>
				<Button
					onClick={() => setCurrent(5)}
					type="SUCCESS"
					customStyle={{ background: "linear-gradient(180deg, #33963C 0%, rgba(30, 180, 90, 0.14) 100%)" }}>
					<img height="17" width="17" src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/confirm.svg"} alt="" />
				</Button>
			</div>
			{show && (
				<div className="colorPicker eyes">
					<MenuField fieldName="TYPE">
						<div className="Selector">
							<div
								className="LeftArrow"
								onClick={() => {
									const i = typeList.findIndex(e => e.id === local[show]?.type?.id);
									if (i === 0) {
										_setLocal(show, "type", typeList[typeList.length - 1]);
									} else {
										_setLocal(show, "type", typeList[i - 1]);
									}
									sU(true);
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/left.svg" />
							</div>
							<div className="Name">{local[show]?.type?.id ?? "DÉFAUT"}</div>
							<div
								className="RightArrow"
								onClick={() => {
									const i = typeList.findIndex(e => e.id === local[show]?.type?.id);
									if (i === typeList.length - 1) {
										_setLocal(show, "type", typeList[0]);
									} else {
										_setLocal(show, "type", typeList[i + 1]);
									}
									sU(true);
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/right.svg" />
							</div>
						</div>
					</MenuField>
					<MenuField fieldName="COULEUR">
						<div className="Selector">
							<div
								className="LeftArrow"
								onClick={() => {
									const i = colorList.findIndex(e => e.id === local[show]?.color?.id);
									if (i === 0) {
										_setLocal(show, "color", colorList[colorList.length - 1]);
									} else {
										_setLocal(show, "color", colorList[i - 1]);
									}
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/left.svg" />
							</div>
							<div className="Name">{local[show]?.color?.id ?? "DÉFAUT"}</div>
							<div
								className="RightArrow"
								onClick={() => {
									const i = colorList.findIndex(e => e.id === local[show]?.color?.id);
									if (i === colorList.length - 1) {
										_setLocal(show, "color", colorList[0]);
									} else {
										_setLocal(show, "color", colorList[i + 1]);
									}
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/right.svg" />
							</div>
						</div>
					</MenuField>
				</div>
			)}
		</div>
	);
};

export default Ped;
