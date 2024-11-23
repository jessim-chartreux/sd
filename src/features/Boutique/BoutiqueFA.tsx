import "./style.scss";

import React, { useContext, useEffect, useState } from "react";
import { playBoutiqueEnter, playBoutiqueLeave } from "../../utils/sounds";

import { BoutiqueHeader } from "../../components/UI/BoutiqueHeader/BoutiqueHeader";
import { GlobalContext } from "../../app";
import { SERVER } from "../../config";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import shopInventory from "./data.json";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useEnterKey } from "../../hooks/useEnterKey";
import { useExitKeys } from "../../hooks/useExitKeys";
import { useKey } from "../../hooks/useKey";

const BoutiqueFA: React.FC = () => {
	const context = useContext(GlobalContext);
	const data: any | null = isDev ? shopInventory : context.data;
	const [show, setShow] = useState<"customBoutique" | "addonBoutique" | "activeCategory" | "activeCustom" | "subPremium">(
		data.type ? data.type : "addonBoutique",
	);
	const [_custom, setCustom] = useState({});
	const [selected, setSelected] = useState<any>(null);
	const [_colorIndex, setColorIndex] = useState(0);
	const [category, _setCategory] = useState<null | number>(null);
	const [sex, setSex] = useState(0);
	const [selectedElement, setSelectedElement] = useState<any>(-1);

	const [time, _setTime] = useState<any>();
	const _categories = [
		{
			name: "Vêtements",
			icon: "vet-cu",
		},
		{
			name: "Bijoux",
			icon: "bij-cu",
		},
		{
			name: "Masque",
			icon: "mas",
		},
		{
			name: "Tatoo",
			icon: "tat",
		},
	];

	useKey("e", () => {
		postAsync("buyVCoins");
	});

	useExitKeys();

	useBackspaceKey(() => {
		if (show == "addonBoutique") {
			playBoutiqueLeave();
			postAsync("backToEscape");
		}
	});

	useEffect(() => {
		if (category) {
			setSelected(data.catalogue.filter(e => e.category === category && !e?.owned)?.[0]);
		}
	}, [category, data.catalogue]);

	useEffect(() => {
		setColorIndex(0);
		setCustom({});
	}, [selected]);

	const downSelectedElementAddon = (_b?: boolean) => {
		if (selectedElement > 0) setSelectedElement(selectedElement - 1);
		else setSelectedElement(3);
	};

	const upSelectedElementAddon = (b?: boolean) => {
		if (b && selectedElement == 0) setSelectedElement(2);
		else if (selectedElement < 3) setSelectedElement(selectedElement + 1);
		else setSelectedElement(0);
	};

	const downSelectedElementCustom = (b?: boolean) => {
		if (b && selectedElement > 1) setSelectedElement(selectedElement - 2);
		else if (selectedElement > 0) setSelectedElement(selectedElement - 1);
		else setSelectedElement(5);
	};

	const upSelectedElementCustom = (b?: boolean) => {
		if (b && selectedElement <= 3) setSelectedElement(selectedElement + 2);
		else if (selectedElement < 5) setSelectedElement(selectedElement + 1);
		else setSelectedElement(0);
	};

	const playSound = () => {
		if (show == "addonBoutique") {
			playBoutiqueEnter();
		} else if (show == "customBoutique") {
			if (selectedElement !== 5) playBoutiqueEnter();
			else playBoutiqueLeave();
		}
	};

	const enterCustom = () => {
		playSound();

		if (selectedElement == 0) {
			postAsync("BoutiqueCategory", { button: "CustomVetements", sex });
		} else if (selectedElement == 1) {
			postAsync("BoutiqueCategory", { button: "CustomBijoux", sex });
		} else if (selectedElement == 2) {
			postAsync("BoutiqueCategory", { button: "CustomMasque", sex });
		} else if (selectedElement == 3) {
			postAsync("BoutiqueCategory", { button: "CustomTatouage", sex });
		} else if (selectedElement == 4) {
			postAsync("BoutiqueCategory", { button: "CustomVehicules", sex });
		} else if (selectedElement == 5) {
			setShow("addonBoutique");
			setSelectedElement(0);
		}
	};

	const enterAddon = () => {
		playSound();

		if (selectedElement == 0) {
			postAsync("BoutiqueCategory", { button: "AddonVetements", sex });
		} else if (selectedElement == 1) {
			postAsync("BoutiqueCategory", { button: "AddonBijoux", sex });
		} else if (selectedElement == 2) {
			postAsync("BoutiqueCategory", { button: "AddonVehicules", sex });
		} else if (selectedElement == 3) {
			setShow("customBoutique");
			setSelectedElement(0);
		}
	};

	useKey("ArrowRight", () => {
		if (show == "addonBoutique") upSelectedElementAddon(true);
		else if (show == "customBoutique") upSelectedElementCustom(true);
	});

	useKey("ArrowLeft", () => {
		if (show == "addonBoutique") downSelectedElementAddon(true);
		else if (show == "customBoutique") downSelectedElementCustom(true);
	});

	useKey("ArrowDown", () => {
		if (show == "addonBoutique") upSelectedElementAddon();
		else if (show == "customBoutique") upSelectedElementCustom();
	});

	useKey("ArrowUp", () => {
		if (show == "addonBoutique") downSelectedElementAddon();
		else if (show == "customBoutique") downSelectedElementCustom();
	});

	useBackspaceKey(() => {
		if (show == "customBoutique") playBoutiqueLeave();
		setShow("addonBoutique");
	});

	useEnterKey(() => {
		if (show == "addonBoutique") enterAddon();
		else if (show == "customBoutique") enterCustom();
	});

	return (
		<div className="BoutiqueFA">
			{/* BOUTIQUE */}

			{show === "addonBoutique" && (
				<div className="Main A-FadeIn">
					<BoutiqueHeader data={data} server={SERVER} />
					<div className="MainContent">
						<div className="Header">
							<div className="Title">
								<b>BOUTIQUE</b>
							</div>
							{/* <div className="Category">
								<span
									className={sex === 0 ? "Selected" : ""}
									onClick={() => {
										setSex(0);
										playBoutiqueEnter();
									}}>
									Homme
								</span>
								<span
									className={sex === 1 ? "Selected" : ""}
									onClick={() => {
										setSex(1);
										playBoutiqueEnter();
									}}>
									Femme
								</span>
							</div> */}
						</div>
						<div className="Nav">
							<div
								className={`Element  ${selectedElement == 2 ? "active" : ""}`}
								onClick={() => {
									postAsync("buyPremium");
									playBoutiqueEnter();
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/Boutique/Group_581.webp" className="Bg" />
								<div className="Name" style={{ textAlign: "center" }}>
									PREMIUM
								</div>
							</div>
							<div
								className={`Element  ${selectedElement == 3 ? "active" : ""}`}
								onClick={() => {
									postAsync("buyPremiumPlus");
									playBoutiqueEnter();
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/Boutique/Group_580.webp" className="Bg" />
								<div className="Name middle" style={{ textAlign: "center" }}>
									PREMIUM <span>+</span>
								</div>
							</div>
							<div
								className={`Element  ${selectedElement == 2 ? "active" : ""}`}
								onClick={() => {
									isDev
										? window.postMessage({ type: "openWebview", data: { name: "BoutiqueVehicules" } }, "*")
										: postAsync("BoutiqueCategory", { button: "VehiculesBoutique", sex });
									playBoutiqueEnter();
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/Boutique/vah.webp" className="Bg" />
								<div className="Name" style={{ textAlign: "center" }}>
									VEHICULES
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* BOUTIQUE CUSTOM */}

			{show === "customBoutique" && (
				<div className="Custom A-FadeIn">
					<BoutiqueHeader data={data} server={SERVER} />
					<div className="MainContent">
						<div className="NewBoutique">
							<div className="Text">
								Livraison en <p className="Green">48h</p>
							</div>
							<div className="Timer">{time}</div>
						</div>
						<div className="Title">
							<b>BOUTIQUE</b> CUSTOM
						</div>
						<div className="Category">
							<span
								className={sex === 0 ? "Selected" : ""}
								onClick={() => {
									setSex(0);
									playBoutiqueEnter();
								}}>
								Homme
							</span>
							<span
								className={sex === 1 ? "Selected" : ""}
								onClick={() => {
									setSex(1);
									playBoutiqueEnter();
								}}>
								Femme
							</span>
						</div>
						<div className="Nav">
							<div className="Left">
								<div
									className={`Element ${selectedElement == 0 ? "active" : ""}`}
									onClick={() => {
										postAsync("BoutiqueCategory", { button: "CustomVetements", sex });
										playBoutiqueEnter();
									}}>
									<img src={`https://cdn.sacul.cloud/v2/vision-cdn/Boutique/vet-cu_${sex}.webp`} className="Bg" />
									<div className="Name Lg" style={{ textAlign: "right" }}>
										VETEMENTS
									</div>
									<div className="SubName Lg" style={{ textAlign: "right" }}>
										CUSTOM
									</div>
								</div>
								<div
									className={`Element ${selectedElement == 1 ? "active" : ""}`}
									onClick={() => {
										//postAsync("BoutiqueCategory", { button: "CustomBijoux", sex });
										//playBoutiqueEnter();
									}}>
									<img src={`https://cdn.sacul.cloud/v2/vision-cdn/Boutique/bij-cu_${sex}.webp`} className="Bg" />
									<div className="Name Lg" style={{ textAlign: "right" }}>
										BIJOUX
									</div>
									<div className="SubName Lg" style={{ textAlign: "right" }}>
										CUSTOM
									</div>
									<div className="AvailableSoon">Bientôt disponible</div>
								</div>
							</div>
							<div className="Center">
								<div
									className={`Element Masques ${selectedElement == 2 ? "active" : ""}`}
									onClick={() => {
										postAsync("BoutiqueCategory", { button: "CustomMasque", sex });
										playBoutiqueEnter();
									}}>
									<img src={`https://cdn.sacul.cloud/v2/vision-cdn/Boutique/mas_${sex}.webp`} className="Bg" />
									<div className="bottom-right">
										<div className="Name" style={{ textAlign: "right" }}>
											MASQUE
										</div>
										<div className="SubName" style={{ textAlign: "right" }}>
											CUSTOM
										</div>
									</div>
								</div>
								<div
									className={`Element Tatou ${selectedElement == 3 ? "active" : ""}`}
									onClick={() => {
										//postAsync("BoutiqueCategory", { button: "CustomTatouage", sex });
										//playBoutiqueEnter();
									}}>
									<img src={`https://cdn.sacul.cloud/v2/vision-cdn/Boutique/tat_sex.webp`} className="Bg" />
									<div className="bottom-left">
										<p className="SubName" style={{ textAlign: "left" }}>
											CUSTOM
										</p>
										<p className="Name" style={{ textAlign: "left" }}>
											TATOUAGES
										</p>
									</div>
									<div className="AvailableSoon top">Bientôt disponible</div>
								</div>
							</div>
							<div className="Right">
								<div
									className={`Element ${selectedElement == 4 ? "active" : ""}`}
									style={{
										width: 408,
										height: 441,
									}}
									onClick={() => {
										//postAsync("BoutiqueCategory", { button: "CustomVehicules", sex });
										//playBoutiqueEnter();
									}}>
									<img src={`https://cdn.sacul.cloud/v2/vision-cdn/Boutique/voit-cu_${sex}.webp`} className="Bg" />
									<div className="Name" style={{ textAlign: "right" }}>
										VÉHICULES
									</div>
									<div className="SubName" style={{ textAlign: "right" }}>
										CUSTOM
									</div>
									<div className="AvailableSoon">Bientôt disponible</div>
								</div>
								<div
									className={`Element ${selectedElement == 5 ? "active" : ""}`}
									style={{
										width: 408,
										height: 170,
									}}
									onClick={() => {
										setShow("addonBoutique");
										playBoutiqueLeave();
									}}>
									<img src={`https://cdn.sacul.cloud/v2/vision-cdn/Boutique/boutique.webp`} className="Bg" />
									<div className="Name" style={{ textAlign: "right" }}>
										BOUTIQUE
									</div>
									<div className="SubName" style={{ textAlign: "right" }}>
										ADDONS
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BoutiqueFA;
