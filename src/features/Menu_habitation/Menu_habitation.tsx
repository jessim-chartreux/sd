import "./Menu_habitation.scss";

import React, { useContext, useState } from "react";
import { close, useExitKeys } from "../../hooks/useExitKeys";

import Button from "../../components/UI/Button/Buttton";
import { GlobalContext } from "../../app";
import Slider from "@mui/material/Slider";
import { isDev } from "../../utils/isDev";
import { playOnClickSound } from "../../utils/sounds";
import { postAsync } from "../../utils/postAsync";

const Menu_habitation: React.FC = () => {
	const [inputText, setinputText] = useState("");
	const [type, setType] = useState("habitation");
	const [show, setShow] = useState<any>(null);
	const [capacity, setCapacity] = useState(0);
	const [locationTime, setLocationTime] = useState(7);
	const [propriete, setPropriete] = useState<any>(null);

	useExitKeys();
	const context = useContext(GlobalContext);

	const capacite_stockage = [
		{
			id: 0,
			valeur: 0,
		},
		{
			id: 1,
			valeur: 50,
		},
		{
			id: 2,
			valeur: 100,
		},
		{
			id: 3,
			valeur: 200,
		},
		{
			id: 4,
			valeur: 300,
		},
		{
			id: 5,
			valeur: 500,
		},
		{
			id: 6,
			valeur: 1000,
		},
	];

	const liste_habitation = [
		{
			id: 0,
			valeur: "studio 1",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Habitation/img0.webp",
			categorie: "habitation",
		},
		{
			id: 1,
			valeur: "appartement 1",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Habitation/img1.webp",
			categorie: "habitation",
		},
		{
			id: 2,
			valeur: "motel 1",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Habitation/img2.webp",
			categorie: "habitation",
		},
		{
			id: 3,
			valeur: "grand appartement 1",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Habitation/img3.webp",
			categorie: "habitation",
		},
		{
			id: 4,
			valeur: "penthouse sombre",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Habitation/img4.webp",
			categorie: "habitation",
		},
		{
			id: 5,
			valeur: "penthouse coloré",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Habitation/img5.webp",
			categorie: "habitation",
		},
		{
			id: 6,
			valeur: "penthouse intense",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Habitation/img6.webp",
			categorie: "habitation",
		},
		{
			id: 7,
			valeur: "penthouse monochrome",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Habitation/img7.webp",
			categorie: "habitation",
		},
		{
			id: 8,
			valeur: "penthouse chaleureux",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Habitation/img8.webp",
			categorie: "habitation",
		},
		{
			id: 5,
			valeur: "penthouse coloré",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Habitation/img5.webp",
			categorie: "habitation",
		},
		{
			id: 5,
			valeur: "penthouse coloré",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Habitation/img5.webp",
			categorie: "habitation",
		},
	];

	const liste_stockage = [
		{
			id: 0,
			valeur: "stockage 1",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Stockage/background.webp",
			categorie: "stockage",
		},
		{
			id: 1,
			valeur: "stockage 2",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Stockage/background.webp",
			categorie: "stockage",
		},
		{
			id: 2,
			valeur: "stockage",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Stockage/background.webp",
			categorie: "stockage",
		},
		{
			id: 3,
			valeur: "stockage",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Stockage/background.webp",
			categorie: "stockage",
		},
		{
			id: 4,
			valeur: "stockage",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Stockage/background.webp",
			categorie: "stockage",
		},
		{
			id: 5,
			valeur: "stockage",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Stockage/background.webp",
			categorie: "stockage",
		},
		{
			id: 6,
			valeur: "stockage",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Stockage/background.webp",
			categorie: "stockage",
		},
		{
			id: 7,
			valeur: "stockage",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Stockage/background.webp",
			categorie: "stockage",
		},
		{
			id: 8,
			valeur: "stockage",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Stockage/background.webp",
			categorie: "stockage",
		},
	];

	const liste_garage = [
		{
			id: 0,
			valeur: "garage 1",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Garage/background.webp",
			categorie: "garage",
		},
		{
			id: 1,
			valeur: "garage 2",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Garage/background.webp",
			categorie: "garage",
		},
		{
			id: 2,
			valeur: "garage",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Garage/background.webp",
			categorie: "garage",
		},
		{
			id: 3,
			valeur: "garage",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Garage/background.webp",
			categorie: "garage",
		},
		{
			id: 4,
			valeur: "garage",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Garage/background.webp",
			categorie: "garage",
		},
		{
			id: 5,
			valeur: "garage",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Garage/background.webp",
			categorie: "garage",
		},
		{
			id: 6,
			valeur: "garage",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Garage/background.webp",
			categorie: "garage",
		},
		{
			id: 7,
			valeur: "garage",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Garage/background.webp",
			categorie: "garage",
		},
		{
			id: 8,
			valeur: "garage",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Garage/background.webp",
			categorie: "garage",
		},
	];

	const data: any | null = isDev
		? {
				habitation: liste_habitation,
				garage: liste_garage,
				stockage: liste_stockage,
				maxDuration: 20,
			}
		: context.data;

	const handleChangeText = event => {
		setinputText(event.target.value);
	};

	const submit = () => {
		const data_callback = {
			duration: locationTime,
			capacity: capacity,
			type: type,
			propriete: propriete,
			name: inputText,
		};
		postAsync("MenuHabitationCreation", data_callback);
	};

	return (
		<div className={"MenuHabitation " + type}>
			<div
				style={{ display: "flex", flexDirection: "column", position: "relative", backgroundColor: "transparent" }}
				className="Container_Principal_habitation">
				{show === null && (
					<>
						<div className="Container_habitation">
							<div style={{ display: "flex", flexDirection: "column" }}>
								<div style={{ height: 80, display: "flex", width: "100%" }}>
									<img
										src="https://cdn.sacul.cloud/v2/vision-cdn/Habitation/header.webp"
										style={{ height: "100%", width: "100%", borderRadius: "6px 6px 0px 0px" }}
									/>
								</div>
								<div style={{ height: "auto", padding: "15px 20.5px", display: "flex" }}>
									<div style={{ height: "auto", display: "flex", flexDirection: "column" }}>
										<div className="text_title" style={{ marginTop: 10 }}>
											NOM DE LA PROPRIÉTÉ
										</div>
										<div style={{ height: 6 }} />
										<div style={{ height: 25, width: "auto", display: "flex" }}>
											<input className="text_input_propriete" value={inputText} onChange={handleChangeText} />
										</div>
										<div style={{ height: 25 }} />
										<div className="text_title">TYPE DE LA PROPRIÉTÉ</div>
										<div style={{ height: 6 }} />
										<div style={{ height: 25, width: "auto", display: "flex" }}>
											<Button
												color="green"
												fontWeight={700}
												fontSize={12}
												label="HABITATION"
												width={121}
												height={25}
												selected={type === "habitation"}
												callback={() => setType("habitation")}
												margin={"0 9px 0 0"}
											/>
											<Button
												color="blue"
												fontWeight={700}
												fontSize={12}
												label="GARAGE"
												width={121}
												height={25}
												selected={type === "garage"}
												callback={() => setType("garage")}
												margin={"0 9px 0 0"}
											/>
											<Button
												color="yellow"
												fontWeight={700}
												fontSize={12}
												label="STOCKAGE"
												width={121}
												height={25}
												selected={type === "stockage"}
												callback={() => setType("stockage")}
												margin={"0 9px 0 0"}
											/>
										</div>
										<div style={{ height: 25 }} />
										<div className="text_title">CAPACITÉ DE STOCKAGE</div>
										<div style={{ height: 6 }} />
										<div style={{ height: 30, width: "auto", display: "flex" }}>
											{capacite_stockage.map((info, i) => {
												return (
													<div
														key={i}
														id={"capacite_stockage_" + info.id}
														className={"capacity " + (capacity === info.valeur ? "selected" : "")}
														onClick={() => setCapacity(info.valeur)}
														style={{
															width: 46,
															cursor: "pointer",
															background: "rgba(255, 255, 255, 0.2)",
															borderRadius: "4px",
															justifyContent: "center",
															alignItems: "center",
															display: "flex",
														}}>
														<div className="text_btn_habitation2">{info.valeur}</div>
													</div>
												);
											})}
										</div>
										<div style={{ height: 25 }} />
										<div className="text_title">DURÉE DE LOCATION</div>
										<Slider
											className="cSlider"
											valueLabelDisplay="on"
											value={locationTime}
											onChange={(_, value: number) => setLocationTime(value)}
											min={0}
											max={data.maxDuration}
										/>
										<div style={{ height: 5 }} />
										<div className="text_title">SELECTION DE LA PROPRIÉTÉ</div>
										<div style={{ height: 6 }} />
										<div style={{ height: 87, width: "auto", display: "flex" }}>
											<div
												className=""
												onClick={() => {
													setShow("habitation");
												}}
												style={{
													width: 122,
													cursor: "pointer",
													borderRadius: "6px",
													position: "relative",
													filter: type !== "habitation" ? "brightness(0.5) grayscale(1)" : "none",
													pointerEvents: type !== "habitation" ? "none" : "all",
												}}>
												<img
													id="selection_habitation_img"
													style={{ width: "100%", height: "100%" }}
													src={
														"https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Habitation/background.webp"
													}
												/>

												<div
													style={{
														position: "absolute",
														height: 16,
														width: "100%",
														display: "flex",
														bottom: 0,
														background: "rgba(94, 108, 182, 0.8)",
														borderRadius: "0px 0px 6px 6px",
														justifyContent: "center",
														alignItems: "center",
													}}>
													<div id="selection_habitation_valeur" className="text_selection">
														{"habitation"}
													</div>
													<img
														src="https://cdn.sacul.cloud/v2/vision-cdn/Habitation/chevron_right.webp"
														style={{ position: "absolute", right: 2 }}
													/>
												</div>
											</div>
											<div style={{ width: 19 }} />
											<div
												className=""
												onClick={() => {
													setShow("garage");
												}}
												style={{
													width: 122,
													cursor: "pointer",
													borderRadius: "6px",
													filter: type !== "garage" ? "brightness(0.5) grayscale(1)" : "none",
													pointerEvents: type !== "garage" ? "none" : "all",
													position: "relative",
												}}>
												<img
													style={{ width: "100%", height: "100%" }}
													src={
														"https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Garage/background.webp"
													}
												/>
												<div
													style={{
														position: "absolute",
														height: 16,
														width: "100%",
														display: "flex",
														bottom: 0,
														background: "rgba(94, 108, 182, 0.8)",
														borderRadius: "0px 0px 6px 6px",
														justifyContent: "center",
														alignItems: "center",
													}}>
													<div className="text_selection">{"garage"}</div>
													<img
														src="https://cdn.sacul.cloud/v2/vision-cdn/Habitation/chevron_right.webp"
														style={{ position: "absolute", right: 3 }}
													/>
												</div>
											</div>
											<div style={{ width: 19 }} />
											<div
												className=""
												onClick={() => {
													setShow("stockage");
												}}
												style={{
													width: 122,
													cursor: "pointer",
													borderRadius: "6px",
													filter: type !== "stockage" ? "brightness(0.5) grayscale(1)" : "none",
													pointerEvents: type !== "stockage" ? "none" : "all",
													position: "relative",
												}}>
												<img
													style={{ width: "100%", height: "100%" }}
													src={
														"https://cdn.sacul.cloud/v2/vision-cdn/Habitation/Selection/Stockage/background.webp"
													}
												/>
												<div
													style={{
														position: "absolute",
														height: 16,
														width: "100%",
														display: "flex",
														bottom: 0,
														background: "rgba(94, 108, 182, 0.8)",
														borderRadius: "0px 0px 6px 6px",
														justifyContent: "center",
														alignItems: "center",
													}}>
													<div className="text_selection">{"stockage"}</div>
													<img
														src="https://cdn.sacul.cloud/v2/vision-cdn/Habitation/chevron_right.webp"
														style={{ position: "absolute", right: 3 }}
													/>
												</div>
											</div>
										</div>
										<Button
											color="green"
											width={273}
											height={27}
											fontSize={10}
											fontWeight={700}
											callback={() => submit()}
											margin="30px auto 10px"
											label="CRÉER L'HABITATION"
											disabled={!inputText || inputText === "" || !propriete}
										/>
										<Button
											color="red"
											width={198}
											height={25}
											fontSize={10}
											fontWeight={700}
											callback={() => close()}
											margin={"0 auto 28px"}
											label="SUPPRIMER L'HABITATION"
										/>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
				{show !== null && (
					<div
						style={{
							width: 445,
						}}>
						<div style={{ height: 80, display: "flex", width: "100%" }}>
							<img
								src="https://cdn.sacul.cloud/v2/vision-cdn/Habitation/header.webp"
								style={{ height: "100%", width: "100%", borderRadius: "6px 6px 0px 0px" }}
							/>
						</div>
						<div className="list">
							<div
								className="span"
								style={{
									marginLeft: 30,
								}}>
								{show.toUpperCase()}
							</div>
							<div className="listItem">
								{data[show].map((item: any, i: number) => (
									<div
										key={i}
										className={"item " + (JSON.stringify(propriete) === JSON.stringify(item) ? "selected" : "")}
										onClick={() => {
											setPropriete(item);
											postAsync("MenuHabitationPreview", { propriete: item });
											playOnClickSound();
										}}
										onMouseEnter={() => {}}
										style={{
											background: `url(${item.img})`,
										}}>
										<div className={"name "}>{item.valeur}</div>
									</div>
								))}
							</div>
							<Button
								color="green"
								width={216}
								height={25}
								fontSize={10}
								fontWeight={700}
								callback={() => setShow(null)}
								margin="30px auto"
								label="VALIDER"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Menu_habitation;
