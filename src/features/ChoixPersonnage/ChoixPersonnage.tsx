import "./style.scss";

import React, { useContext, useState } from "react";

import Button from "../../components/UI/Button/Buttton";
import { GlobalContext } from "../../app";
import { close } from "../../hooks/useExitKeys";
import { isDev } from "../../utils/isDev";
import { playOnHoverSound } from "../../utils/sounds";
import { postAsync } from "../../utils/postAsync";

const ChoixPersonnage: React.FC = () => {
	const context = useContext(GlobalContext);
	const [selected, setSelected] = useState(null);

	const data: any | null = isDev
		? {
				characterList: [
					{
						id: 1,
						name: "Marcus SHEEESH Paw",
					},
					{
						id: 2,
						name: "Walto O'neil",
					},
				],
			}
		: context.data;

	return (
		<div className={"ChoixPersonnage "}>
			<div className="menu">
				<header className="menu__header">
					<img src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/header.jpg"} alt="" />
				</header>

				<div className={"menu__content"}>
					<div className="Span">SÉLECTION DU PERSONNAGE</div>
					<div className="List">
						{(data?.characterList ?? []).map(e => (
							<div
								key={e.id}
								className={"El" + (selected === e.id ? " selected" : "")}
								onClick={() => {
									setSelected(e.id);
									playOnHoverSound();
									postAsync("ChoixPersonnage", {
										preSelected: data.characterList.find(_e => _e.id === e.id),
									});
								}}>
								<div className="Left">{e.id}</div>
								<div className="Right">{e.name}</div>
							</div>
						))}
					</div>

					<Button
						margin={"auto auto 10px"}
						callback={() => postAsync("ChoixPersonnage", { selected: data.characterList.find(e => e.id === selected) })}
						color={"green"}
						width={300}
						height={30}
						fontSize={12}
						fontWeight={600}
						label="CHANGER MON PERSONNAGE"
						selected={false}
						submitSound={true}
					/>
					<Button
						margin={"0px auto 20px"}
						callback={() => {
							postAsync("CloseChoixPersonnage");
							close();
						}}
						color={"red"}
						width={250}
						height={30}
						fontSize={12}
						fontWeight={600}
						label="ANNULER"
						selected={false}
						submitSound={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default ChoixPersonnage;
