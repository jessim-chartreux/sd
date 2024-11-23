import "swiper/swiper-bundle.css";
import "./mdt.scss";

import CrossSVG from "./cross.svg";
import React from "react";
import { close } from "../../hooks/useExitKeys";

const Mdt: React.FC = () => {
	return (
		<>
			<button className="close" onClick={close}>
				Fermer
				<img src={CrossSVG} />
			</button>
			<div className="mdt">
				<img className="tablette" src="https://cdn.sacul.cloud/v2/vision-cdn/mdt/tablette.webp" />

				<iframe
					sandbox="allow-scripts allow-forms allow-pointer-lock allow-same-origin"
					src="https://mdt.lspd-vision.fr/index_fa"
					width={1600}
					height={900}></iframe>
			</div>
		</>
	);
};

export default Mdt;
