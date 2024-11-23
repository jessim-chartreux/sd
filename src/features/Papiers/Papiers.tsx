import "./style.scss";

import React, { useContext, useState } from "react";

import { GlobalContext } from "../../app";
import dayjs from "dayjs";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const Papiers: React.FC = () => {
	const context = useContext(GlobalContext);
	useExitKeys();
	const data: any = isDev
		? {
				// type: 'convocation',
				// type: 'deposition',
				// type: 'contrat',
				// type: "policeBadge",
				type: "PapierPPA",
				// type: "certificat",
				callbackName: "core:deposerPapiers",
				// state: 'creation',
				state: "toBeSigned",
				// state: 'signed',
				signature1: "Simon Papamarkos",
				signature2: "Markuss Person",
				values: {
					player1: "Exemple joueur",
					player2: "Joueur exemple",
					treatment: "- exemple soin\n- etc...\n- etc",
					ata: "Exemple",
					receipt: true,
					charge: "azeazeaze azeaze\nzae aze\naze\n azeazeaze",
					nature: "zaeaze \nazeaze \nazeaze",
					informations: "bla bla convoqué t'es mort rip",

					service: "lspd", // lspd, usss, lssd
					matricule: "07",
					grade: "Sergeant",
					divisions: "Traffic division, Metro Platoon, K9 Platoon, Air Support Division, Los Santos Police Academy",

					name: "John Coleman",
					photo: "", // base64
					residence: "Vinewood Hills",
					address: "Los Santos, San Andreas",
					occupation: "Policeman",
					business: "Los Santos Police Department",
					issuer: "Aaron Turner",
				},
				overrideImage: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
			}
		: context.data;

	const [stockage, setStockage] = useState(data?.values ?? {});

	const updateStockage = (type: string, value: any) => {
		const _stockage = { ...stockage };
		_stockage[type] = value;
		setStockage(_stockage);
	};

	const date = data?.date ?? dayjs().format("DD.MM.YYYY");

	const getBottom = callback => {
		let signType1, signType2;
		if (data.type === "contrat" || data.type === "facture") {
			signType1 = "SIGNATURE DU VENDEUR";
			signType2 = "SIGNATURE DE L'ACHETEUR";
		}
		if (data.type === "factureToEntreprise") {
			signType1 = "SIGNATURE DU VENDEUR";
			signType2 = "SIGNATURE DE L'ENTREPRISE";
		}
		if (data.type === "deposition" || data.type === "convocation") {
			signType1 = "MATRICULE DE L'AGENT";
			signType2 = "SIGNATURE DE L'AGENT";
		}
		if (data.type === "certificat") {
			signType1 = "SIGNATURE DU MÉDECIN";
			signType2 = "SIGNATURE DU PATIENT";
		}
		if (data.type === "DemandeCI") {
			signType1 = "SIGNATURE DE L'AGENT";
			signType2 = "SIGNATURE DU DEMANDEUR";
		}
		if (data.type === "policeBadge") {
			signType1 = "SIGNATURE SUPERVISOR";
			signType2 = "SIGNATURE DE L'AGENT";
		}
		if (data.type === "PapierPPA") {
			signType1 = "SIGNATURE DE L'EMETTEUR";
			signType2 = "SIGNATURE DE DEMANDEUR";
		}

		return (
			<>
				{data.type === "convocation" || data.type === "deposition" ? (
					<div className="Signatures">
						<div className="Signature">
							<div className="Colored">{data.state !== "creation" ? data?.signature1 : ""}</div>
							<div className="Bar"></div>
							<div className="Signator">{signType1}</div>
						</div>
					</div>
				) : (
					<div className="Signatures">
						<div className="Signature">
							<div className="Colored">{data.state !== "creation" ? data?.signature1 : ""}</div>
							<div className="Bar"></div>
							<div className="Signator">{signType1}</div>
						</div>
						<div className="Signature">
							<div className="Colored">{data.state === "signed" ? data?.signature2 : ""}</div>
							<div className="Bar"></div>
							<div className="Signator">{signType2}</div>
						</div>
					</div>
				)}

				<div
					className="Submit"
					style={
						data.state === "signed"
							? {
									opacity: 0,
								}
							: {}
					}>
					<div className={"Button " + (data.state !== "signed" ? "" : "Disabled")} onClick={callback}>
						SIGNER
					</div>
					<div className="Receipt">
						RECU :
						<label htmlFor={"receipt" + (data.state !== "creation" ? "ReadOnly" : "")}>
							<div className={"Label "}>
								<img
									src={`https://cdn.sacul.cloud/v2/vision-cdn/Papiers/${stockage["receipt"] ? "check" : "cross"}.webp`}
								/>
							</div>
						</label>
						<input
							id="receipt"
							type="checkbox"
							checked={stockage?.["receipt"] ?? false}
							onChange={ev => updateStockage("receipt", ev.currentTarget.checked)}
						/>
					</div>
				</div>
			</>
		);
	};

	const createInput = (value, callback, forceTextarea = false, required = false) => {
		if (data.state !== "creation") {
			if (forceTextarea)
				return (
					<div
						className="Span"
						style={{
							whiteSpace: "pre-wrap",
						}}>
						{value}
					</div>
				);
			return <span className="Span">{value}</span>;
		}
		if (forceTextarea) return <textarea value={value} onChange={callback} required={required} />;
		return <input type="text" value={value} onChange={callback} required={required} />;
	};

	return (
		<div className={"Papiers " + data.type + " " + data.state}>
			{data.type === "factureToEntreprise" && (
				<>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}></div>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}></div>
					<div
						className="Content A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}>
						<div className="Title">
							FACTURE
							{createInput(stockage?.["name"] ?? "", ev => updateStockage("name", ev.currentTarget.value))}
						</div>

						<div className="Date">{date}</div>

						<div className="Main">
							Facture rédigée par
							{createInput(stockage?.["player1"] ?? "", ev => updateStockage("player1", ev.currentTarget.value))}
							adressée à la société
							{createInput(stockage?.["player2"] ?? "", ev => updateStockage("player2", ev.currentTarget.value))}
							pour :{createInput(stockage?.["info"] ?? "", ev => updateStockage("info", ev.currentTarget.value))}
						</div>

						<div className="Price">
							Le montant de cette facture est de :
							{createInput(stockage?.["value"] ?? "", ev => updateStockage("value", ev.currentTarget.value))}
						</div>

						{getBottom(() => {
							postAsync("Papiers", {
								type: data.type,
								values: stockage,
								state: data.state,
								image: data.overrideImage,
								signature1: data.signature1,
								signature2: data.signature2,
							});
						})}
					</div>
				</>
			)}
			{data.type === "facture" && (
				<>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}></div>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}></div>
					<div
						className="Content A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}>
						<div className="Title">
							FACTURE
							{createInput(stockage?.["name"] ?? "", ev => updateStockage("name", ev.currentTarget.value))}
						</div>

						<div className="Date">{date}</div>

						<div className="Main">
							Facture rédigée par
							{createInput(stockage?.["player1"] ?? "", ev => updateStockage("player1", ev.currentTarget.value))}
							adressée à{createInput(stockage?.["player2"] ?? "", ev => updateStockage("player2", ev.currentTarget.value))}
							pour :{createInput(stockage?.["info"] ?? "", ev => updateStockage("info", ev.currentTarget.value))}
						</div>

						<div className="Price">
							Le montant de cette facture est de :
							{createInput(stockage?.["value"] ?? "", ev => updateStockage("value", ev.currentTarget.value))}
						</div>

						{getBottom(() => {
							postAsync("Papiers", {
								type: data.type,
								values: stockage,
								state: data.state,
								image: data.overrideImage,
								signature1: data.signature1,
								signature2: data.signature2,
							});
						})}
					</div>
				</>
			)}
			{data.type === "contrat" && (
				<>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}></div>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}></div>
					<div
						className="Content A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}>
						<div className="Title">
							CONTRAT
							{createInput(stockage?.["name"] ?? "", ev => updateStockage("name", ev.currentTarget.value))}
						</div>

						<div className="Date">{date}</div>

						<div className="Main">
							Contrat rédigé par
							{createInput(stockage?.["player1"] ?? "", ev => updateStockage("player1", ev.currentTarget.value))}
							adressé à{createInput(stockage?.["player2"] ?? "", ev => updateStockage("player2", ev.currentTarget.value))}
							pour :{createInput(stockage?.["info"] ?? "", ev => updateStockage("info", ev.currentTarget.value))}
						</div>

						<div className="Nature">
							Nature du contrat
							{createInput(stockage?.["value"] ?? "", ev => updateStockage("value", ev.currentTarget.value), true)}
						</div>

						{getBottom(() => {
							postAsync("Papiers", {
								type: data.type,
								values: stockage,
								state: data.state,
								image: data.overrideImage,
								signature1: data.signature1,
								signature2: data.signature2,
							});
						})}
					</div>
				</>
			)}
			{data.type === "deposition" && (
				<>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/deposition.webp')`,
						}}></div>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/deposition.webp')`,
						}}></div>
					<div
						className="Content A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/deposition.webp')`,
						}}>
						<img src={data.overrideImage ?? "https://cdn.sacul.cloud/v2/vision-cdn/Papiers/LSPD.svg"} className="Logo"></img>
						<div className="Title">
							DÉPOSITION
							{createInput(stockage?.["name"] ?? "", ev => updateStockage("name", ev.currentTarget.value))}
						</div>

						<div className="Date">{date}</div>

						<div className="Main">
							Plainte contre :
							{createInput(stockage?.["player1"] ?? "", ev => updateStockage("player1", ev.currentTarget.value))}
							<br />
							<br />
							Déposée par :{createInput(stockage?.["player2"] ?? "", ev => updateStockage("player2", ev.currentTarget.value))}
							<br />
							<br />
							Nature des faits :
							{createInput(stockage?.["nature"] ?? "", ev => updateStockage("nature", ev.currentTarget.value), true)}
							<br />
							<br />
							Chef d&apos;inculpation :
							{createInput(stockage?.["charge"] ?? "", ev => updateStockage("charge", ev.currentTarget.value), true)}
						</div>

						{getBottom(() => {
							postAsync("Papiers", {
								type: data.type,
								values: stockage,
								state: data.state,
								image: data.overrideImage,
								signature1: data.signature1,
								signature2: data.signature2,
							});
						})}
					</div>
				</>
			)}
			{data.type === "certificat" && (
				<>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/certificat.webp')`,
						}}></div>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/certificat.webp')`,
						}}></div>
					<div
						className="Content A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/certificat.webp')`,
						}}>
						<img src={data.overrideImage ?? "https://cdn.sacul.cloud/v2/vision-cdn/Papiers/SAMS.svg"} className="Logo"></img>
						<div className="Title">
							CERTIFICAT MEDICAL
							<br />
							{createInput(stockage?.["name"] ?? "", ev => updateStockage("name", ev.currentTarget.value))}
						</div>

						<div className="Date">{date}</div>

						<div className="Main">
							Ordonnance rédigée par
							{createInput(stockage?.["player1"] ?? "", ev => updateStockage("player1", ev.currentTarget.value))}
							pour le traitement de
							{createInput(stockage?.["player2"] ?? "", ev => updateStockage("player2", ev.currentTarget.value))}
							.
							<br />
							<br />
							Soins préscrits :
							<br />
							{createInput(stockage?.["treatment"] ?? "", ev => updateStockage("treatment", ev.currentTarget.value), true)}
							<br />
							{data.state === "creation" && <br />}
							ATA :{createInput(stockage?.["ata"] ?? "", ev => updateStockage("ata", ev.currentTarget.value))}
						</div>

						{getBottom(() => {
							postAsync("Papiers", {
								type: data.type,
								values: stockage,
								state: data.state,
								image: data.overrideImage,
								signature1: data.signature1,
								signature2: data.signature2,
							});
						})}
					</div>
				</>
			)}
			{data.type === "convocation" && (
				<>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/deposition.webp')`,
						}}></div>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/deposition.webp')`,
						}}></div>
					<div
						className="Content A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/deposition.webp')`,
						}}>
						<img src={data.overrideImage ?? "https://cdn.sacul.cloud/v2/vision-cdn/Papiers/LSPD.svg"} className="Logo"></img>
						<div className="Title">
							CONVOCATION
							{createInput(stockage?.["name"] ?? "", ev => updateStockage("name", ev.currentTarget.value))}
						</div>

						<div className="Date">{date}</div>

						<div className="Main">
							<br />
							<br />
							Convoqué :{createInput(stockage?.["player1"] ?? "", ev => updateStockage("player2", ev.currentTarget.value))}
							<br />
							<br />
							Fait par :{createInput(stockage?.["player2"] ?? "", ev => updateStockage("nature", ev.currentTarget.value))}
							<br />
							<br />
							Informations :
							{createInput(
								stockage?.["informations"] ?? "",
								ev => updateStockage("informations", ev.currentTarget.value),
								true,
							)}
						</div>

						{getBottom(() => {
							postAsync("Papiers", {
								type: data.type,
								values: stockage,
								state: data.state,
								image: data.overrideImage,
								signature1: data.signature1,
								signature2: data.signature2,
							});
						})}
					</div>
				</>
			)}
			{
				/* Ajout par Zerkay : */

				data.type === "DemandeCI" && (
					<>
						<div
							className="Content Anim A-FadeIn"
							style={{
								backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
							}}></div>
						<div
							className="Content Anim A-FadeIn"
							style={{
								backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
							}}></div>
						<div
							className="Content A-FadeIn"
							style={{
								backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
							}}>
							<div className="Title">
								Demande
								{createInput(stockage?.["name"] ?? "", () => stockage?.["name"])}
							</div>

							<div className="Date">{date}</div>

							<div className="Main">
								Madame/Monsieur,<br></br>
								Je soussigné(e)
								{createInput(stockage?.["player"] ?? "", () => stockage?.["player"])}
								,né(e) le
								{createInput(stockage?.["datenaissance"] ?? "", () => stockage?.["datenaissance"])}à
								{createInput(stockage?.["lieuxnaissance"] ?? "", () => stockage?.["lieuxnaissance"])}
								sollicite par la présente la délivrance d&apos;une nouvelle carte d&apos;identité.
							</div>

							<div className="Price">
								Veuillez trouver ci-dessous les détails nécessaires pour compléter ma demande :<br></br>
								Poids :{createInput(stockage?.["poids"] ?? "", ev => updateStockage("poids", ev.currentTarget.value))}
								kg
								<br></br>
								Taille :{createInput(stockage?.["taille"] ?? "", ev => updateStockage("taille", ev.currentTarget.value))}
								cm <br></br>
								Couleur des yeux :
								{createInput(stockage?.["yeux"] ?? "", ev => updateStockage("yeux", ev.currentTarget.value))}
							</div>

							{getBottom(() => {
								postAsync("Papiers", {
									type: data.type,
									values: stockage,
									state: data.state,
									image: data.overrideImage,
									signature1: data.signature1,
									signature2: data.signature2,
								});
							})}
						</div>
					</>
				)
			}
			{data.type === "policeBadge" && (
				<>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}></div>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}></div>
					<div
						className="Content A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}>
						<img src={"https://cdn.sacul.cloud/v2/vision-cdn/Papiers/911.webp"} className="Logo"></img>
						<div className="Title">{"Badge de police"}</div>

						<div className="Date">{date}</div>

						<div className="Main">
							{"Matricule :"}
							{createInput(
								stockage?.["matricule"] ?? "",
								ev => updateStockage("matricule", ev.currentTarget.value),
								false,
								true,
							)}
							<br />
							<br />
							{"Nom prénom :"} {createInput(stockage?.["name"] ?? "", () => stockage?.["name"], false, true)}
							<br />
							<br />
							{"Grade :"}{" "}
							{createInput(stockage?.["grade"] ?? "", ev => updateStockage("grade", ev.currentTarget.value), false, true)}
							<br />
							<br />
							{"Division :"}
							{createInput(
								stockage?.["divisions"] ?? "",
								ev => updateStockage("divisions", ev.currentTarget.value),
								false,
								true,
							)}
						</div>

						{getBottom(() => {
							postAsync("Papiers", {
								type: data.type,
								values: stockage,
								state: data.state,
								image: data.overrideImage,
								signature1: data.signature1,
								signature2: data.signature2,
							});
						})}
					</div>
				</>
			)}
			{data.type === "PapierPPA" && (
				<>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}></div>
					<div
						className="Content Anim A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}></div>
					<div
						className="Content A-FadeIn"
						style={{
							backgroundImage: `url('https://cdn.sacul.cloud/v2/vision-cdn/Papiers/default.webp')`,
						}}>
						<img src={"https://cdn.sacul.cloud/v2/vision-cdn/Papiers/gouv.webp"} className="Logo" />
						<div className="Title">{"Création de la carte de PPA"}</div>

						<div className="Date">{date}</div>

						<div className="Main">
							{"Nom prénom :"} {createInput(stockage?.["name"] ?? "", () => stockage?.["name"])}
							<br />
							<br />
							{"Ville :"}{" "}
							{createInput(stockage?.["residence"] ?? "", ev => updateStockage("residence", ev.currentTarget.value))}
							<br />
							<br />
							{"Adresse :"}
							{createInput(stockage?.["address"] ?? "", ev => updateStockage("address", ev.currentTarget.value))}
							<br />
							<br />
							{"Occupation :"}
							{createInput(stockage?.["occupation"] ?? "", ev => updateStockage("occupation", ev.currentTarget.value))}
							<br />
							<br />
							{"Entreprise :"}
							{createInput(stockage?.["business"] ?? "", ev => updateStockage("business", ev.currentTarget.value))}
							<br />
							<br />
							{"Emetteur :"}
							{createInput(data.signature1 ?? "", () => data.signature1)}
						</div>

						{getBottom(() => {
							postAsync("Papiers", {
								type: data.type,
								values: stockage,
								state: data.state,
								image: data.overrideImage,
								signature1: data.signature1,
								signature2: data.signature2,
							});
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default Papiers;
