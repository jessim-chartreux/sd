import "./CardNewsSocietyShow.scss";

import React, { useContext, useEffect } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

interface INotifEntreprise {
	name?: string;
	logo?: string;
	phone?: string;
	message?: string;
	typeannonce?: string;
}

const CardNewsSocietyShow: React.FC = () => {
	const context = useContext(GlobalContext);
	useExitKeys();

	const data: INotifEntreprise | null = isDev
		? {
				name: "Ammunation",
				logo: "https://cdn.sacul.cloud/v2/vision-cdn/other/logo_dynasti.webp",
				phone: "4321",
				message: "Ammunation test notification bla bla bla plus d'espace",
				typeannonce: "INFORMATION",
			}
		: (context.data as INotifEntreprise);

	useEffect(() => {}, []);

	const handleClose = async () => {
		await postAsync("notificationSociety_callback", {});

		setTimeout(() => {}, 8000);
	};

	handleClose;
	return (
		/* <div className="preview"> */
		<div className="showAnnonce">
			<div className="main">
				<div className="img">
					<img src={data.logo} />
				</div>
				<div className="infos">
					<div className="name">{data.name}</div>
					<div className={data.typeannonce.toLowerCase()}>{data.typeannonce.toUpperCase()}</div>
					<div className="message">{data.message}</div>
					<div className="phone">{data.phone}</div>
					<img className="phonelogo" src="https://cdn.sacul.cloud/v2/vision-cdn/icons/green-phone.webp"></img>
				</div>
			</div>
			<div className="cProgressbar">
				<div className="track"></div>
			</div>
		</div>
		/* </div> */
	);
};

export default CardNewsSocietyShow;
