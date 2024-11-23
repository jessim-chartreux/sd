import "./Menu_propriete.scss";
import "react-circular-progressbar/dist/styles.css";

import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import React, { useContext, useState } from "react";

import Button from "../../components/UI/Button/Buttton";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const Menu_propriete: React.FC = () => {
	const [windowSize, _setWindowSize] = useState(getWindowSize());
	const [inputText, setinputText] = useState("");
	const [typePropriete, settypePropriete] = useState("default");
	useExitKeys();

	const context = useContext(GlobalContext);

	const tableau_boiteaulettre = [
		{
			id: 0,
			valeur: "Téléphone",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Propriete/img0.webp",
		},
		{
			id: 1,
			valeur: "Daily News",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Propriete/img1.webp",
		},
	];

	const data_menuPropriete = {
		data_boite: tableau_boiteaulettre,
		number_day: 7,
		name: "28 avenue fleurie",
		advancedPerm: true,
	};

	const data: any | null = isDev ? data_menuPropriete : context.data;

	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	const handleChangeText = event => {
		setinputText(event.target.value);
	};

	const fonction_choiceTypePropriete = info => {
		settypePropriete(info);
		postAsync("MenuPropriete", {
			type: "access",
			value: info,
		});
	};
	const fonctionValue = () => {
		const valeur = data.data_boite?.length;
		return valeur;
	};
	return (
		<div style={{ width: windowSize.innerWidth, height: windowSize.innerHeight, display: "flex" }}>
			<div
				style={{ display: "flex", flex: "auto", flexDirection: "column", position: "relative", backgroundColor: "transparent" }}
				className="Container_Principal_propriete">
				<div className="Container_propriete">
					<div style={{ flex: "auto", display: "flex", flexDirection: "column" }}>
						<div style={{ height: 92, display: "flex", width: "100%" }}>
							<img
								src="https://cdn.sacul.cloud/v2/vision-cdn/Propriete/header.webp"
								style={{ height: "100%", width: "100%", borderRadius: "6px 6px 0px 0px" }}
							/>
						</div>
						<div style={{ height: "auto", padding: "15px 22px", display: "flex" }}>
							<div style={{ height: "auto", display: "flex", flexDirection: "column" }}>
								<div style={{ height: 35, width: 320, display: "flex", borderBottom: "1px solid rgba(255,255,255,0.5)" }}>
									<div className="text_adresse">{data.name}</div>
								</div>
								<div style={{ height: 40, width: 45, position: "absolute", right: 30, top: 110 }}>
									<CircularProgressbarWithChildren
										background
										strokeWidth={6}
										value={0.66}
										maxValue={1}
										minValue={0}
										styles={buildStyles({
											pathColor: "#ffffff",
											trailColor: "rgba(255,255,255,0.2)",
											backgroundColor: "transparent",
											pathTransitionDuration: 2,
										})}>
										<div className="text_title">{data?.number_day}J</div>
									</CircularProgressbarWithChildren>
								</div>
								<div style={{ height: 30 }} />
								<div className="text_title">MODIFIER LE NOM DE LA PROPRIÉTÉ</div>
								<div style={{ height: 6 }} />
								<div style={{ height: 25, width: 428, display: "flex" }}>
									<input
										className="text_input"
										value={inputText}
										onChange={handleChangeText}
										onBlur={() =>
											postAsync("MenuPropriete", {
												rename: inputText,
											})
										}
									/>
								</div>
								<div style={{ height: 25 }} />
								<div className="text_title">ACCES A LA PROPRIÉTÉ</div>
								<div style={{ height: 6 }} />
								<div style={{ height: 25, width: 428, display: "flex" }}>
									<Button
										color="green"
										fontWeight={700}
										fontSize={12}
										label="OUVERT"
										width={133}
										height={25}
										selected={typePropriete === "ouvert"}
										callback={() => fonction_choiceTypePropriete("ouvert")}
									/>
									<div style={{ width: 14 }} />
									<Button
										color="yellow"
										fontWeight={700}
										fontSize={12}
										label="SONETTE"
										width={133}
										height={25}
										selected={typePropriete === "sonnette"}
										callback={() => fonction_choiceTypePropriete("sonnette")}
									/>
									<div style={{ width: 14 }} />
									<Button
										color="red"
										fontWeight={700}
										fontSize={12}
										label="FERMER"
										width={133}
										height={25}
										selected={typePropriete === "fermer"}
										callback={() => fonction_choiceTypePropriete("fermer")}
									/>
								</div>
								<div style={{ height: 25 }} />
								<div className="text_title">CLEF DE LA PROPRIÉTÉ</div>
								<div style={{ height: 6 }} />
								<div style={{ height: 25, width: 428, display: "flex" }}>
									<Button
										color="blue"
										fontWeight={700}
										fontSize={12}
										label="ATTRIBUER LE DOUBLE"
										width={205}
										height={25}
										callback={() =>
											postAsync("MenuPropriete", {
												type: "set_double",
											})
										}
										margin={"0 18px 0 0"}
									/>
									<Button
										color="red"
										fontWeight={700}
										fontSize={12}
										label="REVOQUER L'ACCÈS"
										width={205}
										height={25}
										callback={() =>
											postAsync("MenuPropriete", {
												type: "revoke_access",
											})
										}
									/>
								</div>
								{data.advancedPerm && (
									<>
										<div style={{ height: 25 }} />
										<div className="text_title">GESTION</div>
										<div style={{ height: 6 }} />
										<div style={{ height: 25, width: 428, display: "flex" }}>
											<Button
												color="green"
												fontWeight={700}
												fontSize={12}
												label="TRANSFERER LA PROPRIÉTÉ"
												width={205}
												height={25}
												callback={() =>
													postAsync("MenuPropriete", {
														type: "give_property",
													})
												}
												margin={"0 18px 0 0"}
											/>
											<Button
												color="red"
												fontWeight={700}
												fontSize={12}
												label="SUPPRIMER LA PROPRIÉTÉ"
												width={205}
												height={25}
												callback={() =>
													postAsync("MenuPropriete", {
														type: "delete_property",
													})
												}
											/>
										</div>
									</>
								)}
								<div style={{ height: 30 }} />
							</div>
						</div>
					</div>
				</div>
				<div className="Container_Propriete2">
					<div style={{ flex: "auto", padding: "5px 20px", display: "flex" }}>
						<div style={{ flex: "auto", flexDirection: "column", display: "flex", position: "relative" }}>
							<div style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/Propriete/logo_boiteaulettre.webp" />
								<div style={{ width: 10 }} />
								<div className="text_boiteaulettre">BOITE AU LETTRE</div>
							</div>
							<div style={{ marginBottom: 12 }} />
							<div style={{ flexDirection: "row", display: "flex" }}>
								<div style={{ width: 15 }} />
								{[0, 1, 2].map(index => {
									const info: any = data.data_boite?.[index] ?? { isPlaceholder: true };
									return (
										<div key={index}>
											{!info?.isPlaceholder && (
												<div className="item">
													<img src={info.img}></img>
													<div className="name">{info.valeur}</div>
												</div>
											)}
											{info?.isPlaceholder && (
												<div
													style={{
														width: 115,
														height: 115,
														marginRight: 20,
														background:
															"linear-gradient(90deg, rgba(94, 108, 182, 0.3) 0%, rgba(94, 108, 182, 0.3) 100%)",
														borderRadius: 6,
													}}></div>
											)}
										</div>
									);
								})}
								<div style={{ flex: "auto", justifyContent: "center", alignItems: "center", display: "flex" }}>
									<div style={{ height: 37, width: 37, position: "absolute", backgroundColor: "transparent", right: -2 }}>
										<CircularProgressbarWithChildren
											background
											strokeWidth={5}
											value={fonctionValue()}
											maxValue={3}
											minValue={0}
											styles={buildStyles({
												pathColor: "#ffffff",
												trailColor: "rgba(255,255,255,0.2)",
												backgroundColor: "transparent",
												pathTransitionDuration: 2,
											})}>
											<img
												src="https://cdn.sacul.cloud/v2/vision-cdn/Propriete/icon_bag.webp"
												style={{
													width: 28,
													height: 28,
													imageRendering: "pixelated",
													position: "relative",
													top: -2,
												}}
											/>
										</CircularProgressbarWithChildren>
									</div>
								</div>
							</div>
							<div style={{ marginBottom: 18 }} />
							<Button
								color="green"
								fontWeight={700}
								fontSize={12}
								label="VALIDER"
								width={199}
								height={25}
								callback={() => postAsync("MenuPropriete", { type: "emptyMailbox" })}
								margin={"auto"}
							/>
							<div style={{ marginBottom: 10 }} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu_propriete;
