import "./style.scss";

import React, { useEffect, useState } from "react";

import { ReactSVG } from "react-svg";
import { useExitKeys } from "../../hooks/useExitKeys";

const TabletteLogin: React.FC<any> = ({ changePage }) => {
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLogged(true);
		}, 3000);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			changePage("Main");
		}, 4000);
	}, [changePage]);

	useExitKeys();

	return (
		<>
			<ReactSVG
				className={"DigitalPrint " + (isLogged ? "yellow" : "")}
				src={"https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/empreinte.svg"}
			/>
			<div className="span inser">{!isLogged ? "authentification..." : "authentification réussie"}</div>

			{isLogged ? (
				<div className="checkmark">
					<img src="https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/checkmark_yellow.webp" />
				</div>
			) : (
				<div className="progressBar">
					<div className="track"></div>
				</div>
			)}
		</>
	);
};

export default TabletteLogin;
