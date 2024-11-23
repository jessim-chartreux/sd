import "./style.scss";

import React, { useContext } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { useExitKeys } from "../../hooks/useExitKeys";

const PermisConduire: React.FC = () => {
	const context = useContext(GlobalContext);

	useExitKeys();

	const data: any | null = isDev
		? {
				dl: 2515,
				exp: "15/09/2023",
				ln: "NALANI",
				fn: "KAA",
				dob: "23/07/2001",
				class: "C, A",
				sex: "F",
				hair: "brun",
				eyes: "verts",
				hgt: 169,
				wgt: 60,
				iss: "15/03/2024",
				img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
				isDonnor: false,
			}
		: context.data;

	return (
		<div className="PermisConduire">
			<img src="https://cdn.sacul.cloud/v2/vision-cdn/PermisConduire/background.webp" className="Background" />
			{Object.entries(data).map(e => {
				if (e[0] !== "img" && e[0] !== "isDonnor") {
					return (
						<div key={e[0]} className={e[0] + " Element"}>
							<div className="Span">{e[0]}</div>
							<div className="Value">{String(e[1])}</div>
						</div>
					);
				}
			})}
			<img src={data.img} className="Photo" />
			{data.isDonnor && <div className="Donnor">DONNOR</div>}
		</div>
	);
};

export default PermisConduire;
