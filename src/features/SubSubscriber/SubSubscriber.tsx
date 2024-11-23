import "./style.scss";

import React, { useContext } from "react";

import { BoutiqueHeader } from "../../components/UI/BoutiqueHeader/BoutiqueHeader";
import { GlobalContext } from "../../app";
import { SERVER } from "../../config";
import { isDev } from "../../utils/isDev";
import { playOnHoverSound } from "../../utils/sounds";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";
import { useKey } from "../../hooks/useKey";

const SubSubscriber: React.FC<unknown> = () => {
	const context = useContext(GlobalContext);

	const features = [
		{
			name: "Prioritaire liste d'attente WL",
			icon: "https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/up_arrows.webp",
			iconSize: "40px",
			text: "Menu Connexion",
			text2: "Connexion instantanée au serveur",
			colors: ["#FF4141", "#FF1717"],
		},
		{
			name: "Accès de développement",
			icon: "https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/code.webp",
			iconSize: "50px",
			text: "Accès discord",
			text2: "Github et salons discord",
			colors: ["#8494EA", "#6876C3"],
		},
		{
			name: "Décoration d'extérieur",
			icon: "https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/plant.webp",
			iconSize: "40px",
			text: "Menu props",
			colors: ["#F67820", "#F03924"],
		},
		{
			name: "Double Personnage",
			icon: "https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/group.webp",
			iconSize: "40px",
			text: "Menu Personnage",
			text2: "Sous dossier",
			colors: ["#36C558", "#33963C"],
		},
		{
			name: "Incarner un Animal",
			icon: "https://cdn.sacul.cloud/v2/vision-cdn/SubPremium/icons/github.webp",
			iconSize: "60px",
			text: "Menu Animal",
			text2: "Sous dossier",
			colors: ["#6B57E3", "#7014F9"],
		},
	];

	const data = isDev
		? {
				features,
				premium: true,
				credit: 1000,
				unique_id: 69,
				permanent: true,
			}
		: context.data;

	useKey("Delete", () => {
		postAsync("backToBoutique");
	});

	useExitKeys();

	const background = data.permanent ? "backgroundPermanent" : "background";
	const url = data.permanent ? "https://visionboutique.tebex.io/package/6226836" : "https://visionboutique.tebex.io/package/5961390";

	return (
		<>
			<BoutiqueHeader data={data} server={SERVER} />
			<div className="TurnAroundButton">
				<div>
					{"RETOUR"}
					<div className="Button">{"SUPR"}</div>
				</div>
			</div>
			<section
				className="SubSubscriber"
				style={{ backgroundImage: `url("https://cdn.sacul.cloud/v2/vision-cdn/SubSubscriber/${background}.webp")` }}>
				<div className="Header">
					<div>
						<h1>{data.permanent ? "Permanent" : "Abonnement"}</h1>
						<p>{"Whitelist"}</p>
					</div>
					<div>
						<div className="buttonSubReminder">
							<p>{"Menu Subscriber"}</p>
							<p>{"F7"}</p>
						</div>
					</div>
				</div>
				<div className="Content">
					<div className="features">
						{features.map((feature: any, index: number) => (
							<div className="feature" key={index}>
								<div className="Icon">
									<img
										src={feature.icon}
										alt={feature.name}
										style={{ width: feature.iconSize ? feature.iconSize : "30px" }}
									/>
								</div>

								<div className="Text">
									<h3>{feature.name}</h3>
									<span>
										<p
											style={{
												background: `linear-gradient(180deg, ${feature.colors[0]} 0%, ${feature.colors[1]} 99.48%)`,
											}}>
											{feature.text}
										</p>
										<p>{feature.text2}</p>
									</span>
								</div>
							</div>
						))}
					</div>
					<div className="divider"></div>
					<div className="vehicle">
						<div className="card" onClick={() => postAsync("openCustomBoutique")}>
							<div className="icon">
								<img src={"https://cdn.sacul.cloud/v2/vision-cdn/SubSubscriber/vehicle.webp"} alt="" />
							</div>
							<div className="content">
								<div className="features">
									<div className="feature">
										<p style={{ background: "linear-gradient(180deg, #FFAD3D 0%, #FF7C03 99.48%)" }}>
											{"Concessionnaire"}
										</p>
									</div>
								</div>
								<div className="footer">
									<p>{"exclusifs"}</p>
									<h1>{"Vehicles"}</h1>
								</div>
							</div>
						</div>{" "}
					</div>
				</div>
				<div className="footer">
					<p className="retour" onClick={() => postAsync("backToBoutique")}>
						{"retour"}
					</p>
					<div className="divider"></div>
					<span>
						<button
							onClick={() => {
								playOnHoverSound();
								(window as any).invokeNative ? (window as any).invokeNative("openUrl", url) : window.open(url);
							}}>
							{data.permanent ? "Acheter" : "S'abonner"}
						</button>
						<p>
							{data.permanent ? "90€" : "15€"} {data.permanent ? "" : <span>{"/mois"}</span>}
						</p>
					</span>
				</div>
			</section>
		</>
	);
};

export default SubSubscriber;
