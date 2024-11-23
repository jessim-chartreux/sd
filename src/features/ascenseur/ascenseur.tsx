import "./ascenseur.scss";

import React, { useContext, useState } from "react";

import { GlobalContext } from "../../app";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const Ascenseur = () => {
	const [selected, setSelected] = useState("");
	const context = useContext(GlobalContext);
	const [value, setValue] = useState(context.data.floor || "00");

	useExitKeys();

	const startSelected = v => {
		postAsync("elevator__callback", {
			floor: v.name,
		});

		setSelected(v.name);
		setTimeout(() => {
			setSelected("");
			setValue(v.value);
		}, 2500);
	};

	const Button = (props: { name?: string; icon?: any; value?: string; borderColor?: string }) => {
		return (
			<div
				style={{ borderColor: props.borderColor ? props.borderColor : "#e4a045", color: "#e4a045" }}
				className={props.name == selected ? "button active" : "button"}
				onClick={() => {
					startSelected(props);
				}}>
				{props.name && <p>{props.name}</p>}
				{props.icon && <img style={{ height: 17.5 }} src={props.icon} />}
			</div>
		);
	};

	return (
		<div id="ascenseur">
			<div className="viewer">
				<p
					style={{
						position: "absolute",
						fontFamily: "ds-digib",
						fontSize: 100,
						color: "#4D383B",
						zIndex: 0,
						opacity: 0.45,
					}}>
					88
				</p>

				<p
					style={{
						fontFamily: "ds-digib",
						fontSize: 100,
						color: "#EE190D",
						zIndex: 1,
						textShadow: "0px 0px 6px #EE170E66",
					}}>
					{value}
				</p>
			</div>

			<div className="buttons">
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 13,
					}}>
					<Button name="5" value="05" />
					<Button name="6" value="06" />
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 13,
					}}>
					<Button name="3" value="03" />
					<Button name="4" value="04" />
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 13,
					}}>
					<Button name="1" value="01" />
					<Button name="2" value="02" />
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 13,
					}}>
					<Button name="-1" value="-1" />
					<Button name="0" value="00" />
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 13,
					}}>
					<Button name="-3" value="-3" />
					<Button name="-2" value="-2" />
				</div>

				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 20,
					}}>
					<Button borderColor="#32c45a" icon="https://cdn.sacul.cloud/vision-cdn/icons/bouton_vert.webp?zoom=125" />
					<Button borderColor="#d9392c" icon="https://cdn.sacul.cloud/vision-cdn/icons/bouton_rouge.webp?zoom=125" />
					<Button borderColor="#529098" icon="https://cdn.sacul.cloud/vision-cdn/icons/bouton_bleu.webp?zoom=125" />
				</div>

				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: 80,
						padding: 10,
						width: "calc(95% - 20px)",
					}}>
					<img style={{ height: 90 }} src="https://cdn.sacul.cloud/vision-cdn/icons/grille.webp" />
				</div>
			</div>
		</div>
	);
};

export default Ascenseur;
