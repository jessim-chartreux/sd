import "./style.scss";

import React, { useContext } from "react";

import Canvas from "./Canvas";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { useExitKeys } from "../../hooks/useExitKeys";

const ScratchingTicket: React.FC = () => {
	const context = useContext(GlobalContext);
	useExitKeys();

	const data: any | null = isDev
		? {
				money: 500,
				primaryColor: "#EC1C22",
				secondaryColor: "#F55056",
			}
		: context.data;

	return (
		<div className="scratching-ticket">
			<div
				className={"ticket-container"}
				style={
					{
						"--primary-color": data.primaryColor,
						"--secondary-color": data.secondaryColor,
					} as React.CSSProperties
				}>
				<div className="stars">
					{Array.from({ length: 500 }).map((_, i) => (
						<div key={i} className="star">
							★
						</div>
					))}
				</div>

				<div className="info">
					<h1
						style={
							{
								"--primary-color": data.primaryColor,
							} as React.CSSProperties
						}>
						LUCKY
					</h1>
					<h1
						style={
							{
								"--primary-color": data.primaryColor,
							} as React.CSSProperties
						}>
						SCRATCH
					</h1>
				</div>
				<div className="scratch-container">
					<div className="scratch-card">
						<div className={"code " + (data.money ? "win" : "")}>{(data.money && data.money + "$") || "PERDU"}</div>
					</div>
					<Canvas />
				</div>
			</div>
		</div>
	);
};

export default ScratchingTicket;
