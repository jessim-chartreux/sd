import "./cardNewsSocietyCreate.scss";

import React, { useContext, useState } from "react";

import Button from "../../components/UI/Button/Buttton";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

interface ISocietyInformaiton {
	name_society: string;
	logo_society: string;
	preset: string;
}

function CardNewsSocietyCreate() {
	useExitKeys();
	const [windowSize, setWindowSize] = useState(getWindowSize());
	const [choiceInformation, setchoiceInformation] = useState(false);
	const [choiceOuverture, setchoiceOuverture] = useState(false);
	const [choiceFermeture, setchoiceFermeture] = useState(false);
	const [choicetypeAnnonce, setchoicetypeAnnonce] = useState("");
	const [inputTelephone, setinputTelephone] = useState("");
	const [inputMessage, setinputMessage] = useState("");
	const [animation, setanimation] = useState(false);

	const context = useContext(GlobalContext);
	const data: any | null = isDev
		? {
				name_society: "Dynasti 8",
				logo_society: "https://cdn.sacul.cloud/v2/vision-cdn/other/logo_dynasti.webp",
				preset: "GOUV",
			}
		: (context.data as ISocietyInformaiton);

	let label, number, image, type1, type2, type3;

	if (data?.preset) {
		if (data?.preset === "LSPD") {
			label = "LSPD";
			number = 911;
			image = "https://cdn.sacul.cloud/v2/vision-cdn/vNotif/lspd.webp";
			type1 = "INTERVENTION";
			type2 = "INFORMATION";
			type3 = "ALERTE";
		}
		if (data?.preset === "LSFD") {
			label = "LSFD";
			number = 912;
			image = "https://cdn.sacul.cloud/v2/vision-cdn/vNotif/lsfd.webp";
			type1 = "INTERVENTION";
			type2 = "INFORMATION";
			type3 = "ALERTE";
		}
		if (data?.preset === "LSSD") {
			label = "LSSD";
			number = 913;
			image = "https://cdn.sacul.cloud/v2/vision-cdn/vNotif/lssd.webp";
			type1 = "INTERVENTION";
			type2 = "INFORMATION";
			type3 = "ALERTE";
		}
		if (data?.preset === "SAMS") {
			label = "SAMS";
			number = 914;
			image = "https://cdn.sacul.cloud/v2/vision-cdn/vNotif/SAMS.webp";
			type1 = "INTERVENTION";
			type2 = "INFORMATION";
			type3 = "ALERTE";
		}
		if (data?.preset === "USSS") {
			label = "USSS";
			number = null;
			image = "https://cdn.sacul.cloud/v2/vision-cdn/vNotif/usss.webp";
			type1 = "INTERVENTION";
			type2 = "INFORMATION";
			type3 = "ALERTE";
		}
		if (data?.preset === "G6") {
			label = "G6";
			number = 914;
			image = "https://cdn.sacul.cloud/v2/vision-cdn/vNotif/g6.webp";
			type1 = "SECURISATION";
			type2 = "INFORMATION";
			type3 = "ALERTE";
		}
		if (data?.preset === "GOUV") {
			label = "GOUVERNEMENT";
			number = null;
			image = "https://cdn.sacul.cloud/v2/vision-cdn/vNotif/gouv.webp";
			type1 = "INTERVENTION";
			type2 = "INFORMATION";
			type3 = "ALERTE";
		}
		if (data?.preset === "JUSTICE") {
			label = "JUSTICE";
			number = null;
			image = "https://cdn.sacul.cloud/v2/vision-cdn/vNotif/justice.webp";
			type1 = "INTERVENTION";
			type2 = "INFORMATION";
			type3 = "ALERTE";
		}
	} else {
		label = data.name_society;
		number = null;
		image = data.logo_society;
		type1 = "OUVERTURE";
		type2 = "INFORMATION";
		type3 = "FERMETURE";
	}

	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	const handleChangeMessage = event => {
		if (event.target.value.length < 81) setinputMessage(event.target.value);
	};

	const handleChangeTelephone = event => {
		if (!/[0-9]/.test(event.target.value) && event.target.value !== "") {
			return;
		}
		if (event.target.value.length > 5) return;
		setinputTelephone(event.target.value);
	};

	const handleSubmit = async () => {
		await postAsync("notificationCreateSociety_callback", {
			choiceType_notif: choicetypeAnnonce,
			message_notif: inputMessage,
			telephone_notif: number ?? inputTelephone,
			name_entreprise_notif: label,
			logo_entreprise_notif: image,
		});

		setTimeout(() => {
			setchoicetypeAnnonce("");
			setchoiceFermeture(false);
			setchoiceInformation(false);
			setchoiceOuverture(false);
			setinputMessage("");
			setinputTelephone("");
		}, 2000);
	};

	return (
		<div style={{ width: windowSize.innerWidth, height: windowSize.innerHeight, display: "flex" }}>
			<div style={{ display: "flex", flex: 1, backgroundColor: "transparent" }}>
				<div className={"Container_NotifEntrepriseV2 " + (data?.preset ?? "")}>
					<div style={{ height: 80, display: "flex", width: "100%" }} id="bloc1">
						<img
							src="https://cdn.sacul.cloud/v2/vision-cdn/other/header_createWeazel.webp"
							style={{ height: "100%", width: "100%" }}
						/>
					</div>
					<div style={{ display: "flex", flex: "auto", position: "relative" }}>
						<div style={{ width: 32 }} />
						<div style={{ display: "flex", flex: "auto", paddingTop: 34, paddingBottom: 34 }}>
							<div style={{ flexDirection: "column", display: "flex" }}>
								<div id="bloc2" style={{ height: 22 }}>
									<div className="text_label">ENTREPRISE</div>
								</div>
								<div
									id="bloc3"
									style={{
										display: "flex",
										width: "fit-content",
										padding: "0 5px",
										justifyContent: "center",
										alignItems: "center",
										flexDirection: "row",
										borderRadius: 3,
										background: "linear-gradient(180deg, rgba(56, 220, 102, 0.4) 0%, rgba(51, 150, 60, 0.4) 100%)",
									}}>
									<div className="text_entreprise">{label}</div>
								</div>
								<div
									id="bloc4"
									style={{ height: 76, width: 76, position: "absolute", right: 62, top: 49, display: "flex" }}>
									<img style={{ width: "100%", height: "100%", borderRadius: 4 }} src={image} />
								</div>
								<div style={{ height: 28 }} />
								<div id="bloc5" style={{ height: 22 }}>
									<div className="text_label">TÉLÉPHONE</div>
								</div>
								<div style={{ display: "flex", flexDirection: "row" }}>
									<div
										id="bloc6"
										style={{
											borderRadius: 3,
											width: "auto",
											background: "linear-gradient(180deg, rgba(56, 220, 102, 0.4) 0%, rgba(51, 150, 60, 0.4) 100%)",
											padding: "1px 10px 1px 10px",
										}}>
										<div className="text_entreprise">{number ?? 555}</div>
									</div>
									<div style={{ width: 8 }} />
									<div id="bloc7" style={{ height: "auto", width: 41, display: "flex" }}>
										<input className="input_simple" value={inputTelephone} onChange={handleChangeTelephone} />
									</div>
								</div>
								<div style={{ height: 30 }} />
								<div id="bloc8" style={{ height: 22 }}>
									<div className="text_label">TYPE D'ANNONCE</div>
								</div>
								{!data?.preset ? (
									<div style={{ display: "flex", flexDirection: "row", height: 25, width: 427 }}>
										<Button
											color="green"
											fontWeight={700}
											fontSize={12}
											label="OUVERTURE"
											width={140}
											height={25}
											selected={choicetypeAnnonce === "ouverture"}
											callback={() => setchoicetypeAnnonce("ouverture")}
										/>
										<div style={{ width: 8 }} />
										<Button
											color="yellow"
											fontWeight={700}
											fontSize={12}
											label="INFORMATION"
											width={140}
											height={25}
											selected={choicetypeAnnonce === "information"}
											callback={() => setchoicetypeAnnonce("information")}
										/>
										<div style={{ width: 8 }} />
										<Button
											color="red"
											fontWeight={700}
											fontSize={12}
											label="FERMETURE"
											width={140}
											height={25}
											selected={choicetypeAnnonce === "fermeture"}
											callback={() => setchoicetypeAnnonce("fermeture")}
										/>
									</div>
								) : (
									<div style={{ display: "flex", flexDirection: "row", height: 25, width: 427 }}>
										<Button
											color="red"
											fontWeight={700}
											fontSize={12}
											label="ALERTE"
											width={140}
											height={25}
											selected={choicetypeAnnonce === "ouverture"}
											callback={() => setchoicetypeAnnonce("alerte")}
										/>
										<div style={{ width: 8 }} />
										<Button
											color="yellow"
											fontWeight={700}
											fontSize={12}
											label="INFORMATION"
											width={140}
											height={25}
											selected={choicetypeAnnonce === "information"}
											callback={() => setchoicetypeAnnonce("information")}
										/>
										<div style={{ width: 8 }} />
										<Button
											color="blue"
											fontWeight={700}
											fontSize={12}
											label="INTERVENTION"
											width={140}
											height={25}
											selected={choicetypeAnnonce === "fermeture"}
											callback={() => setchoicetypeAnnonce("intervention")}
										/>
									</div>
								)}
								<div style={{ height: 30 }} />
								<div id="bloc12" style={{ height: 27 }}>
									<div className="text_label">MESSAGE DE L'ANNONCE</div>
								</div>
								<div id="bloc13" style={{ height: 65, width: "auto", display: "flex" }}>
									<div className="length">{inputMessage.length} / 80</div>
									<textarea className="input_message" value={inputMessage} onChange={handleChangeMessage} />
								</div>
								<div style={{ height: 30 }} />
								<div
									id="bloc14"
									onClick={() => handleSubmit()}
									style={{
										cursor: "pointer",
										height: 30,
										width: 266,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										alignSelf: "center",
										background: "linear-gradient(180deg, #33963C 0%, rgba(30, 180, 90, 0.58) 100%)",
										borderRadius: 4,
									}}>
									<Button color="green" fontWeight={700} fontSize={12} label="PUBLIER" width={266} height={30} />
								</div>
							</div>
						</div>
						<div style={{ width: 32 }} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardNewsSocietyCreate;
