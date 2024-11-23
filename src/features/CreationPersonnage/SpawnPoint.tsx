import React, { useContext, useEffect, useState } from "react";

import Button from "./utils/Button";
import CreationContexte from "./CreationContexte";
import { postAsync } from "../../utils/postAsync";

interface Props {
	onBack: () => void;
}

const SpawnPoint: React.FC<Props> = ({ onBack }) => {
	const array = ["BLAINE COUNTY - PALETO", "BLAINE COUNTY - SANDY SHORE", "LOS SANTOS - VESPUCCI", "LOS SANTOS - GOUVERNEMENT"];
	const htmlArray = [
		"<span><b>Blaine Country</b> Paleto</span>",
		"<span><b>Blaine County</b> Sandy Shore</span>",
		"<span><b>Los Santos</b> Vespucci</span>",
		"<span><b>Los Santos</b> Gouvernement</span>",
	];
	const { setData, data, setCanContinue, setHidden, hidden, catalogue, setHidden2 } = useContext(CreationContexte);
	const [s, sS] = useState(array[0]);
	useEffect(() => {
		setHidden(true);
		setHidden2(false);
	}, []);

	useEffect(() => {
		postAsync("CreationPersonnage", {
			onglet: "lieuapparition",
		});
	}, []);

	return (
		<div className="_colorPicker spawnPoint">
			<div className="header">
				<div className="back" style={{ pointerEvents: "none" }}>
					CRÉATION TERMINÉE
				</div>

				{/* <div className="current">
          <img src="https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/spawn.svg" />
        </div> */}
			</div>
			<div className="Cont">
				<div className="Span">SÉLECTION DU LIEU D'APPARITION</div>

				<div className="SpawnList">
					{array.map((_e, i) => (
						<div className={"Spawn" + (s === _e ? " Selected" : "")} onClick={() => sS(_e)}>
							<img className="Img" src={`https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/${i + 1}.webp`}></img>
							<div className="Name" dangerouslySetInnerHTML={{ __html: htmlArray[i] }}></div>
						</div>
					))}
				</div>

				<div className="Buttons">
					<Button onClick={() => onBack()} type="WARN">
						<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M7 13L1 7L7 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</Button>
					<Button
						onClick={() => {
							postAsync("CreationPersonnage", {
								spawnPoint: s,
							});
						}}
						customStyle={{
							background: "linear-gradient(180deg, #33963C 0%, rgba(30, 180, 90, 0.14) 100%)",
							width: 127,
						}}
						type="SUCCESS">
						<img height="15" width="15" src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/confirm.svg"} alt="" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SpawnPoint;
