import "./casiers.scss";

import React, { useContext, useState } from "react";
import { close, useExitKeys } from "../../hooks/useExitKeys";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";

const Casiers: React.FC = () => {
	const context = useContext(GlobalContext);
	useExitKeys();

	const getElements = (count: number) => {
		const elements = [];
		for (let i = 1; i <= count; i++) {
			elements.push({ numero: i });
		}
		return elements;
	};

	const [elements, _setElements] = useState(isDev ? getElements(199) : getElements(context.data.count || 0));
	const [selected, setSelected] = useState(1);

	const Elements = (props: { numero: number }) => {
		return (
			<div
				className="element"
				onClick={() => {
					setSelected(props.numero);
					postAsync("casier__callback", {
						numero: props.numero,
					});
					close();
				}}>
				<p
					style={{
						textAlign: "center",
						fontSize: 13,
						letterSpacing: "0px",
						opacity: 1,
						marginBottom: -5,
					}}>
					CASIER N°
				</p>

				<p
					style={{
						textAlign: "center",
						letterSpacing: "0px",
						fontSize: 40,
						fontWeight: 600,
						margin: 0,
					}}>
					{props.numero}
				</p>
			</div>
		);
	};

	return (
		<div id="casiers">
			<div className="header">Vestiaires</div>

			<div className="subheader">
				<p>Vestiaires</p>
				<p>
					{selected}/{elements.length}
				</p>
			</div>

			<div className="content">
				{elements.map((v, k) => {
					return <Elements key={k} {...v} />;
				})}
			</div>

			<div className="footer">
				<img
					style={{ height: 15 }}
					src="https://cdn.discordapp.com/attachments/970844319110037564/1009263065063243857/sort-arrows-couple-pointing-up-and-down2x.webp?ex=66036d79&is=65f0f879&hm=f294a77d242bb3cf787da422150be19eb9bab44798a33cb2b8f9e7440022f75e&"
				/>
			</div>
		</div>
	);
};

export default Casiers;
