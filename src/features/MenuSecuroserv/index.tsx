import "./style.scss";

import React, { useContext } from "react";
import { playOnClickSound, playOnHoverSound } from "../../utils/sounds";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useExitKeys } from "../../hooks/useExitKeys";

const canDoMission = (userRank, missionRank) => {
	const rankOrder = ["D", "C", "B", "A", "S"];

	if (userRank.toUpperCase() === "S") return true;

	const userRankIndex = rankOrder.indexOf(userRank.toUpperCase());
	const missionRankIndex = rankOrder.indexOf(missionRank.toUpperCase());

	return userRankIndex >= missionRankIndex;
};

const JobCenter: React.FC = () => {
	const context = useContext(GlobalContext);
	const [show, setShow] = React.useState("main");
	const [job, setJob] = React.useState(null);

	const switchShow = (job: any, index: number) => {
		playOnHoverSound();
		setShow(job.name + index);
		if (!Array.isArray(job.instructions)) job.instructions = Object.values(job.instructions);
		setJob(job);
	};
	useExitKeys();

	const data = isDev
		? {
				headerRank: "B",
				pos: 0,
				items: [
					{
						position: { z: 51.0, x: 2447.0, y: 4962.0 },
						available: true,
						limit: 4,
						rank: "D",
						location: "Superrette",
						instructions: {
							"2": "Plante, récolte et transforme des légumes de la ferme",
							"3": "Vend tes légumes à un magasin de proximité",
							"1": "Récupère un ~b~Tracteur auprès de ~g~Charles",
						},
						duration: "35",
						reward: 4500,
						thumbnail: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Sup2.webp",
						positionActive: true,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Sup1.webp",
						maxPlayers: 4,
						name: "Braquage",
					},
					{
						position: { z: 51.0, x: 2447.0, y: 4962.0 },
						available: true,
						limit: 4,
						rank: "C",
						location: "Nautique",
						instructions: {
							"2": "Plante, récolte et transforme des légumes de la ferme",
							"3": "Vend tes légumes à un magasin de proximité",
							"1": "Récupère un ~b~Tracteur auprès de ~g~Charles",
						},
						duration: "15",
						reward: 4500,
						thumbnail:
							"https://cdn.discordapp.com/attachments/1252995650463862846/1258013243117666375/image_337_1.webp?ex=66910ba1&is=668fba21&hm=acc2facafd85c1c882ccbb60670ea86ae2a785aa93461c649564719b03204f20&",
						positionActive: true,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Mer1.webp",
						maxPlayers: 4,
						name: "GoFast",
					},
					{
						position: { z: 51.0, x: 2447.0, y: 4962.0 },
						available: true,
						limit: 4,
						rank: "D",
						location: "Habitations",
						instructions: {
							"2": "Plante, récolte et transforme des légumes de la ferme",
							"3": "Vend tes légumes à un magasin de proximité",
							"1": "Récupère un ~b~Tracteur auprès de ~g~Charles",
						},
						duration: "35",
						reward: 4500,
						thumbnail: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Cambu2.webp",
						positionActive: false,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Cambu1.webp",
						maxPlayers: 4,
						name: "Cambriolage",
					},
					{
						position: { z: 51.0, x: 2447.0, y: 4962.0 },
						available: true,
						limit: 4,
						rank: "B",
						location: "Brinks",
						instructions: {
							"2": "Plante, récolte et transforme des légumes de la ferme",
							"3": "Vend tes légumes à un magasin de proximité",
							"1": "Récupère un ~b~Tracteur auprès de ~g~Charles",
						},
						duration: "35",
						reward: 4500,
						thumbnail: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Brinks2.webp",
						positionActive: true,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Brinks1.webp",
						maxPlayers: 4,
						name: "Braquage",
					},
					{
						position: { z: 51.0, x: 2447.0, y: 4962.0 },
						available: true,
						limit: 4,
						rank: "D",
						location: "Fleeca",
						instructions: {
							"2": "Plante, récolte et transforme des légumes de la ferme",
							"3": "Vend tes légumes à un magasin de proximité",
							"1": "Récupère un ~b~Tracteur auprès de ~g~Charles",
						},
						duration: "35",
						reward: 4500,
						thumbnail: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/fleeca2.webp",
						positionActive: true,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/fleeca1.webp",
						maxPlayers: 4,
						name: "Braquage",
					},
					{
						position: { z: 51.0, x: 2447.0, y: 4962.0 },
						available: true,
						limit: 4,
						rank: "S",
						location: "Vangelico",
						instructions: {
							"2": "Plante, récolte et transforme des légumes de la ferme",
							"3": "Vend tes légumes à un magasin de proximité",
							"1": "Récupère un ~b~Tracteur auprès de ~g~Charles",
						},
						duration: "35",
						reward: 4500,
						thumbnail: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Bijouterie2.webp",
						positionActive: true,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Bijouterie1.webp",
						maxPlayers: 4,
						name: "Braquage",
					},
					{
						position: { z: 51.0, x: 2447.0, y: 4962.0 },
						available: true,
						limit: 4,
						rank: "D",
						location: "Binco",
						instructions: {
							"2": "Plante, récolte et transforme des légumes de la ferme",
							"3": "Vend tes légumes à un magasin de proximité",
							"1": "Récupère un ~b~Tracteur auprès de ~g~Charles",
						},
						duration: "35",
						reward: 4500,
						thumbnail: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Binco1.webp",
						positionActive: true,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Binco2.webp",
						maxPlayers: 4,
						name: "Braquage",
					},
					{
						position: { z: 51.0, x: 2447.0, y: 4962.0 },
						available: true,
						limit: 4,
						rank: "D",
						location: "Sac à main",
						instructions: {
							"2": "Plante, récolte et transforme des légumes de la ferme",
							"3": "Vend tes légumes à un magasin de proximité",
							"1": "Récupère un ~b~Tracteur auprès de ~g~Charles",
						},
						duration: "35",
						reward: 4500,
						thumbnail: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Racket2.webp",
						positionActive: false,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Racket1.webp",
						maxPlayers: 4,
						name: "Vol à l'arraché",
					},
					{
						position: { z: 51.0, x: 2447.0, y: 4962.0 },
						available: true,
						limit: 4,
						rank: "D",
						location: " ",
						instructions: {
							"2": "Plante, récolte et transforme des légumes de la ferme",
							"3": "Vend tes légumes à un magasin de proximité",
							"1": "Récupère un ~b~Tracteur auprès de ~g~Charles",
						},
						duration: "35",
						reward: 4500,
						thumbnail: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Voiture2.webp",
						positionActive: true,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Voiture1.webp",
						maxPlayers: 4,
						name: "Vol vehicules",
					},
					{
						available: true,
						limit: "",
						rank: "A",
						location: "Baie de Los Santos",
						instructions: {
							"2": "Rends toi dans la baie de Los Santos pour pêcher un meximum de poissons ",
							"3": "Vends tes poissons au poissoniers qui se trouvent aux jobs pêche ",
							"1": "Recupère une cane a pêche au LTD",
						},
						duration: "15",
						reward: "2000",
						thumbnail:
							"https://cdn.discordapp.com/attachments/1252995650463862846/1258005355947098132/image_336.webp?ex=668db889&is=668c6709&hm=07866c6dd77fc35e426d80cb193ffee4f267556d1621fac878479266ca44793e&",
						positionActive: false,
						image: "https://cdn.discordapp.com/attachments/1252995650463862846/1258005326850953266/sacs_7.webp?ex=668db882&is=668c6702&hm=16cdbd7f0f4fa976d21b8e73fb04f033b64d1bb18e6a7e00b0032d6e084d64eb&",
						maxPlayers: "10",
						name: "Pêche",
					},
					{
						position: {},
						available: true,
						limit: 4,
						rank: "D",
						location: " ",
						instructions: {
							"2": "Plante, récolte et transforme des légumes de la ferme",
							"3": "Vend tes légumes à un magasin de proximité",
							"1": "Récupère un ~b~Tracteur auprès de ~g~Charles",
						},
						duration: "35",
						reward: 4500,
						thumbnail: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Vente2.webp",
						positionActive: true,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Vente1.webp",
						maxPlayers: 4,
						name: "Vente de drogue",
					},
					{
						position: { z: 51.0, x: 2447.0, y: 4962.0 },
						available: true,
						limit: 4,
						rank: "A",
						location: "Yatch",
						instructions: {
							"2": "Plante, récolte et transforme des légumes de la ferme",
							"3": "Vend tes légumes à un magasin de proximité",
							"1": "Récupère un ~b~Tracteur auprès de ~g~Charles",
						},
						duration: "5",
						reward: 4500,
						thumbnail:
							"https://cdn.discordapp.com/attachments/1256977489725624320/1257289572094578781/image_222.webp?ex=6683dda9&is=66828c29&hm=49f41a4743204475fc0709b1fdc890034f899cc08c60888871b709e98e47994b&",
						positionActive: true,
						image: "https://cdn.discordapp.com/attachments/1252995650463862846/1260968615277236377/sacs_1.webp?ex=66914009&is=668fee89&hm=b756134600abdd43457b140906c5947d2a761f9bd9e3a5ecbfe2ecec1273cd48&",
						maxPlayers: 4,
						name: "Braquage",
					},
					{
						position: { z: 51.0, x: 2447.0, y: 4962.0 },
						available: true,
						limit: 4,
						rank: "B",
						location: " ",
						instructions: {
							"2": "Plante, récolte et transforme des légumes de la ferme",
							"3": "Vend tes légumes à un magasin de proximité",
							"1": "Récupère un ~b~Tracteur auprès de ~g~Charles",
						},
						duration: "35",
						reward: 4500,
						thumbnail: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Gofast2.webp",
						positionActive: true,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Gofast1.webp",
						maxPlayers: 4,
						name: "Gofast",
					},
					{
						position: { z: 51.0, x: 2447.0, y: 4962.0 },
						available: true,
						limit: 4,
						rank: "D",
						location: " ",
						instructions: {
							"2": "Plante, récolte et transforme des légumes de la ferme",
							"3": "Vend tes légumes à un magasin de proximité",
							"1": "Récupère un ~b~Tracteur auprès de ~g~Charles",
						},
						duration: "5",
						reward: 4500,
						thumbnail: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Vol2.webp",
						positionActive: true,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Vol1.webp",
						maxPlayers: 4,
						name: "Racket",
					},
					{
						position: { z: 51.0, x: 2447.0, y: 4962.0 },
						available: true,
						limit: 4,
						rank: "C",
						location: "ATM",
						instructions: {
							"2": "Plante, récolte et transforme des légumes de la ferme",
							"3": "Vend tes légumes à un magasin de proximité",
							"1": "Récupère un ~b~Tracteur auprès de ~g~Charles",
						},
						duration: "35",
						reward: "2000",
						thumbnail: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Atm2.webp",
						positionActive: true,
						image: "https://cdn.sacul.cloud/v2/vision-cdn/SecuroServ/Atm1.webp",
						maxPlayers: 4,
						name: "Braquage",
					},
					/* {
						name: "Ferme",
						location: "Grapeseed",
						rank: "D",
						duration: "35",
						reward: 4500,
						available: true,
						risk: 3,
						limit: 4,
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1260742904268460042/Job_Center.webp?ex=66906dd3&is=668f1c53&hm=cdf86d7ab17169cf7f081f72ed5645a8b2dce4813d86ff0b76424548946f7bf3&",
						thumbnail:
							"https://cdn.discordapp.com/attachments/1208060961404092507/1260742904268460042/Job_Center.webp?ex=66906dd3&is=668f1c53&hm=cdf86d7ab17169cf7f081f72ed5645a8b2dce4813d86ff0b76424548946f7bf3&",
						instructions: [
							"Récupère un ~b~Tracteur auprès de ~g~Charles",
							"Plante, récolte et transforme des légumes de la ferme",
							"Vend tes légumes à un magasin de proximité",
						],
						pos: 1,
					},
					{
						name: "Pêche",
						location: "Océan",
						rank: "D",
						duration: "35",
						reward: 450,
						risk: 1,
						limit: 4,
						available: true,
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1260742904268460042/Job_Center.webp?ex=66906dd3&is=668f1c53&hm=cdf86d7ab17169cf7f081f72ed5645a8b2dce4813d86ff0b76424548946f7bf3&",
						thumbnail:
							"https://cdn.discordapp.com/attachments/1208060961404092507/1260742904268460042/Job_Center.webp?ex=66906dd3&is=668f1c53&hm=cdf86d7ab17169cf7f081f72ed5645a8b2dce4813d86ff0b76424548946f7bf3&",
						instructions: [],
						pos: 1,
					},
					{
						name: "Chasse",
						location: "Mont chiliad",
						rank: "A",
						duration: "35",
						reward: 450,
						risk: 2,
						limit: 4,
						available: true,
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1260742904268460042/Job_Center.webp?ex=66906dd3&is=668f1c53&hm=cdf86d7ab17169cf7f081f72ed5645a8b2dce4813d86ff0b76424548946f7bf3&",
						thumbnail:
							"https://cdn.discordapp.com/attachments/1208060961404092507/1260742904268460042/Job_Center.webp?ex=66906dd3&is=668f1c53&hm=cdf86d7ab17169cf7f081f72ed5645a8b2dce4813d86ff0b76424548946f7bf3&",
						instructions: [
							"Munis toi d'un ~b~Mousquet et d'un ~b~Couteau~s~ à l' ~o~Ammu-nation",
							"Active ta ~r~zone ~r~de ~r~chasse en passant par ~g~Michael",
							"Vends ta viande à ~g~Jacquie",
						],
						pos: 1,
					},
					{
						name: "Bucheron",
						location: "Paleto bay",
						rank: "F",
						duration: "35",
						available: false,
						reward: 450,
						risk: 1,
						limit: 4,
						image: "",
						thumbnail: "",
						instructions: [],
						pos: 1,
					},
					{
						name: "Eboueur",
						location: "Casse automobile",
						rank: "D",
						duration: "35",
						reward: 450,
						risk: 1,
						limit: 4,
						available: true,
						image: "",
						thumbnail: "",
						instructions: [],
						pos: 1,
					}, */
				],
			}
		: context.data;

	const colors = {
		b: "#3498db",
		g: "#2ecc71",
		v: "#2ecc71",
		o: "#e67e22",
		r: "#e74c3c",
		y: "#fbbf24",
		j: "#fbbf24",
	};

	const returnCb = () => {
		if (show !== "main") {
			playOnClickSound();
			setShow("main");
			setJob(null);
		}
	};

	useBackspaceKey(returnCb);

	const selectMision = () => {
		playOnClickSound();
		postAsync("selectMission", job.name);
	};

	const sortJob = (jobsList: any) => {
		const jobs = [];
		// sort jobList by element.rank from A to Z

		jobsList.forEach(element => {
			if (element.available && element.rank === "D") {
				jobs.push(element);
			}
		});

		jobsList.forEach(element => {
			if (element.available && element.rank === "C") {
				jobs.push(element);
			}
		});

		jobsList.forEach(element => {
			if (element.available && element.rank === "B") {
				jobs.push(element);
			}
		});

		jobsList.forEach(element => {
			if (element.available && element.rank === "A") {
				jobs.push(element);
			}
		});

		jobsList.forEach(element => {
			if (element.available && element.rank === "S") {
				jobs.push(element);
			}
		});

		jobsList.forEach(element => {
			if (!element.available) {
				jobs.push(element);
			}
		});
		console.log(jobs);
		return jobs;
	};
	return (
		<div className="Securoserv">
			<div className="VisionMenu" style={{ width: 485, height: "fit-content" }}>
				<div className="VisionMenu-header">
					<img
						className="VisionMenu-headerImage"
						onClick={() => returnCb()}
						src={"https://cdn.sacul.cloud/v2/vision-cdn/headers/securoserv.webp"}
					/>
					<div className="VisionMenu-boutique">
						<span className="rank">RANG</span>
						<span className="rank-value">{data.headerRank}</span>
						{/* <span className="rank">Mission</span>
						<img src={"https://cdn.sacul.cloud/v2/vision-cdn/securoserv/gros_gun_sa_mere.webp")} /> */}
					</div>
				</div>
				<div className="VisionMenu-listContainer" style={{ maxHeight: 480, minHeight: 480 }}>
					{show === "main" ? (
						<div className="VisionMenu-buttonElementContainer">
							{sortJob(data.items).map((job, index: number) => (
								<div
									key={job.name + index}
									className={`VisionMenu-buttonElement coverBackground small`}
									style={{ backgroundImage: `url(${job.image})`, cursor: job.available ? "pointer" : "default" }}
									onClick={() => (job.available ? switchShow(job, index) : null)}>
									<div className="Name">{job.name}</div>
									<div className="SubName">{job.location}</div>
									<div className="info">
										{job.available ? (
											<>
												<p className="dollar">{job.reward}</p>
												<p>
													{job.rank}{" "}
													<img width={13} src={"https://cdn.sacul.cloud/v2/vision-cdn/securoserv/arrow.svg"} />
												</p>
											</>
										) : (
											<p className="unavailable">Bientôt Disponible</p>
										)}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="jobInfo">
							<h2>
								{job?.name}
								<span className="location">
									{job?.location}
									<img width={10} src={"https://cdn.sacul.cloud/v2/vision-cdn/icons/ping.webp"} />
								</span>
							</h2>
							<img src={job?.thumbnail} alt="Il manque une image là je crois mdrrr" />
							<div className="infosContainer">
								<div className="stats">
									<p>
										Gains <span className="dollar">{job?.reward}</span>
									</p>
									<p>
										Durée{" "}
										<span>
											{job?.duration}&apos;{" "}
											<img width={20} src={"https://cdn.sacul.cloud/v2/vision-cdn/icons/clock.webp"} />
										</span>
									</p>
									<p>
										Rang{" "}
										<span>
											{job?.rank}{" "}
											<img width={20} src={"https://cdn.sacul.cloud/v2/vision-cdn/securoserv/arrow.svg"} />
										</span>
									</p>
									<p>
										Risques{" "}
										<span className="risk">
											{[...Array(job?.risk || 1)].map((_, i) => (
												<img key={i} width={24} src={"https://cdn.sacul.cloud/v2/vision-cdn/securoserv/star.svg"} />
											))}
										</span>
									</p>
									{/* 
									<p>
										Joueurs{" "}
										<span>
											{job?.maxPlayers || 4} <img width={24} src={UserIcon} />
										</span>
									</p> */}
								</div>
								<div className="instructions">
									<ul>
										{job?.instructions.map((instruction: string, index: number) => (
											<li key={index}>
												{instruction.split(" ").map((word: string, i: number) =>
													word.startsWith("~") ? (
														<span key={i} style={{ color: colors[word.match(/~(.*)~/)?.[1]] }}>
															{word.replace(/~(.*)~/, "") + " "}
														</span>
													) : (
														word + " "
													),
												)}
											</li>
										))}
									</ul>
								</div>
							</div>

							<div className="footer">
								<div className="interactions">
									<div className="buttonSection">
										<button
											className={"button " + (!job.positionActive ? "nopos" : "")}
											onClick={selectMision}
											disabled={!canDoMission(data.headerRank, job.rank)}>
											<img
												src={"https://cdn.sacul.cloud/v2/vision-cdn/securoserv/case.svg"}
												alt="oh t'accepte ou pas ?"
											/>
											{!job.positionActive
												? "Mission disponible"
												: canDoMission(data.headerRank, job.rank)
													? "Lieu de la mission"
													: "Rang insuffisant"}
										</button>
										<div className="xp">{job.reward > 0 && data.headerRank <= job.rank ? `+${job.reward}` : ""}</div>
									</div>
									<div className="rankSection">
										<span className="rank">Rang actuel</span>
										<span className="rank-value">{data.headerRank}</span>
									</div>
								</div>
								{!canDoMission(data.headerRank, job.rank) ? (
									<div className="helper">TERMINE LES MISSIONS DE TON RANG POUR DEBLOQUER CETTE MISSION</div>
								) : null}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default JobCenter;
