import "./style.scss";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import React, { useContext, useState } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { playOnHoverSound } from "../../utils/sounds";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

type Crew = {
	leader: string;
	influence: number;
	color: string;
};

interface Props {
	zone: string;
	location: string;
	crews: Crew[];
	crews_over: "semaine" | "mois" | "global";
	revendication: number;
	crew: string;
}

const MenuTerritoire: React.FC = () => {
	const context = useContext(GlobalContext);
	useExitKeys();

	const _data: Props = isDev
		? {
				zone: "Forum Drive",
				location: "Los Santos",
				crews: [
					{ leader: "Salut c'est greg", influence: 4567, color: "#3737db" },
					{ leader: "83 Hoover Criminals Gang", influence: 4067, color: "#a2a2a3" },
					{ leader: "Ballas", influence: 2067, color: "#37dbce" },
					{ leader: "Los Santos Vagos", influence: 567, color: "#8fdb37" },
					{ leader: "AZTECAS", influence: 67, color: "#db37a7" },
				],
				crews_over: "global",
				revendication: 100,
				crew: "F4L",
			}
		: context.data;

	const [over, setOver] = useState<"semaine" | "mois" | "global">(_data.crews_over);

	const alphaLowered = (color: string, alpha: number) => {
		return color + alpha.toString(16);
	};

	const changeOverValue = (value: "semaine" | "mois" | "global") => {
		setOver(value);
		postAsync("MenuTerritoireOver", { over: value });
	};

	const submit = () => {
		playOnHoverSound();
		postAsync("MenuTerritoireSubmit", { crew: _data.crew, revendication: _data.revendication });
	};

	const renderLeader = (text: string) => {
		// if text is more than 6 characters, display each word initials, if there's a number in the text, display it fully
		const words = text.split(" ");
		const initials = words.map(word => word[0]).join("");
		const numbers = text.match(/\d+/g)?.join("");

		if (numbers) return numbers + " " + initials.replace(numbers[0], "");
		if (text.length > 6) return initials;
		return text;
	};

	return (
		<div className="MenuTerritoire">
			<div className="menu">
				<div className="header">
					<p className="zone">{_data.zone}</p>
					<p className="location">{_data.location}</p>
				</div>
				<div className="body">
					<p className="header">Crews</p>
					<div className="crews">
						{_data.crews.map((crew, index) => (
							<div
								className="crew"
								key={index}
								style={{
									backgroundColor: alphaLowered(crew.color, 150),
								}}>
								{index === 0 && (
									<>
										<div className="rang" style={{ backgroundColor: alphaLowered(crew.color, 175) }}>
											<p className="title">{index + 1}</p>
											<p className="subtitle">Rang</p>
										</div>
										<OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-top"> {crew.leader} </Tooltip>}>
											<div className="leader">
												<p className="title">{renderLeader(crew.leader)}</p>
												<p className="subtitle">Leader</p>
											</div>
										</OverlayTrigger>
										<div className="influence">
											<p className="title">{crew.influence}</p>
											<p className="subtitle">Influence</p>
										</div>
									</>
								)}

								{index !== 0 && (
									<>
										<p className="rang" style={{ backgroundColor: alphaLowered(crew.color, 175) }}>
											{index + 1}
										</p>
										<p className="leader">{crew.leader}</p>
									</>
								)}
							</div>
						))}
					</div>
					<div className="crews_over">
						<p className={`value` + (over === "semaine" ? " active" : "")} onClick={() => changeOverValue("semaine")}>
							Semaine
						</p>
						<p className={`value` + (over === "mois" ? " active" : "")} onClick={() => changeOverValue("mois")}>
							Mois
						</p>
						<p className={`value` + (over === "global" ? " active" : "")} onClick={() => changeOverValue("global")}>
							Global
						</p>
					</div>
				</div>
				<div className="footer">
					<button className="revendication" onClick={submit}>
						<img src={"https://cdn.sacul.cloud/v2/vision-cdn/MenuTerritoire/zone.webp"} />
						<p className="title">Revendiquer la zone</p>
						<p className="content">+{_data.revendication}</p>
					</button>
				</div>
			</div>
		</div>
	);
};

export default MenuTerritoire;
