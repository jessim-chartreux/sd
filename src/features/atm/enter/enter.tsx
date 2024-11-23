import "./enter.scss";

import React from "react";
import { TiUserAdd } from "react-icons/ti";
import { close } from "../../../hooks/useExitKeys";
import { postAsync } from "../../../utils/postAsync";

interface IAtmEnterProps {
	onNext: () => void;
}

const AtmEnter: React.FC<IAtmEnterProps> = ({ onNext }) => {
	const createAccount = async () => {
		await postAsync("createAccount_callback", {
			createAccount: true,
		});
	};

	return (
		<div className="atm_enter_enter" style={{ position: "relative" }}>
			<div className="atm_enter_container">
				<div className="atm_enter_header d-flex justify-content-between">
					<div className="atm_enter_header_logo mt-4 d-flex justify-content-center align-items-center">
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/atm/fleeca_x1000.webp" alt="Fleeca Logo" />
					</div>

					<div className="atm_enter_header_exit mt-4 d-flex justify-content-center align-items-center" onClick={close}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/atm/exit_x24.webp" alt="Exit icon" />
					</div>
				</div>
				<div className="atm_enter_hero d-flex justify-content-center align-items-center">
					<h1>Veuillez vous connecter à votre compte à l'aide de votre empreinte digitale.</h1>
				</div>
				<div className="atm_enter_fignerprint d-flex justify-content-center align-items-center">
					<img src="https://cdn.sacul.cloud/v2/vision-cdn/atm/fingerprint_x64.webp" alt="Fingerprint icon" onClick={onNext} />
				</div>
			</div>
			<div className="Add_acount">
				<div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
					<div style={{ flex: 0.5, justifyContent: "center", alignItems: "flex-end", display: "flex" }}>
						<TiUserAdd color="white" size={26} style={{}} />
					</div>
					<div style={{ flex: 0.5, display: "flex", justifyContent: "center", alignItems: "center" }}>
						<h2
							onClick={() => {
								createAccount();
							}}>
							Créer un compte
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AtmEnter;
