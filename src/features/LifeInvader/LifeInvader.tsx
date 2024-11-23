import "./LifeInvader.scss";

import React, { useContext } from "react";

import CrossSVG from "./cross.svg";
import { GlobalContext } from "../../app";
import { close } from "../../hooks/useExitKeys";
import { isDev } from "../../utils/isDev";

const LifeInvader: React.FC = () => {
	const context = useContext(GlobalContext);

	const data = isDev
		? {
				access_key: "test",
			}
		: context.data;

	return (
		<>
			<button className="close" onClick={close}>
				Fermer
				<img src={CrossSVG} />
			</button>
			<div className="lifeinvader">
				<img className="tablette" src="https://cdn.sacul.cloud/v2/vision-cdn/mdt/tablette.webp" />

				<iframe
					sandbox="allow-scripts allow-forms allow-pointer-lock allow-same-origin"
					src={`https://lifeinvader.visionrp.fr/login?access_key=${data.access_key}`}
					width={1600}
					height={900}
				/>
			</div>
		</>
	);
};

export default LifeInvader;
