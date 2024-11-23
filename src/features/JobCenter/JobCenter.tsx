import "./style.scss";

import React, { useContext } from "react";
import { playOnClickSound, playOnHoverSound } from "../../utils/sounds";

import { GlobalContext } from "../../app";
import { SERVER } from "../../config";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useExitKeys } from "../../hooks/useExitKeys";

const JobCenter: React.FC = () => {
	const context = useContext(GlobalContext);
	const [show, setShow] = React.useState("main");
	const [job, setJob] = React.useState(null);

	const switchShow = (job: any) => {
		playOnHoverSound();
		setShow(job.name);
		if (!Array.isArray(job.instructions)) job.instructions = Object.values(job.instructions);
		setJob(job);
	};

	useExitKeys();

	const data = isDev
		? {
				headerIcon: "https://cdn.sacul.cloud/v2/vision-cdn/icons/image_homme.webp",
				headerIconName: "Job Center",
				premium: 0,
				items: [
					{
						name: "Ferme",
						location: "Grapeseed",
						duration: 35,
						reward: 4500,
						maxPlayers: 4,
						available: false,
						premium: false,
						limit: 4,
						image: "https://cdn.discordapp.com/attachments/667855303840235531/1148081756067594352/image.webp",
						thumbnail: "https://cdn.discordapp.com/attachments/667855303840235531/1148088888582213692/image.webp",
						instructions: [
							"Récupère un ~b~Tracteur auprès de ~g~Charles",
							"Plante, récolte et transforme des légumes de la ferme",
							"Vend tes légumes à un magasin de proximité",
						],
					},
					{
						name: "Pêche",
						location: "Océan",
						duration: 35,
						reward: 450,
						maxPlayers: 4,
						available: true,
						premium: false,
						limit: 4,
						image: "https://cdn.discordapp.com/attachments/667855303840235531/1148079746912096357/image.webp",
						thumbnail: "https://cdn.discordapp.com/attachments/667855303840235531/1148088888582213692/image.webp",
						instructions: [],
					},
					{
						name: "Chasse",
						location: "Mont chiliad",
						duration: 35,
						reward: 450,
						maxPlayers: 2,
						available: true,
						premium: true,
						limit: 4,
						image: "https://cdn.discordapp.com/attachments/667855303840235531/1148086176452988958/image.webp",
						thumbnail: "https://cdn.discordapp.com/attachments/667855303840235531/1148088922715455509/image.webp",
						instructions: [
							"Munis toi d'un ~b~Mousquet et d'un ~b~Couteau~s~ à l' ~o~Ammu-nation",
							"Active ta ~r~zone ~r~de ~r~chasse en passant par ~g~Michael",
							"Vends ta viande à ~g~Jacquie",
						],
					},
					{
						name: "Bucheron",
						location: "Paleto bay",
						duration: 35,
						maxPlayers: 4,
						available: false,
						premium: true,
						reward: 450,
						image: "https://cdn.discordapp.com/attachments/667855303840235531/1148086206782001272/image.webp",
						thumbnail: "https://cdn.discordapp.com/attachments/667855303840235531/1148088922715455509/image.webp",
						instructions: [],
					},
					{
						name: "Eboueur",
						location: "Casse automobile",
						duration: 35,
						reward: 450,
						maxPlayers: 3,
						available: true,
						premium: true,
						image: "https://cdn.discordapp.com/attachments/667855303840235531/1148086231939436574/image.webp",
						thumbnail: "https://cdn.discordapp.com/attachments/667855303840235531/1148088922715455509/image.webp",
						instructions: [],
					},
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

	const returnCB = () => {
		if (show !== "main") {
			playOnClickSound();
			setShow("main");
			setJob(null);
		}
	};

	useBackspaceKey(returnCB);

	const selectJob = () => {
		playOnClickSound();
		postAsync("selectJob", job.name);
	};

	const sortJob = (jobsList: any) => {
		const jobs = [];
		jobsList.forEach(element => {
			if (element.available && !element.premium) {
				jobs.push(element);
			}
		});
		jobsList.forEach(element => {
			if (element.available && element.premium) {
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
		<div className="JobCenter">
			<div className="VisionMenu" style={{ width: 485, height: "fit-content" }}>
				<div className="VisionMenu-header">
					<img
						className="VisionMenu-headerImage"
						onClick={() => returnCB()}
						src="https://cdn.sacul.cloud/v2/vision-cdn/headers/jobcenter.webp"
					/>
					<div className="VisionMenu-boutique">
						<img src={data.headerIcon} />
						<span>{data.headerIconName}</span>
					</div>
				</div>
				<div className="VisionMenu-listContainer" style={{ maxHeight: 480, minHeight: 480 }}>
					{show === "main" ? (
						<div className="VisionMenu-buttonElementContainer">
							{sortJob(data.items).map((job, index) => (
								<div
									key={index}
									className={`VisionMenu-buttonElement coverBackground small`}
									style={{ backgroundImage: `url(${job.image})`, cursor: job.available ? "pointer" : "default" }}
									onClick={() => (job.available ? switchShow(job) : null)}>
									<div className="Name">{job.name}</div>
									<div className="SubName">{job.location}</div>
									<div className="info">
										{job.available ? (
											<>
												{job.premium && data.premium === 1 && (
													<>
														<p className="players">
															{job.maxPlayers || 4}
															<img width={18} src="https://cdn.sacul.cloud/v2/vision-cdn/svg/user.svg" />
														</p>

														<p className="dollar">{job.reward}</p>
														<p>
															{job.duration}&apos;{" "}
															<img width={16} src="https://cdn.sacul.cloud/v2/vision-cdn/icons/clock.webp" />
														</p>
													</>
												)}

												{!job.premium && (
													<>
														<p className="players">
															{job.maxPlayers || 4}
															<img width={18} src="https://cdn.sacul.cloud/v2/vision-cdn/svg/user.svg" />
														</p>

														<p className="dollar">{job.reward}</p>
														<p>
															{job.duration}&apos;{" "}
															<img width={16} src="https://cdn.sacul.cloud/v2/vision-cdn/icons/clock.webp" />
														</p>
													</>
												)}

												{job.premium && data.premium === 0 && (
													<p className="unavailable premium">
														Métier {SERVER === "FA" ? "Premium" : "Subscriber"}
													</p>
												)}
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
									<img width={10} src="https://cdn.sacul.cloud/v2/vision-cdn/icons/ping.webp" />
								</span>
							</h2>
							<img src={job?.thumbnail} />
							<div className="infosContainer">
								<div className="stats">
									<p>
										Gains <span className="dollar">{job?.reward}</span>
									</p>
									<p>
										Durée{" "}
										<span>
											{job?.duration}&apos;{" "}
											<img width={20} src="https://cdn.sacul.cloud/v2/vision-cdn/icons/clock.webp" />
										</span>
									</p>
									<p>
										Limite{" "}
										<span>
											{job?.limit}{" "}
											<img width={20} src="https://cdn.sacul.cloud/v2/vision-cdn/icons/chevron_up.webp" />
										</span>
									</p>
									<p>
										Joueurs{" "}
										<span>
											{job?.maxPlayers || 4}{" "}
											<img width={24} src="https://cdn.sacul.cloud/v2/vision-cdn/svg/user.svg" />
										</span>
									</p>
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

							{!job.premium && <button onClick={selectJob}>Selectionner ce metier</button>}

							{job.premium && data.premium === 1 && <button onClick={selectJob}>Selectionner ce metier</button>}

							{job.premium && data.premium === 0 && (
								<>
									<button className="disabled">Selectionner ce metier</button>
									<p className="unavailable premium">
										Vous devez être {SERVER === "FA" ? "Premium" : "Subscriber"} pour faire ce métier.
									</p>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default JobCenter;
