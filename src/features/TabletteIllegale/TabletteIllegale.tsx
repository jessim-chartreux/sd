import "./style.scss";

import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../app";
import TabletteLogin from "./Login";
import TabletteLogout from "./Logout";
import TabletteMain from "./Main";
import TabletteShop from "./Shop";
import exampleData from "./data.json";
import { isDev } from "../../utils/isDev";
import { useExitKeys } from "../../hooks/useExitKeys";

const TabletteIllegale: React.FC = () => {
	const queryString = window.location.search;
	const _urlParams = new URLSearchParams(queryString);

	const context = useContext(GlobalContext);
	const data: any = isDev ? exampleData : context.data;

	const [err, setErr] = useState(false);
	useEffect(() => {
		if (data?.force === "Shop" && data?.errorMessage) {
			setErr(true);
		}
	}, [data?.errorMessage, data?.force]);

	const [type, setType] = useState(data?.force ?? "Login");

	const showHeader = () => {
		return type === "Main" || type === "Shop";
	};

	useExitKeys();

	return (
		<div className={"Tablette " + type}>
			<img className="bg" src="https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/tablette.webp"></img>
			{showHeader() && (
				<div className="Header">
					<div className="Buttons">
						<div
							className="Container A-BounceIn"
							style={{
								animationDelay: "0s",
							}}>
							<div
								className="Logo"
								style={{
									background: "linear-gradient(180deg, #FFFFFF 0%, #B7B7B7 100%)",
									border: "1px #d6d5d5 solid",
								}}
								onClick={() => {
									setType("Main");
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/home.webp" />
							</div>
							<div className="Span">Menu principal</div>
						</div>
						<div
							className="Container A-BounceIn"
							style={{
								animationDelay: "0.2s",
							}}>
							<div
								className="Logo"
								style={{
									background: "linear-gradient(180deg, rgba(30, 180, 90, 0.58) 0%, #002911 100%)",
									border: "1px #135c32 solid",
								}}
								onClick={() => {
									setType("Shop");
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/shop.webp" />
							</div>
							<div className="Span">Boutique</div>
						</div>
						<div
							className="Container A-BounceIn"
							style={{
								animationDelay: ".4s",
							}}>
							<div
								className="Logo"
								style={{
									background: "linear-gradient(180deg, #3A0000 0%, #840000 100%)",
									border: "1px #650908 solid",
								}}
								onClick={() => {
									setType("Logout");
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/disconnect.webp" />
							</div>
							<div className="Span">Déconnexion</div>
						</div>
					</div>
					<div className="Profile">
						<div
							className="Container A-FadeInRight"
							style={{
								animationDelay: ".6s",
							}}>
							<div className="Name">{data?.crewName}</div>
							<div className="Desc">{data?.crewDesc}</div>
						</div>
						<div
							className="Logo A-BounceIn"
							style={{
								background: data?.crewColor,
								animationDelay: ".65s",
							}}>
							{data?.crewInitials}
						</div>
					</div>
				</div>
			)}
			{type === "Login" && <TabletteLogin changePage={setType} />}
			{type === "Logout" && <TabletteLogout changePage={setType} />}
			{type === "Main" && <TabletteMain changePage={setType} data={data} />}
			{type === "Shop" && <TabletteShop changePage={setType} data={data} err={err} setErr={setErr} />}
		</div>
	);
};

export default TabletteIllegale;
