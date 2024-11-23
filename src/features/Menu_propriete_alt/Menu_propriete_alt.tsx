import "./Menu_propriete.scss";
import "react-circular-progressbar/dist/styles.css";

import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import React, { useContext, useState } from "react";

import Button from "../../components/UI/Button/Buttton";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const Menu_propriete_alt: React.FC = () => {
	const [windowSize, _setWindowSize] = useState(getWindowSize());

	useExitKeys();

	const context = useContext(GlobalContext);

	const data_menuPropriete = {
		boiteWeight: 1.2,
		isLocked: true,
		name: "28 avenue fleurie",
		canPerqui: true,
		owner: "BRYAN ANDERSON",
	};

	const data: any | null = isDev ? data_menuPropriete : context.data;

	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	return (
		<div style={{ width: windowSize.innerWidth, height: windowSize.innerHeight, display: "flex" }}>
			<div
				style={{ display: "flex", flex: "auto", flexDirection: "column", position: "relative", backgroundColor: "transparent" }}
				className="Container_Principal_propriete">
				<div className="Container_propriete">
					<div style={{ flex: "auto", display: "flex", flexDirection: "column" }}>
						<div style={{ height: 92, display: "flex", width: "100%" }}>
							<img
								src="https://cdn.sacul.cloud/v2/vision-cdn/Propriete/header2.webp"
								style={{ height: "100%", width: "100%", borderRadius: "6px 6px 0px 0px" }}
							/>
						</div>
						<div style={{ height: "auto", padding: "15px 22px", display: "flex" }}>
							<div style={{ height: "auto", display: "flex", flexDirection: "column" }}>
								<div style={{ height: 35, width: 320, display: "flex", borderBottom: "2px solid rgba(255,255,255,0.5)" }}>
									<div className="text_adresse">{data.name}</div>
								</div>
								<div style={{ height: 40, width: 45, position: "absolute", right: 30, top: 110 }}>
									<CircularProgressbarWithChildren
										background
										strokeWidth={6}
										value={1}
										maxValue={1}
										minValue={0}
										styles={buildStyles({
											pathColor: "#ffffff",
											trailColor: "rgba(255,255,255,0.2)",
											backgroundColor: "transparent",
											pathTransitionDuration: 2,
										})}>
										<div className="text_title">
											<img
												src={`https://cdn.sacul.cloud/v2/vision-cdn/Propriete/${data.isLocked ? "" : "un"}lock.webp`}
												style={{
													width: 14,
												}}
											/>
										</div>
									</CircularProgressbarWithChildren>
								</div>
							</div>
						</div>

						<div className="Infos">
							<div className="Proprio">{data.owner.toUpperCase()}</div>
							<div className="Bouttons">
								<Button
									color="green"
									fontWeight={700}
									fontSize={12}
									label="ENTRER"
									width={199}
									height={25}
									callback={() => postAsync("MenuProprieteAlt", { type: "entrer" })}
									margin={"10px auto"}
									disabled={data.isLocked}
								/>
								<Button
									color="yellow"
									fontWeight={700}
									fontSize={12}
									label="SONNER"
									width={199}
									height={25}
									callback={() => postAsync("MenuProprieteAlt", { type: "sonner" })}
									margin={"10px auto"}
									disabled={!data.isLocked}
								/>
								<Button
									color="blue"
									fontWeight={700}
									fontSize={12}
									label="PERQUISITIONNER"
									width={199}
									height={25}
									callback={() => postAsync("MenuProprieteAlt", { type: "perquisitionner" })}
									margin={"10px auto"}
									disabled={data.canPerqui}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="Container_Propriete2">
					<div style={{ flex: "auto", padding: "5px 20px", display: "flex" }}>
						<div style={{ flex: "auto", flexDirection: "column", display: "flex", position: "relative" }}>
							<div style={{ flexDirection: "row", display: "flex", alignItems: "center", paddingTop: 10 }}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/Propriete/mailbox.svg" style={{ width: 30 }} />
								<div style={{ width: 20 }} />
								<div className="text_boiteaulettre">BOITE AU LETTRE</div>
							</div>
							{data.boiteWeight == 3 && <div className="Complet">COMPLET</div>}
							<div style={{ marginBottom: 12 }} />
							<div style={{ flexDirection: "row", display: "flex", justifyContent: "center" }}>
								<div style={{ width: 15 }} />
								{[1, 2, 3].map(index => {
									const canInput = data.boiteWeight - index < 0;
									return (
										<div key={index}>
											{!canInput && (
												<div
													style={{
														background: "rgba(255, 255, 255, 0.2)",
														width: 115,
														height: 115,
														marginRight: 20,
														borderRadius: 6,
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
													}}>
													<img
														src={"https://cdn.sacul.cloud/v2/vision-cdn/Propriete/carton.webp"}
														style={{
															width: 40,
															height: "auto",
														}}></img>
												</div>
											)}
											{canInput && (
												<div
													style={{
														width: 115,
														height: 115,
														marginRight: 20,
														borderRadius: 6,
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														background:
															"linear-gradient(90deg, rgba(94, 108, 182, 0.3) 0%, rgba(94, 108, 182, 0.3) 100%)",
														position: "relative",
														cursor: "pointer",
													}}
													onClick={() => {
														postAsync("MenuProprieteAlt", {
															button: "addToBoite",
														});
													}}>
													<img
														src={"https://cdn.sacul.cloud/v2/vision-cdn/Propriete/add.webp"}
														style={{
															width: 30,
															height: "auto",
														}}></img>
													<div className="Bar">
														<div
															className="Progress"
															style={{
																width: " " + ((data.boiteWeight - index + 1) % 1) * 100 + "%",
															}}></div>
													</div>
												</div>
											)}
										</div>
									);
								})}
							</div>
							<div style={{ marginBottom: 25 }} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu_propriete_alt;
