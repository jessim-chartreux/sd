import "./style.scss";

import React, { useContext, useState } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { playOnHoverSound } from "../../utils/sounds";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuPlaque: React.FC = () => {
	useExitKeys();
	const context = useContext(GlobalContext);

	const data = isDev
		? {
				current: "57AED245",
				message: "Premium",
				header: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPlaque/banner.webp",
			}
		: context.data;

	const [curr, setCurr] = useState(data?.current ?? "");

	const handleClick = async () => {
		playOnHoverSound();
		postAsync("menuPlaque", { text: curr });
	};

	return (
		<div className="MenuPlaque">
			<img src={data.header} className="Banner" />
			<h1>Changement de plaque</h1>
			<div className="Plaque">
				<img src={`https://cdn.sacul.cloud/v2/vision-cdn/MenuPlaque/plaque.webp`} />
				<input
					disabled={!!data.currentOrder}
					maxLength={8}
					type="text"
					value={data.currentOrder?.text || curr}
					onChange={e => setCurr(e.target.value)}
				/>
			</div>
			<div className="Bottom">
				<button
					disabled={!curr.length || data.currentOrder?.text}
					className={!curr.length || data.currentOrder?.text ? "disabled" : ""}
					onClick={handleClick}>
					{data.currentOrder?.timer || "Valider"}
				</button>
				<small>Premium</small>
			</div>
		</div>
	);
};

export default MenuPlaque;
