import "./style.scss";

import React, { useContext } from "react";

import { BoutiqueHeader } from "../../components/UI/BoutiqueHeader/BoutiqueHeader";
import { GlobalContext } from "../../app";
import { SERVER } from "../../config";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useExitKeys } from "../../hooks/useExitKeys";

const OrderConfirmation: React.FC = () => {
	const context = useContext(GlobalContext);

	const data = isDev
		? {
				premium: true,
				credit: 1000,
				price: 2500,
				unique_id: "69",
				showHelpText: "custom",
				item: {
					subscription: true,
					name: "Masque Cagoule",
					image: "https://cdn.discordapp.com/attachments/667855303840235531/1153355509546623026/image.webp",
					customFields: {
						Ecriture: "Gamingo",
						Numéro: "15",
					},
				},
			}
		: context.data;

	useBackspaceKey(() => {
		postAsync("cancelOrder");
	});

	useExitKeys();

	return (
		<>
			<BoutiqueHeader data={data} server={SERVER} />
			<section className="OrderConfirmation">
				<div className="Top">
					<span>
						<h1>{data.status ? (data.status === "validated" ? "C'est tout bon !" : "Oops...") : "Derniere etape..."}</h1>
						{data.status ? (
							data.status === "validated" ? (
								<p>Merci pour ta confiance</p>
							) : (
								<p>Achete des vcoins pour utiliser la boutique</p>
							)
						) : (
							""
						)}
					</span>
					{data.showHelpText ? (
						data.showHelpText === "premium" ? (
							<div>
								<p>Comment activer mon premium ?</p>
								<ul>
									<li>
										Ton abonnement
										<span style={{ color: "#FF97FB" }}>Premium</span> va être
										<span style={{ color: "#38DC66", fontWeight: "400" }}>actif</span> sur
										<span style={{ color: "#94A5FF" }}>Discord</span> et
										<span>In Game</span>
									</li>
									<li>
										Tu vas reçevoir un message
										<span style={{ color: "#94A5FF" }}>Discord</span> après ton
										<span style={{ color: "#38DC66", fontWeight: "400" }}>achat</span> regroupant les nouveaux
										<span style={{ color: "#38DC66" }}>avantages</span> et
										<span style={{ color: "#38DC66" }}>accès</span> dont tu disposes
										<span>In Game</span>
									</li>
									<li>
										En cas de problème, crée un Ticket au
										<span>bot Support</span>
										<span style={{ color: "#FFBE00" }}>Boutique</span>
									</li>
								</ul>
							</div>
						) : (
							<div>
								<p>Comment récupérer mon item ?</p>
								<ul>
									<li>
										Un ticket
										<span style={{ color: "#94A5FF" }}>Discord</span> va être automatiquement ouvert après ton
										<span style={{ color: "#38DC66", fontWeight: "400" }}>achat</span>
									</li>
									<li>
										D'ici <span>48H</span> tu reçevras une première version de ton
										<span style={{ color: "#38DC66", fontWeight: "400" }}>article</span> par message
									</li>
									<li>
										Si l'item te plait, il sera directement envoyé dans ton
										<span>inventaire</span> en
										<span>item permanent</span>
										<span style={{ fontSize: "15px", fontStyle: "italic", opacity: 0.6, fontWeight: 300 }}>
											non échangeable avec les autres joueurs
										</span>
									</li>
								</ul>
							</div>
						)
					) : data.orderId ? (
						<div className="orderId">
							<p>Numéro de commande</p>
							<p>{data.orderId}</p>
						</div>
					) : (
						""
					)}
				</div>
				<div className="Center">
					{data.status ? (
						<>
							<div
								onClick={() => {
									if (data.status === "validated") {
										postAsync("backToBoutique");
									} else {
										postAsync("buyVCoins");
									}
								}}
								className={`statusInfo ${data.status}`}></div>
						</>
					) : data.item.subscription ? (
						<>
							<img src={"https://cdn.sacul.cloud/v2/vision-cdn/OrderConfirmation/card.webp"} />
						</>
					) : (
						<>
							<div className="recapCard">
								<span>
									<img src={data.item.image} />
									<p>Custom</p>
								</span>
								<span>
									<h2>{data.item.name}</h2>
									{Object.keys(data.item.customFields).map((key, index) => (
										<fieldset key={index}>
											<p>{key}</p>
											<input type="text" value={data.item.customFields[key]} readOnly disabled />
										</fieldset>
									))}
									<span>
										<p>Item</p>
										<p>Custom</p>
									</span>
								</span>
							</div>
						</>
					)}
				</div>
				<div className="Bottom">
					{data.status ? (
						<>
							<div>
								<h3 className={data.status}>
									{data.status === "validated" ? "Achat effectué avec succès" : "Échec de la transaction"}
								</h3>
								<p>
									{data.status === "validated"
										? "Consulte tes messages discord pour avoir le suivi de ta commande"
										: "Crédits insuffisants"}
								</p>
							</div>
						</>
					) : (
						<>
							<span onClick={() => postAsync("cancelOrder")}>Retour</span>
							<button onClick={() => postAsync("validateOrder")}>Confirmer L'achat</button>
							<p>{data.price}</p>
							<span></span>
						</>
					)}
				</div>
			</section>
		</>
	);
};

export default OrderConfirmation;
