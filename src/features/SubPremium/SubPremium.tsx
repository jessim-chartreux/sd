import "./style.scss";

import React, { useContext } from "react";

import { BoutiqueHeader } from "../../components/UI/BoutiqueHeader/BoutiqueHeader";
import { GlobalContext } from "../../app";
import { SERVER } from "../../config";
import { changeWebview } from "../../hooks/useChangeWebview";
import { isDev } from "../../utils/isDev";
import { playOnHoverSound } from "../../utils/sounds";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";
import { useKey } from "../../hooks/useKey";

const SubPremium: React.FC<any> = () => {
	const context = useContext(GlobalContext);

	const features = [
		{
			name: "Salaire x 1",
			icon: "https://cdn.discordapp.com/attachments/667855303840235531/1150267461120299038/image.webp",
			text: "Menu Binco",
			colors: ["#F90", "#FF5C00"],
		},
		{
			name: "Animal de compagnie",
			icon: "https://cdn.discordapp.com/attachments/599646164526301195/1159290521093685358/ANIMAL_2.webp",
			text: "Menu Animal",
			colors: ["#CA56BE", "#EC66AE"],
		},
		{
			name: "Décoration d'intérieur",
			icon: "https://cdn.discordapp.com/attachments/667855303840235531/1150272365293486152/image.webp",
			text: "Menu Props",
			colors: ["#4F6BD6", "#389FFE"],
		},
		{
			name: "Plaque d'immatriculation",
			icon: "https://cdn.discordapp.com/attachments/667855303840235531/1150272310889168969/image.webp",
			text: "Menu Custom",
			colors: ["#6BCB3E", "#00A424"],
		},
		{
			name: "Double personnage",
			icon: "https://cdn.discordapp.com/attachments/667855303840235531/1150273501803057222/dp_1.webp",
			text: "Menu /Personnage",
			colors: ["#FF4545", "#F00"],
		},
		{
			name: "Prioritaire liste d'attente",
			icon: "https://cdn.discordapp.com/attachments/667855303840235531/1150272459912794212/image.webp",
			text: "Menu Connexion",
			colors: ["#FF005F", "#F47070"],
		},
	];

	const data = isDev
		? {
				features,
				premium: 1,
				credit: 1000,
				unique_id: "69",
			}
		: context.data;

	useKey("Delete", () => {
		postAsync("backToBoutique");
	});

	useExitKeys();

	return (
		<>
			<BoutiqueHeader data={data} server={SERVER} />
			<section className="SubPremium">
				<div className="header">
					<div className="left">
						<h1>Premium</h1>
						<p>Avantages</p>
					</div>
					<div className="right">
						<h1>Accès</h1>
						<p>Catalogue</p>
					</div>
				</div>
				<div className="content">
					<div className="features">
						<div className="left">
							<div className="feature">
								<div className="icon">
									<img src={"https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/dollars.webp"} alt="" />
								</div>
								<div className="content">
									<h3>
										Salaire X <b>1,25</b>
									</h3>
									<p style={{ background: "linear-gradient(180deg, #FBC504 0%, #FB9D04 100%)" }}>Prime D'activité</p>
								</div>
							</div>
							<div className="feature">
								<div className="icon">
									<img src={"https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/players.webp"} alt="" />
								</div>
								<div className="content">
									<h3>Double Personnage</h3>
									<p style={{ background: "linear-gradient(180deg, #FF4545 0%, #F00 100%)" }}>Menu Personnage</p>
								</div>
							</div>
							<div className="feature">
								<div className="icon">
									<img src={"https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/chairs.webp"} alt="" />
								</div>
								<div className="content">
									<h3>Décoration D'extérieur</h3>
									<p style={{ background: "linear-gradient(180deg, #FB9719 0%, #FB6C16 100%)" }}>Menu Props</p>
								</div>
							</div>
							<div className="feature">
								<div className="icon">
									<img src={"https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/ped.webp"} alt="" />
								</div>
								<div className="content">
									<h3>Personnage Peds GTA V</h3>
									<p style={{ background: "linear-gradient(180deg, #5AA3F2 0%, #6967DD 0.01%, #7000FF 100%)" }}>
										Création de Personnage
									</p>
								</div>
							</div>
							<div className="feature">
								<div className="icon">
									<img src={"https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/car.webp"} alt="" />
								</div>
								<div className="content">
									<h3>3 Places Vehicules</h3>
									<p style={{ background: "linear-gradient(180deg, #FF3E3E 0%, #FF0C0C 100%)" }}>Garage Public</p>
								</div>
							</div>
							<div className="feature">
								<div className="icon">
									<img src={"https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/up_arrows.webp"} alt="" />
								</div>
								<div className="content">
									<h3>Connexion Prioritaire</h3>
									<p style={{ background: "linear-gradient(180deg, #FF005F 0%, #F09 100%)" }}>Menu Connexion</p>
								</div>
							</div>
						</div>
						<div className="right">
							<div className="feature">
								<div className="icon">
									<img
										src={"https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/red_mark.webp"}
										alt=""
										style={{ width: "35px" }}
									/>
								</div>
								<div className="content">
									<h3>Aucune Limite Farm</h3>
									<p style={{ background: "linear-gradient(180deg, #FD0A1D 0%, #B00101 98.44%)" }}>Métier Farm</p>
								</div>
							</div>
							<div className="feature">
								<div className="icon">
									<img src={"https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/dogs.webp"} alt="" />
								</div>
								<div className="content">
									<h3>Animal de Compagnie</h3>
									<p style={{ background: "linear-gradient(180deg, #B0077E 0%, #DC1E95 100%)" }}>Menu K9</p>
								</div>
							</div>
							<div className="feature">
								<div className="icon">
									<img src={"https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/chairs.webp"} alt="" />
								</div>
								<div className="content">
									<h3>Décoration d'intéreur</h3>
									<p style={{ background: "linear-gradient(180deg, #89A1FF 0%, #0085FF 100%)" }}>Menu Deco</p>
								</div>
							</div>
							<div className="feature">
								<div className="icon">
									<img src={"https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/fingerprint.webp"} alt="" />
								</div>
								<div className="content">
									<h3>Chirurgie Esthétique</h3>
									<p style={{ background: "linear-gradient(180deg, #33C09E 0%, #00906E 100%)" }}>Traits de Caractères</p>
								</div>
							</div>
							<div className="feature">
								<div className="icon">
									<img src={"https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/car_plate.webp"} alt="" />
								</div>
								<div className="content">
									<h3>Plaque d'immatriculation</h3>
									<p style={{ background: "linear-gradient(180deg, #066BC9 0%, #043D80 100%)" }}>Menu Custom</p>
								</div>
							</div>
							<div className="feature">
								<div className="icon">
									<img src={"https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/shirts.webp"} alt="" />
								</div>
								<div className="content">
									<h3>Sauvegarder vos tenues</h3>
									<p style={{ background: "linear-gradient(180deg, #F90 0%, #FF5C00 99.48%)" }}>Menu Binco</p>
								</div>
							</div>
						</div>
					</div>
					<div className="cards">
						<div className="card" onClick={() => postAsync("openCustomBoutique")}>
							<div className="icon">
								<img src={"https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/clothes.webp"} alt="" />
							</div>
							<div className="content">
								<div className="features">
									<div className="feature">
										<h3>Vetements</h3>
										<p style={{ background: "linear-gradient(180deg, #F90 0%, #FF5C00 99.48%)" }}>Binco</p>
									</div>
									<div className="feature">
										<h3>Bijoux</h3>
										<p style={{ background: "linear-gradient(180deg, #3D3D3D 0%, #101010 99.48%)" }}>Vangelico</p>
									</div>
								</div>
								<div className="footer">
									<p>Accès</p>
									<h1>Premium</h1>
								</div>
							</div>
						</div>
						<div className="card" onClick={() => changeWebview("BoutiqueVehicules")}>
							<div className="icon">
								<img src={"https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/cars.webp"} alt="" />
							</div>
							<div className="content">
								<div className="features">
									<div className="feature">
										<h3>Vehicules</h3>
										<p style={{ background: "linear-gradient(180deg, #8B46FF 0%, #7444FF 99.99%)" }}>Concessionnaire</p>
									</div>
									<div className="feature">
										<h3>Armes</h3>
										<p style={{ background: "linear-gradient(180deg, #CA0E13 0%, #800707 99.48%)" }}>Ammu-Nation</p>
									</div>
								</div>
								<div className="footer">
									<p>Accès</p>
									<h1>Premium</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="footer">
					<p className="retour" onClick={() => postAsync("backToBoutique")}>
						retour
					</p>
					<span>
						<button
							onClick={() => {
								playOnHoverSound();
								(window as any).invokeNative
									? (window as any).invokeNative("openUrl", "https://visionboutique.tebex.io/package/5961390")
									: window.open("https://visionboutique.tebex.io/package/5961390");
							}}>
							S'abonner
						</button>
						<p>
							15€ <span>/mois</span>
						</p>
					</span>
				</div>
			</section>
		</>
	);
};

export default SubPremium;
