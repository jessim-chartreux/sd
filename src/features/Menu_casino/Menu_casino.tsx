import "./Menu_casino.scss";

import React, { useContext, useState } from "react";

import Button from "../../components/UI/Button/Buttton";
import { GlobalContext } from "../../app";
import Slider from "@mui/material/Slider";
import { isDev } from "../../utils/isDev";
import { playOnClickSound } from "../../utils/sounds";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const Menu_casino: React.FC = () => {
	const [chips, setChips] = useState(0);
	const [buyChips, setBuyChips] = useState(0);

	useExitKeys();
	const context = useContext(GlobalContext);

	const chipsButtons = [
		{
			id: 0,
			valeur: 50,
		},
		{
			id: 1,
			valeur: 100,
		},
		{
			id: 2,
			valeur: 500,
		},
		{
			id: 3,
			valeur: 1000,
		},
		{
			id: 4,
			valeur: 5000,
		},
		{
			id: 5,
			valeur: 10000,
		},
	];
	const access = [
		{
			text: "Lounge supérieur du casino",
		},
		{
			text: "Double roue de la fortune",
		},
	];

	const data: any | null = isDev
		? {
				premium: true,
				userChips: 2000,
			}
		: context.data;

	const submitBuyChips = chips => {
		const data_callback = {
			chips,
		};
		postAsync("casino.buyChips", data_callback);
	};

	const submitSellChips = chips => {
		const data_callback = {
			chips,
		};
		postAsync("casino.sellChips", data_callback);
	};

	return (
		<div className={"MenuHabitation"}>
			<div
				style={{ display: "flex", flexDirection: "column", position: "relative", backgroundColor: "transparent" }}
				className="Container_Principal_habitation">
				<div className="Container_casino">
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div style={{ height: 80, display: "flex", width: "100%" }}>
							<img
								src={"https://cdn.sacul.cloud/v2/vision-cdn/casino/banner.webp"}
								style={{ height: "100%", width: "100%", borderRadius: "6px 6px 0px 0px" }}
							/>
						</div>
						<div style={{ height: "auto", padding: "15px 20.5px", display: "flex" }}>
							<div style={{ height: "auto", display: "flex", flexDirection: "column" }}>
								<div className="text_title">{"accès vip"}</div>
								<div className="list_access">
									{access.map((info, index) => {
										return (
											<div key={index} className={"access"}>
												<div className="text">{info.text}</div>
												<img
													src={
														data.premium
															? "https://cdn.sacul.cloud/v2/vision-cdn/casino/check.webp"
															: "https://cdn.sacul.cloud/v2/vision-cdn/casino/lock.webp"
													}
												/>
											</div>
										);
									})}
								</div>
								<div style={{ height: 25 }} />
								<div className="text_title">{"Achat de jetons"}</div>
								<div style={{ height: 6 }} />
								<div className="list_jetons">
									{chipsButtons.map(info => {
										return (
											<div
												key={info.id}
												id={"capacite_stockage_" + info.id}
												className={"capacity " + (buyChips === info.valeur ? "selected" : "")}
												onClick={() => {
													playOnClickSound();
													setBuyChips(info.valeur);
												}}
												style={{
													cursor: "pointer",
													background: "rgba(255, 255, 255, 0.2)",
													borderRadius: "4px",
													justifyContent: "center",
													alignItems: "center",
													display: "flex",
													padding: "5px 10px",
												}}>
												<div className="text_btn_habitation2">{info.valeur}</div>
											</div>
										);
									})}
								</div>
								<div style={{ height: 15 }} />
								<div className="square-container">
									<Button
										color="green"
										width={168}
										height={25}
										fontSize={12}
										fontWeight={700}
										callback={() => {
											submitBuyChips(buyChips);
										}}
										label={buyChips + "$"}
										disabled={buyChips === 0}
									/>
								</div>
								<div style={{ height: 25 }} />
								<div className="text_title">{"échange de jetons"}</div>
								<Slider
									className="cSlider"
									style={{ width: "100%" }}
									valueLabelDisplay="on"
									color="primary"
									min={0}
									max={data.userChips}
									onChange={(e, v) => {
										setChips(Number(v));
									}}
								/>
								<div style={{ height: 7 }} />
								<div className="square-container">
									<Button
										color="yellow"
										width={168}
										height={25}
										fontSize={12}
										fontWeight={700}
										callback={() => {
											submitSellChips(chips);
										}}
										label={chips + "$"}
										disabled={chips === 0}
									/>
								</div>
								<div style={{ height: 25 }} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu_casino;
