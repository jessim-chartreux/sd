import "./style.scss";

import React, { useContext } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { useExitKeys } from "../../hooks/useExitKeys";
import useFitText from "../../hooks/useFitText";

function getRandomStringOrIDontKnow(length, characters) {
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

const PPA: React.FC = () => {
	const context = useContext(GlobalContext);
	useExitKeys();

	const ori = getRandomStringOrIDontKnow(7, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
	const cii = getRandomStringOrIDontKnow(10, "0123456789");

	const { fontSize: fontSizeSign, textRef: signRef } = useFitText(20, 134);
	const { fontSize: fontSizeSign2, textRef: signRef2 } = useFitText(20, 113);

	const data: any | null = isDev
		? {
				name: "Alejandro Esteban",
				residence: "Vinewood Hills",
				address: "Los Santos, San Andreas",
				occupation: "Policeman",
				business: "Los Santos Police Department",
				issuer: "Aaron Turner",
				photo: "",
			}
		: context.data;

	console.log(fontSizeSign);

	return (
		<div className="PPA">
			<img src={"https://cdn.sacul.cloud/v2/vision-cdn/PPA/background.webp"} className="Background" />
			<div className="item-container">
				<div className="item">{data.name}</div>
				<div className="item">{data.residence}</div>
				<div className="item">{data.address}</div>
				<div className="item">{data.occupation}</div>
				<div className="item">{data.business}</div>
			</div>
			<div className="inline-item ori">{ori}</div>
			<div className="inline-item cii">{cii}</div>
			<div
				className="signature"
				style={{
					fontSize: `${fontSizeSign}px`,
					whiteSpace: "nowrap",
					width: "134px",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
				ref={signRef}>
				{data.name.replace(/\s/g, "")}
			</div>
			<div
				className="issuer"
				style={{
					fontSize: `${fontSizeSign2}px`,
					whiteSpace: "nowrap",
					width: "113px",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
				ref={signRef2}>
				{data.issuer.replace(/\s/g, "")}
			</div>
			<div
				className="photo "
				style={{
					backgroundImage: `url('${data.photo}')`,
				}}></div>
		</div>
	);
};

export default PPA;
