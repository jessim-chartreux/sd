import React, { useContext } from "react";
import "./NurseMenu.scss";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";
import { playOnClickSound } from "../../utils/sounds";

const NurseMenu: React.FC = () => {
	useExitKeys();

	const context = useContext(GlobalContext);

	const data = isDev
		? {
				firstname: "Carlos",
				lastname: "Rodriguez",
				birthdate: "69/69/6969",
				care_cost: 450,
				health: 69,
			}
		: context.data;

	const getHealthBarColor = (health: number) => {
		switch (true) {
			case health >= 75:
				return "linear-gradient(90deg, #34A947 0%, #38DC66 100%)";
			case health >= 35:
				return "linear-gradient(90deg, #FBA804 0%, #FBC504 100%)";
			case health >= 25:
				return "linear-gradient(90deg, #FF0000 0%, #FF3F40 100%)";
			default:
				return "linear-gradient(90deg, #FF0000 0%, #FF6347 100%)";
		}
	};

	const getRandomBloodGroup = () => {
		const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
		return bloodGroups[Math.floor(Math.random() * bloodGroups.length)];
	};

	const getPatientHealthState = (health: number) => {
		switch (true) {
			case health >= 75:
				return "Votre état de santé est correct, nous vous recommandons de consulter un medécin par précaution.";
			case health >= 35:
				return "Votre état de santé est inquiétant, consulter un medécin rapidement.";
			case health >= 25:
				return "Votre état de santé est critique, vous devez consulter un medécin en urgence.";
			default:
				return "Votre état de santé est correct, nous vous recommandons de consulter un medécin par précaution.";
		}
	};

	const handleCarePayment = () => {
		playOnClickSound();
		postAsync("startCare", { cost: data.care_cost });
	};

	return (
		<div id="NurseMenu">
			<div className="Banner">
				<img src="https://cdn.sacul.cloud/v2/vision-cdn/Menu/Nurse/NurseMenu.webp" />
			</div>

			<div className="Content">
				<div className="PatientTop">
					<img src="https://cdn.sacul.cloud/v2/vision-cdn/Menu/Nurse/NurseIcon.webp" />
					<div className="Info">
						<span className="FirstName">{data.firstname}</span>
						<span className="LastName">{data.lastname}</span>
						<div className="HealthBar">
							<div className="Bar" style={{ width: `${data.health}%`, background: getHealthBarColor(data.health) }}></div>
						</div>
					</div>
				</div>

				<div className="PatientButtons">
					<div className="Button">
						<div className="icon">
							<img src="https://cdn.sacul.cloud/v2/vision-cdn/Menu/Nurse/User.webp" />
						</div>
						<span>{data.birthdate}</span>
					</div>
					<div className="Button">
						<div className="icon">
							<img src="https://cdn.sacul.cloud/v2/vision-cdn/Menu/Nurse/Drop.webp" />
						</div>
						<span>Groupe {getRandomBloodGroup()}</span>
					</div>
				</div>

				<div className="PatientHealthState">
					<span>{getPatientHealthState(data.health)}</span>
				</div>

				<div className="PatientBottom">
					<div className="CareCost">
						<span className="Title">Soins</span>
						<span className="Cost">{data.care_cost} $</span>
					</div>

					<button className="PayButton" onClick={handleCarePayment}>
						<h1>E</h1>
						<span>PAYER</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default NurseMenu;
