import "./crewMenuGestion.scss";

import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import testCrew from "./testCrew.json";
import { useExitKeys } from "../../hooks/useExitKeys";

interface IPlayer {
	fname?: string;
	lname?: string;
	license?: string; //need for kick the player from crew or job
	rank?: number;
}

interface IProperties {
	type?: string;
	address?: string;
	id?: number;
}

interface IVehs {
	vehName?: string;
	pounded?: boolean;
	plate?: string;
}

interface ICrewInformation {
	color_title?: string;
	background?: string;
	crewName?: string;
	crewDevise?: string;
	membres?: number;
	rang?: number;
	territoires?: number;
	recrute?: number;
	exclure?: number;
	editPerm?: number;
	editMembres?: number;
	sendDm?: number;
	crewOrEnterprise?: boolean; //if crew it's true if society it's false
	nbrRank?: number; //the number of rank for print in permmision
	jobLabel?: string;
	players?: IPlayer[];
	properties?: IProperties[];
	vehs?: IVehs[];
}

function CrewMenuGestion() {
	useExitKeys();
	const [windowSize, setWindowSize] = useState(getWindowSize());
	const [value, setValue] = useState("Gestion");
	const [recrute, setRecrute] = useState(null);
	const [exclure, setExclure] = useState(null);
	const [editPerm, setEditPerm] = useState(null);
	const [editMembres, setEditMembres] = useState(null);
	const [sendDm, setSendDm] = useState(null);
	const [playersData, setPlayersData] = useState([]);

	const context = useContext(GlobalContext);
	const data: ICrewInformation | null = isDev ? testCrew : (context.data as ICrewInformation);

	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}
	const nbrRankMap = [];
	for (let i = 1; i <= data.nbrRank; i++) {
		nbrRankMap.push(i);
	}

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(getWindowSize());
		}

		window.addEventListener("resize", handleWindowResize);
		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, [data, playersData]);

	if (recrute == null || exclure == null || editPerm == null || editMembres == null || sendDm == null) {
		setRecrute(data.recrute);
		setExclure(data.exclure);
		setEditPerm(data.editPerm);
		setEditMembres(data.editMembres);
		setSendDm(data.sendDm);
		setPlayersData(data.players);
	}
	function numberOfMemberSupTen() {
		if (data.membres >= 10) {
			return true;
		} else {
			return false;
		}
	}
	function numberOfTerSupTen() {
		if (data.territoires >= 10) {
			return true;
		} else {
			return false;
		}
	}
	const PlayerList = ({ player, index }: { player: IPlayer; index: number }) => {
		return (
			<div key={player.license} className="playerLine">
				<p className="player">
					{player.fname.toUpperCase()} {player.lname.toUpperCase()}
				</p>
				<div id="buttonList">
					<button className="infoPlayer" onClick={() => handleSubmitMember("infoPlayer", player, index)}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/crew/infoPlayer.webp" />
					</button>
					{player.rank != data.nbrRank ? (
						<button className="upPlayer" onClick={() => handleSubmitMember("upPlayer", player, index)}>
							<img src="https://cdn.sacul.cloud/v2/vision-cdn/crew/upPlayer.webp" />
						</button>
					) : (
						<button className="upPlayer" disabled>
							<img src="https://cdn.sacul.cloud/v2/vision-cdn/crew/upPlayer.webp" />
						</button>
					)}
					{player.rank != 1 ? (
						<button className="downPlayer" onClick={() => handleSubmitMember("downPlayer", player, index)}>
							<img src="https://cdn.sacul.cloud/v2/vision-cdn/crew/downPlayer.webp" />
						</button>
					) : (
						<button className="downPlayer" disabled>
							<img src="https://cdn.sacul.cloud/v2/vision-cdn/crew/downPlayer.webp" />
						</button>
					)}
					<button className="kickPlayer" onClick={() => handleSubmitMember("kickPlayer", player, index)}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/crew/kickPlayer.webp" />
					</button>
				</div>
			</div>
		);
	};

	const openMenu = newValue => {
		setValue(newValue);
		const tabs = document.querySelectorAll(".btn") as NodeListOf<HTMLElement>;

		tabs.forEach(tab => {
			tab.className = "btn";
			tab.style.color = "#FFFFFF";
		});
		const selected = document.getElementById(newValue);
		selected.className += " " + newValue;
		selected.style.color = "#000000";
	};

	const changeNbr = (source, number) => {
		const tabs = document.querySelectorAll("." + source) as NodeListOf<HTMLElement>;

		tabs.forEach(tab => {
			tab.style.background = "none";
			tab.style.opacity = "1";
		});
		const selected = document.getElementById(number + source);
		selected.style.background = data.background;
		selected.style.opacity = "1";
		switch (source) {
			case "oneNbr":
				data.recrute = number;
				setRecrute(number);
				break;
			case "twoNbr":
				data.exclure = number;
				setExclure(number);
				break;
			case "threeNbr":
				data.editPerm = number;
				setEditPerm(number);
				break;
			case "fourNbr":
				data.editMembres = number;
				setEditMembres(number);
				break;
			default:
				data.sendDm = number;
				setSendDm(number);
		}
	};

	const handleSubmitGestion = async () => {
		function getIfValue() {
			//if (crewNameMenu.length === 0 || deviseMenu.length === 0) return false
			return true;
		}
		// if (recrute==null || exclure==null || editPerm==null || editMembres==null || sendDm==null){
		//     recrute==null?setRecrute(data.recrute):setRecrute(recrute)
		//     exclure==null?setExclure(data.exclure):setExclure(exclure)
		//     editPerm==null?setEditPerm(data.editPerm):setEditPerm(editPerm)
		//     editMembres==null?setEditMembres(data.editMembres):setEditMembres(editMembres)
		//     sendDm==null?setSendDm(data.sendDm):setSendDm(sendDm)
		//     console.log(recrute, exclure, editPerm, editMembres, sendDm)
		//     console.log(data.recrute, data.exclure, data.editPerm, data.editMembres, data.sendDm)
		// }

		if (getIfValue()) {
			if (data.crewOrEnterprise) {
				await postAsync("crewGestion_callback", {
					recrute,
					exclure,
					editPerm,
					editMembres,
					sendDm,
				});
			} else {
				await postAsync("jobGestion_callback", {
					recrute,
					exclure,
					editPerm,
					editMembres,
					sendDm,
				});
			}
		}
		setTimeout(() => {
			setRecrute(recrute);
			setExclure(exclure);
			setEditPerm(editPerm);
			setEditMembres(editMembres);
			setSendDm(sendDm);
		}, 2000);
	};

	const handleSubmitMember = async (action, player, index) => {
		function getIfValue() {
			//if (crewNameMenu.length === 0 || deviseMenu.length === 0) return false
			return true;
		}
		data.players.splice(index, 1);
		playersData.splice(index, 1);

		/* const dataReturn = {
			action,
			player,
		}; */

		if (getIfValue()) {
			if (data.crewOrEnterprise) {
				await postAsync("crewMember_callback", {
					player,
					action,
				});
			} else {
				await postAsync("jobMember_callback", {
					player,
					action,
				});
			}
		}
	};

	return (
		<html>
			<head>
				<meta />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link href="styles.css" rel="stylesheet" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap" rel="stylesheet"></link>
				<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400&display=swap" rel="stylesheet"></link>
			</head>
			<body>
				<div style={{ width: windowSize.innerWidth, height: windowSize.innerHeight, display: "flex" }}>
					<div id="bg"></div>
					<div style={{ color: data.color_title }} id="crewName">
						{data.crewName?.toUpperCase()}
					</div>
					<div id="devise">{data.crewDevise?.toUpperCase()}</div>
					<div id="tab" />
					<div style={{ position: "absolute", top: 265, left: 543, display: "flex", flexDirection: "column" }}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/crew/LogoMan.webp" style={{ color: "white" }} />
					</div>
					<div style={{ position: "absolute", top: 253, left: 519, display: "flex", flexDirection: "column" }}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/crew/LogoAround.webp" style={{ height: 46, width: 65 }} />
					</div>
					<button className="btn" id="Membres" onClick={() => openMenu("Membres")}>
						Membres
					</button>
					<button className="btn Gestion" id="Gestion" onClick={() => openMenu("Gestion")}>
						Gestion
					</button>
					<button className="btn" id="Propriete" onClick={() => openMenu("Propriete")}>
						Propriété
					</button>
					{value == "Membres" && (
						<React.Fragment>
							<p id="mbr">LISTE</p>
							<div id="lineMbr" />
							<div id="listeBox">
								{playersData.map((player, index) => (
									<PlayerList key={index} player={player} index={index}></PlayerList>
									// <div key={player.license} className="playerLine">
									//     <p className="player">{player.fname.toUpperCase()} {player.lname.toUpperCase()}</p>
									//     <div id="buttonList">
									//         <button className="infoPlayer" onClick={() => handleSubmitMember('infoPlayer', player, index)}></button>
									//         {player.rank != data.nbrRank ? <button className="upPlayer" onClick={() => handleSubmitMember('upPlayer', player, index)}></button> : <button className="upPlayer" disabled></button>}
									//         {player.rank != 1 ? <button className="downPlayer" onClick={() => handleSubmitMember('downPlayer', player, index)}></button> : <button className="downPlayer" disabled></button>}
									//         <button className="kickPlayer" onClick={() => handleSubmitMember('kickPlayer', player, index)}></button>
									//     </div>
									// </div>
								))}
							</div>
						</React.Fragment>
					)}
					{value == "Gestion" && (
						<React.Fragment>
							<p id="info">INFORMATIONS</p>
							<div id="lineInfo" />
							<div id="infoBox" style={{ background: data.background }} />
							{numberOfMemberSupTen() ? (
								<p id="nbrEmpl" style={{ paddingLeft: "40px" }}>
									{data.membres}
								</p>
							) : (
								<p id="nbrEmpl" style={{ paddingLeft: "53px" }}>
									{data.membres}
								</p>
							)}
							{data.crewOrEnterprise ? <p id="empl">membres</p> : <p id="empl">employés</p>}
							<div id="line1" />
							<p id="nbrRank">{data.rang}</p>
							{data.crewOrEnterprise ? (
								<p id="rank" style={{ paddingLeft: "45px" }}>
									rangs
								</p>
							) : (
								<p id="rank" style={{ paddingLeft: "30px" }}>
									en service
								</p>
							)}
							<div id="line2" />
							{data.crewOrEnterprise ? (
								numberOfTerSupTen() ? (
									<p id="nbrProp" style={{ paddingLeft: "0px" }}>
										{data.territoires}
									</p>
								) : (
									<p id="nbrProp" style={{ paddingLeft: "0px" }}>
										{data.territoires}
									</p>
								)
							) : (
								<p id="nbrProp" style={{ top: "378px", fontSize: "30px", paddingLeft: "0px" }}>
									{data.jobLabel}
								</p>
							)}
							{data.crewOrEnterprise ? (
								<p id="prop">territoires</p>
							) : (
								<p id="prop" style={{ paddingLeft: "45px" }}>
									grade
								</p>
							)}
							<div id="permTitle">PERMISSIONS</div>
							<div id="linePerm"></div>
							<div id="one"></div>
							{data.crewOrEnterprise ? (
								<div id="oneText">RECRUTER UN MEMBRE</div>
							) : (
								<div id="oneText">RECRUTER UN EMPLOYE</div>
							)}
							<div id="oneNbr">
								{nbrRankMap.map(number =>
									recrute == number ? (
										<button
											id={number + "oneNbr"}
											name="oneNbr"
											className="oneNbr"
											style={{ background: data.background, padding: "3px 7px", borderRadius: "3px" }}
											key={number + "oneNbr"}
											onClick={() => changeNbr("oneNbr", number)}>
											{number}
										</button>
									) : (
										<button
											id={number + "oneNbr"}
											className="oneNbr"
											style={{ padding: "3px 7px", borderRadius: "3px" }}
											key={number + "oneNbr"}
											onClick={() => changeNbr("oneNbr", number)}>
											{number}
										</button>
									),
								)}
							</div>
							<div id="two"></div>
							{data.crewOrEnterprise ? <div id="twoText">VIRER UN MEMBRE</div> : <div id="twoText">VIRER UN EMPLOYE</div>}
							<div id="twoNbr">
								{nbrRankMap.map(number =>
									exclure == number ? (
										<button
											id={number + "twoNbr"}
											className="twoNbr"
											style={{ background: data.background, padding: "3px 7px", borderRadius: "3px" }}
											key={number + "twoNbr"}
											onClick={() => changeNbr("twoNbr", number)}>
											{number}
										</button>
									) : (
										<button
											id={number + "twoNbr"}
											className="twoNbr"
											style={{ padding: "3px 7px", borderRadius: "3px" }}
											key={number + "twoNbr"}
											onClick={() => changeNbr("twoNbr", number)}>
											{number}
										</button>
									),
								)}
							</div>
							<div id="three"></div>
							<div id="threeText">EDITER LES PERMISSIONS</div>
							<div id="threeNbr">
								{nbrRankMap.map(number =>
									editPerm == number ? (
										<button
											id={number + "threeNbr"}
											className="threeNbr"
											style={{ background: data.background, padding: "3px 7px", borderRadius: "3px" }}
											key={number + "threeNbr"}
											onClick={() => changeNbr("threeNbr", number)}>
											{number}
										</button>
									) : (
										<button
											id={number + "threeNbr"}
											className="threeNbr"
											style={{ padding: "3px 7px", borderRadius: "3px" }}
											key={number + "threeNbr"}
											onClick={() => changeNbr("threeNbr", number)}>
											{number}
										</button>
									),
								)}
							</div>
							<div id="four"></div>
							{data.crewOrEnterprise ? (
								<div id="fourText">EDITER LES MEMBRES</div>
							) : (
								<div id="fourText">EDITER LES EMPLOYES</div>
							)}
							<div id="fourNbr">
								{nbrRankMap.map(number =>
									editMembres == number ? (
										<button
											id={number + "fourNbr"}
											className="fourNbr"
											style={{ background: data.background, padding: "3px 7px", borderRadius: "3px" }}
											key={number + "fourNbr"}
											onClick={() => changeNbr("fourNbr", number)}>
											{number}
										</button>
									) : (
										<button
											id={number + "fourNbr"}
											className="fourNbr"
											style={{ padding: "3px 7px", borderRadius: "3px" }}
											key={number + "fourNbr"}
											onClick={() => changeNbr("fourNbr", number)}>
											{number}
										</button>
									),
								)}
							</div>
							<div id="five"></div>
							<div id="fiveText">GERER LES PROPRIETES</div>
							<div id="fiveNbr">
								{nbrRankMap.map(number =>
									sendDm == number ? (
										<button
											id={number + "fiveNbr"}
											className="fiveNbr"
											style={{ background: data.background, padding: "3px 7px", borderRadius: "3px" }}
											key={number + "fiveNbr"}
											onClick={() => changeNbr("fiveNbr", number)}>
											{number}
										</button>
									) : (
										<button
											id={number + "fiveNbr"}
											className="fiveNbr"
											style={{ padding: "3px 7px", borderRadius: "3px" }}
											key={number + "fiveNbr"}
											onClick={() => changeNbr("fiveNbr", number)}>
											{number}
										</button>
									),
								)}
							</div>
							<div id="buttonSave">
								<button className="button_valider" style={{ fontSize: 13 }} onClick={handleSubmitGestion}>
									SAUVEGARDER LES PERMISSIONS
								</button>
							</div>
						</React.Fragment>
					)}
					{value == "Propriete" && (
						<React.Fragment>
							<p id="veh">VEHICULES</p>
							<div id="vehLine"></div>
							<div id="vehBox">
								{data.vehs.map(veh => (
									<div key={veh.plate} className="vehMap">
										<p className="vehName">
											<div className="vehLogo"></div>
											{veh.vehName.toUpperCase()}
										</p>
										{veh.pounded ? <p className="pound">FOURRIÈRE</p> : <p></p>}
									</div>
								))}
							</div>
							<p id="hab">HABITATIONS</p>
							<div id="habLine"></div>
							<div id="habBox">
								{data.properties.map(propertie => (
									<div key={propertie.id} className="propMap">
										<p className="propName">
											<div className="propLogo"></div>
											{propertie.type.toUpperCase()} - {propertie.address.toUpperCase()}
										</p>
									</div>
								))}
							</div>
						</React.Fragment>
					)}
				</div>
			</body>
		</html>
	);
}

export default CrewMenuGestion;

// Pas implémenté et pas utilisé
// function or(arg0: boolean) {
// 	throw new Error("Function not implemented.");
// }
