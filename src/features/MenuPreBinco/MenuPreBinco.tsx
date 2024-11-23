import "./style.scss";

import React, { useContext, useState } from "react";

import Button from "../../components/UI/Button/Buttton";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuPreBinco: React.FC = () => {
	const context = useContext(GlobalContext);
	const [show, setShow] = useState(context.data?.forceCategory ? "premium" : "main");
	const [createName, setCreateName] = useState("");

	useExitKeys();

	useBackspaceKey(() => {
		// If show is main, exit
		if (show !== "main") {
			// If there is no input focused
			if (!document.querySelector("input:focus")) {
				setShow("main");
			}
		} else {
			postAsync("closePreBinco");
		}
	});

	const data_item = {
		headerIcon: "https://cdn.sacul.cloud/v2/vision-cdn/icons/market-cart.webp",
		headerIconName: "Binco Homme",
		isCreatePremium: false,
		isCreateDisabled: false,
		hidePremium: true,
		isPremium: false,
		sex: "Homme", // Homme / Femme / Ped
	};
	const data: any | null = isDev ? data_item : context.data;

	return (
		<div className="MenuPreBinco">
			{show === "main" && (
				<div className="VisionMenu" style={{ width: 485, height: "fit-content" }}>
					<div className="VisionMenu-header undefined">
						<img className="VisionMenu-headerImage" src="https://cdn.sacul.cloud/v2/vision-cdn/headers/binco.webp" />
						<div className="VisionMenu-boutique">
							<img src={data.headerIcon} />
							<span>{data.headerIconName}</span>
						</div>
					</div>
					<div className="VisionMenu-listContainer overrideBinco" style={{ maxHeight: 480, minHeight: 480 }}>
						<div className="VisionMenu-buttonElementContainer">
							<div
								className="VisionMenu-buttonElement coverBackground big"
								style={{
									backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/vetement.webp)",
									...(data?.hidePremium ? { width: 400, backgroundPosition: "center" } : {}),
								}}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "vetement" })}>
								<div className="Name">VÊTEMENTS</div>
								<div className="SubName">CATALOGUE</div>
							</div>
							{!data?.hidePremium && (
								<div
									className="VisionMenu-buttonElement coverBackground big"
									style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/boutique.webp)" }}
									onClick={() => setShow("premium")}>
									<div className="Name">BOUTIQUE</div>
									<div className="SubName">EXCLUSIF</div>
								</div>
							)}
							<div
								className="VisionMenu-buttonElement coverBackground small"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/full.webp)" }}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "tenues" })}>
								<div className="Name">TENUES COMPLÈTES</div>
								<div className="SubName">PRÊT À PORTER</div>
							</div>
							<div
								className="VisionMenu-buttonElement coverBackground small"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/create.webp)" }}
								onClick={() => setShow("create")}>
								<div className="Name">CRÉER UNE TENUE</div>
								<div className="SubName">ITEM</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{show === "premium" && data?.sex === "Homme" && (
				<div className="VisionMenu Premium" style={{ width: 485, height: "fit-content" }}>
					<div className="VisionMenu-header undefined">
						<img className="VisionMenu-headerImage" src="https://cdn.sacul.cloud/v2/vision-cdn/headers/binco.webp" />
						<div className="VisionMenu-boutique">
							<span>Vêtements Premium</span>
						</div>
					</div>
					<div className="VisionMenu-listContainer overrideBinco" style={{ maxHeight: 460, minHeight: 460, overflow: "auto" }}>
						<div className="VisionMenu-buttonElementContainer">
							<div
								className="VisionMenu-buttonElement coverBackground full"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/Homme/maillot.webp)" }}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "premium-maillots" })}>
								<div className="Name">MAILLOTS</div>
								<div className="SubName">BASKETBALL</div>
							</div>
							<div
								className="VisionMenu-buttonElement coverBackground full"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/Homme/shirt.webp)" }}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "premium-shirts" })}>
								<div className="Name">T-SHIRT</div>
							</div>
							<div
								className="VisionMenu-buttonElement coverBackground full"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/Homme/pulls.webp)" }}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "premium-pulls" })}>
								<div className="Name">PULLS</div>
							</div>
							<div
								className="VisionMenu-buttonElement coverBackground full"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/Homme/sweat.webp)" }}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "premium-sweats" })}>
								<div className="Name">SWEAT</div>
							</div>
							<div
								className="VisionMenu-buttonElement coverBackground full"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/Homme/polo.webp)" }}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "premium-polos" })}>
								<div className="Name">POLO</div>
							</div>
							<div
								className="VisionMenu-buttonElement coverBackground full"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/Homme/chemise.webp)" }}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "premium-chemises" })}>
								<div className="Name">CHEMISE</div>
							</div>
							<div
								className="VisionMenu-buttonElement coverBackground full"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/Homme/chapeau.webp)" }}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "premium-chapeaux" })}>
								<div className="Name">CHAPEAUX</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{show === "premium" && data?.sex === "Femme" && (
				<div className="VisionMenu Premium" style={{ width: 485, height: "fit-content" }}>
					<div className="VisionMenu-header undefined">
						<img className="VisionMenu-headerImage" src="https://cdn.sacul.cloud/v2/vision-cdn/headers/binco.webp" />
						<div className="VisionMenu-boutique">
							<span>Vêtements Premium</span>
						</div>
					</div>
					<div className="VisionMenu-listContainer overrideBinco" style={{ maxHeight: 460, minHeight: 460, overflow: "auto" }}>
						<div className="VisionMenu-buttonElementContainer">
							<div
								className="VisionMenu-buttonElement coverBackground full"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/Femme/croptop.webp)" }}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "premium-croptop" })}>
								<div className="Name">CROP TOP</div>
							</div>
							<div
								className="VisionMenu-buttonElement coverBackground full"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/Femme/hauts.webp)" }}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "premium-hauts" })}>
								<div className="Name">HAUTS</div>
							</div>
							<div
								className="VisionMenu-buttonElement coverBackground full"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/Femme/jupes.webp)" }}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "premium-jupes" })}>
								<div className="Name">JUPES</div>
							</div>
							<div
								className="VisionMenu-buttonElement coverBackground full"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/Femme/robes.webp)" }}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "premium-robes" })}>
								<div className="Name">ROBES</div>
							</div>
							<div
								className="VisionMenu-buttonElement coverBackground full"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/Femme/pantalons.webp)" }}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "premium-pantalons" })}>
								<div className="Name">PANTALONS</div>
							</div>
							<div
								className="VisionMenu-buttonElement coverBackground full"
								style={{ backgroundImage: "url(https://cdn.sacul.cloud/v2/vision-cdn/MenuPreBinco/Femme/maillots.webp)" }}
								onClick={() => postAsync("BincoBoutiqueFA", { button: "premium-maillots" })}>
								<div className="Name">MAILLOTS</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{show === "create" && (
				<div className="VisionMenu Create" style={{ width: 485, height: "fit-content" }}>
					<div className="VisionMenu-header undefined">
						<img className="VisionMenu-headerImage" src="https://cdn.sacul.cloud/v2/vision-cdn/headers/binco.webp" />
						<div className="VisionMenu-boutique">
							<img src={data.headerIcon} />
							<span>{data.headerIconName}</span>
						</div>
					</div>
					<div className="CreateContainer">
						<div className="Span">NOM DE LA TENUE</div>
						<input type="text" value={createName} onChange={e => setCreateName(e?.currentTarget?.value)} />

						<div className="Title">
							Comment créer une tenue ?
							<img className="Img" src="https://cdn.sacul.cloud/v2/vision-cdn/icons/info.svg" />
						</div>
						<div className="Infos">
							<ul>
								<li>Prépare une tenue complète à sauvegarder</li>
								<li>Trouve un nom pour ta tenue</li>
								<li>Récupère l'item dans ton inventaire (100$)</li>
							</ul>
						</div>
						{data?.isCreatePremium && <div className="PremiumText">PREMIUM</div>}

						<Button
							color="green"
							disabled={!data?.isPremium || data?.isCreateDisabled || createName === ""}
							fontWeight={700}
							fontSize={12}
							label={data?.isPremium ? "100$" : "PREMIUM"}
							margin="20px auto"
							width={212}
							height={30}
							callback={() => {
								postAsync("BincoBoutiqueFA", { button: "create", name: createName });
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default MenuPreBinco;
