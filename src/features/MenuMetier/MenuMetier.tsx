import "./style.scss";
import "react-circular-progressbar/dist/styles.css";

import React, { useContext, useState } from "react";

import Button from "../../components/UI/Button/Buttton";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { playOnHoverSound } from "../../utils/sounds";
import { postAsync } from "../../utils/postAsync";
import { setArrayLength } from "../../utils/utils";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuMetier: React.FC = () => {
	const [selected, setSelected] = useState(null);
	const context = useContext(GlobalContext);
	useExitKeys();

	const data: any = isDev
		? {
				headerBanner: "https://cdn.sacul.cloud/v2/vision-cdn/MenuMetier/peche.webp",
				choice: {
					label: "Location de bateaux",
					isOptional: true,
					choices: [
						{
							id: 1,
							label: "100$",
							img: "https://cdn.sacul.cloud/v2/vision-cdn/placeholder.webp",
						},
					],
				},
				callbackName: "MetierPeche",
			}
		: context.data;

	return (
		<div className="MenuMetier">
			<img src={data.headerBanner} className="Header" />
			<div className="ChoiceLabel">
				{data.choice.label.toUpperCase()}
				{data.choice.isOptional && <div className="Optional">OPTIONNEL</div>}
			</div>
			<div className="Choices">
				{setArrayLength(data.choice.choices, 3).map((choice, index) => (
					<div
						key={"key" + index}
						className={
							choice?.isPlaceholder
								? "VisionMenu-placeholder"
								: "VisionMenu-item " + (selected === choice.id ? "selected" : "")
						}
						onClick={() => {
							postAsync(data.callbackName, {
								choice,
								type: selected === choice.id ? "deselection" : "selection",
							});
							setSelected(selected === choice.id ? null : choice.id);
							if (!choice?.isPlaceholder) playOnHoverSound();
						}}>
						{!choice?.isPlaceholder && (
							<>
								<img src={choice.img} />
								<div className={"VisionMenu-name "}>{choice.label ?? choice.price + " $"}</div>
							</>
						)}
						{choice?.isPlaceholder && (
							<>
								<div className={"VisionMenu-placeholder "}></div>
							</>
						)}
					</div>
				))}
			</div>
			<div className="Buttons">
				<Button
					color="green"
					fontWeight={700}
					fontSize={12}
					label={"COMMENCER L'ACTIVITÉ"}
					width={250}
					height={25}
					margin={"10px auto"}
					callback={() => {
						postAsync(data.callbackName, {
							button: "start",
							selected: data.choice.choices.find(e => e.id === selected),
						});
					}}
					disabled={!data.choice.isOptional && !selected}
				/>

				<Button
					color="red"
					fontWeight={700}
					fontSize={12}
					label={"ARRÊTER L'ACTIVITÉ"}
					width={210}
					height={25}
					margin={"10px auto"}
					callback={() => {
						postAsync(data.callbackName, {
							button: "stop",
						});
					}}
				/>
			</div>
		</div>
	);
};

export default MenuMetier;
