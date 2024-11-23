import "./style.scss";

import React from "react";
import { SERVER } from "../../../config";

const BoutiquePack: React.FC<any> = ({
	type,
	price,
	data,
	callback = () => {
		//
	},
	submessage = "",
	disabled = false,
}) => {
	const getCurrency = () => {
		if (type === "buyVCoins") return <div className="BoutiquePack-currency">{"€"}</div>;
		if (type === "buySubscription")
			return (
				<div className="BoutiquePack-currency">
					<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/logo.svg" />
				</div>
			);
	};

	return (
		<div
			className={"BoutiquePack" + (" " + type) + (" " + data?.level) + " transparent"}
			style={{ backgroundImage: `url("https://cdn.sacul.cloud/v2/vision-cdn/ShopPacks/${data?.level}.webp")` }}
			onClick={() => {
				if (!disabled) callback();
			}}>
			{type === "buySubscription" && (
				<div className="BoutiquePack-sub">
					<div className="Title">{"ABONNEMENT"}</div>
					<div className="Level">{data?.levelFront}</div>
				</div>
			)}
			{type === "buyVCoins" && (
				<div className="BoutiquePack-sub">
					{SERVER === "FA" && data?.level === "black" && (
						<div className="Bonus">
							<span>{"premium"}</span>
							<span>{"+"}</span>
							<span> {"Permanent"}</span>
						</div>
					)}
					{SERVER === "WL" && data?.level === "black" && (
						<div className="Bonus">
							<span>{"subscriber"}</span>
							<span>{""}</span>
							<span> {"Permanent"}</span>
						</div>
					)}
					<div className="Value">
						<span>{data?.value}</span>
						<div className="Currency">
							<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/logo.svg" />
							{"COINS"}
						</div>
					</div>
				</div>
			)}
			<div className="Price" style={disabled ? { cursor: "not-allowed" } : {}}>
				{price}
				{getCurrency()}
				<div className="SubMessage">{submessage}</div>
			</div>
		</div>
	);
};

export default BoutiquePack;
