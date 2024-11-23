import "./style.scss";

import React, { useContext } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { useExitKeys } from "../../hooks/useExitKeys";
import useFitText from "../../hooks/useFitText";

const PoliceID: React.FC = () => {
	const { fontSize: fontSizeName, textRef: fullNameRef } = useFitText(16, 175);
	const { fontSize: fontSizeSign, textRef: signRef } = useFitText(16, 98);

	const context = useContext(GlobalContext);
	useExitKeys();
	// generate random 3 number
	const data: any | null = isDev
		? {
				service: "lssd",
				name: "Chris Coleman",
				matricule: "69",
				grade: "Sergeant",
				photo: "",
				divisions: "Traffic division, Metro Platoon, K9 Platoon, Air Support Division, Los Santos Police Academy",
			}
		: context.data;

	return (
		<div className="PoliceID">
			<img src={`https://cdn.sacul.cloud/v2/vision-cdn/policebadge/${data.service}-background.webp`} className="Background" />
			<div className="item-container">
				<div
					className="fullname"
					style={{
						fontSize: `${fontSizeName}px`,
						width: "175px",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "",
					}}
					ref={fullNameRef}>
					{data.name}
				</div>
				<div className="matricule">{data.matricule.padStart(3, "0")}</div>
				{data.service !== "usss" && (
					<div className={"matricule-badge " + data.service}>
						<span>{data.matricule.padStart(3, "0")[0]}</span>
						<span>{data.matricule.padStart(3, "0")[1]}</span>
						<span>{data.matricule.padStart(3, "0")[2]}</span>
					</div>
				)}
				<div className="grade">{data.grade}</div>
				<div
					className="signature"
					style={{
						fontSize: `${fontSizeSign}px`,
						width: "98px",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
					ref={signRef}>
					{data.name.replace(/\s/g, "").substring(0, 10)}
				</div>
				<div className={"divisions " + data.service}>
					{"Assigned to the"} {data.divisions}
				</div>
			</div>
			<div
				className={"photo " + data.service}
				style={{
					backgroundImage: `url('${data.photo}')`,
				}}></div>
		</div>
	);
};

export default PoliceID;
