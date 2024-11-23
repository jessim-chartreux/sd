import "./style.scss";

import React, { useContext, useState } from "react";

import { BoutiqueHeader } from "../../components/UI/BoutiqueHeader/BoutiqueHeader";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { playBoutiqueEnter } from "../../utils/sounds";
import { postAsync } from "../../utils/postAsync";
import { useEnterKey } from "../../hooks/useEnterKey";
import { useExitKeys } from "../../hooks/useExitKeys";
import { useKey } from "../../hooks/useKey";

const MenuEscapeWL: React.FC = () => {
	const [isBoutiqueHovered, setIsBoutiqueHovered] = useState(false);
	const [isSupportOpen, setIsSupportOpen] = useState(false);
	const [report, setReport] = useState("");
	const context = useContext(GlobalContext);

	const keys: { [key: string]: string } = {
		openMap: "m",
		openBoutique: "b",
		openSupport: "s",
		openReglages: "r",
		exit: "Échap",
		sendReport: "Entrée",
	};

	const handleMouseIn = () => {
		setIsBoutiqueHovered(true);
	};

	const handleMouseOut = () => {
		setIsBoutiqueHovered(false);
	};

	const handleMap = () => {
		postAsync("openMap");
		playBoutiqueEnter();
	};

	const handleBoutique = () => {
		postAsync("openBoutique");
		playBoutiqueEnter();
	};

	const handleSupport = () => {
		if (isSupportOpen) {
			if (report.trim().length > 0) postAsync("sendReport", { report: report.trim() });
			setIsSupportOpen(false);
			setReport("");
		} else setIsSupportOpen(true);
	};

	const handleOptions = () => {
		postAsync("openReglages");
		playBoutiqueEnter();
	};

	useKey("s", () => {
		if (!isSupportOpen) handleSupport();
	});

	useKey("b", () => {
		if (!isSupportOpen) handleBoutique();
	});

	useKey("r", () => {
		if (!isSupportOpen) handleOptions();
	});

	useKey("m", () => {
		if (!isSupportOpen) handleMap();
	});

	useEnterKey(() => {
		if (isSupportOpen) {
			handleSupport();
		}
	});

	useExitKeys();

	const data = isDev
		? {
				premium: true,
				premiumEndDate: 1709691273,
				credit: 1000,
				unique_id: "69",
			}
		: context.data;

	return (
		<div className="MenuEscape" style={{ textTransform: "uppercase" }}>
			<BoutiqueHeader data={data} server="WL" />
			<div className="TurnAroundButton">
				<div>
					Quitter le menu<div className="Button">{keys["exit"]}</div>
				</div>
			</div>
			<div className="Container">
				<div className="Map" onClick={handleMap}>
					<div className="TurnAroundButton">
						<div>
							Carte de los santos<div className="Button">{keys["openMap"]}</div>
						</div>
					</div>
				</div>
				<div className="Right">
					<div className="Boutique" onMouseEnter={handleMouseIn} onMouseLeave={handleMouseOut} onClick={handleBoutique} />
					<div className="BoutiqueBg" />
					<div
						style={{ background: "none", pointerEvents: "none" }}
						className={`BoutiqueButton ${isBoutiqueHovered ? "upScale" : ""}`}>
						<div className="TurnAroundButton" style={{ right: 0, left: "auto" }}>
							<div>
								Boutique en ligne<div className="Button">{keys["openBoutique"]}</div>
							</div>
						</div>
					</div>
					<div className="Bottom">
						<div className="Reglages" onClick={handleOptions}>
							{/* Je sais pas exactement pourquoi, mais sans le marginBottom, ce bouton est plus bas que les autres */}
							<div className="TurnAroundButton" style={{ marginBottom: "5px" }}>
								<div>
									Réglages<div className="Button">{keys["openReglages"]}</div>
								</div>
							</div>
						</div>
						{isSupportOpen ? (
							<div className="SupportReport" onClick={handleSupport}>
								<h2>
									<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/logo-v.webp" />
									Motif du report
								</h2>
								<textarea
									value={report}
									onChange={e => setReport(e.target.value)}
									onClick={e => e.stopPropagation()}
									placeholder="Description du problème"
								/>
								<div>
									<div>Valider</div>
									<div className="Button">{keys["sendReport"]}</div>
								</div>
							</div>
						) : (
							<div className="Support" onClick={handleSupport}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/logo-v.webp" />
								<div className="TurnAroundButton" style={{ right: 0, left: "auto" }}>
									<div>
										Support<div className="Button">{keys["openSupport"]}</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MenuEscapeWL;
