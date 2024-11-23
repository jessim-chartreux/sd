import "./BoomBox.scss";

import { BsFillPauseFill, BsFillStopFill, BsPlayFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";

import Slider from "@mui/material/Slider";
import { playOnHoverSound } from "../../utils/sounds";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const BoomBox: React.FC = () => {
	const [inputText, setinputText] = useState("");
	const [value1, setvalue1] = useState(70);
	useExitKeys();

	const tableau_boombox = [
		{
			id: 0,
			valeur: "POSER AU SOL",
			action: "poser",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Boombox/img_poser.webp",
		},
		{
			id: 1,
			valeur: "PORTER SUR L'ÉPAULE",
			action: "porter",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Boombox/img_porter.webp",
		},
		{
			id: 2,
			valeur: "RAMASSER",
			action: "ramasser",
			img: "https://cdn.sacul.cloud/v2/vision-cdn/Boombox/img_ramasser.webp",
		},
	];

	const fonction_callback_volume = React.useCallback(() => {
		postAsync("boomBox_callBack_volume", {
			volume: value1,
		});
	}, [value1]);

	useEffect(() => {
		fonction_callback_volume();
	}, [fonction_callback_volume, value1]);

	const handleChangeText = event => {
		setinputText(event.target.value);
	};

	const click_action_user = (type: string) => {
		playOnHoverSound();

		postAsync("boomBox_callBack_action_user", {
			action_user: type,
		});
	};

	const click_action_son = (type: string) => {
		playOnHoverSound();

		postAsync("boomBox_callBack_action_son", {
			url_youtube: inputText,
			action_son: type,
			volume: value1,
		});
	};

	return (
		<div
			style={{
				display: "flex",
				flex: "auto",
				flexDirection: "column",
				position: "relative",
				backgroundColor: "transparent",
			}}>
			<div className="Container_Boombox1">
				<div className="d-flex flex-auto flex-column">
					<div style={{ height: 102, display: "flex", width: "100%" }} id="bloc9">
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/Boombox/header.webp" style={{ height: "100%", width: "100%" }} />
					</div>
					<div style={{ flex: "auto", padding: "26px", display: "flex" }}>
						<div className="d-flex flex-auto flex-column">
							<div className="text_title" id="bloc1">
								URL YOUTUBE
							</div>
							<div style={{ height: 6 }} />
							<div style={{ height: 27, width: "100%", display: "flex" }} id="bloc2">
								<input className="text_input" value={inputText} onChange={handleChangeText} />
							</div>
							<div style={{ height: 20 }} />
							<div className="text_title" id="bloc3">
								VOLUME
							</div>
							<div style={{ height: 0 }} />
							<div style={{ width: "100%", position: "relative", top: -5, display: "flex", height: "auto" }} id="bloc4">
								<Slider
									aria-label="volume"
									sx={{
										color: "rgba(255,255,255,0.2)",
										height: 8,
										"& .MuiSlider-track": {
											border: "none",
											backgroundColor: "white",
										},
										"& .MuiSlider-thumb": {
											width: 20,
											height: 20,
											color: "white",
											border: "1px  solid white",
											"&:before": {
												boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
											},
										},
									}}
									style={{ color: "rgba(255,255,255,0.6)", flex: "auto", borderRadius: 4 }}
									size="small"
									value={value1}
									onChange={(_, value: number) => setvalue1(value)}
									valueLabelDisplay="auto"
								/>
							</div>
							<div style={{ height: 15 }} />
							<div className="BoomBox_Buttons">
								<div
									id="bloc5"
									className="div_btn_boombox play"
									onClick={() => {
										click_action_son("play");
									}}>
									<BsPlayFill color="white" />
									<div className="text_btn">PLAY</div>
								</div>
								<div
									id="bloc6"
									className="div_btn_boombox pause"
									onClick={() => {
										click_action_son("pause");
									}}>
									<BsFillPauseFill color="white" style={{ position: "relative", left: -7 }} />
									<div className="text_btn">PAUSE</div>
								</div>
							</div>
							<div className="BoomBox_Button">
								<div
									id="bloc7"
									className="div_btn_boombox stop"
									onClick={() => {
										click_action_son("stop");
									}}>
									<BsFillStopFill color="white" style={{ position: "relative", left: -10 }} />
									<div className="text_btn">STOP</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="Container_Boombox2" id="bloc8">
				<div style={{ flex: "auto", padding: "20px 41px", display: "flex" }}>
					<div style={{ flex: "auto", flexDirection: "row", display: "flex" }}>
						{tableau_boombox.map((info, index) => {
							return (
								<div key={index} className="d-flex flex_row" onClick={() => click_action_user(info.action)}>
									<div id={"div_general_" + info.id} className="div_general_boombox">
										<div id={"div_img_" + info.id} className="div_img_boombox">
											<img id={"img_" + info.id} className="img_boombox" src={info.img} />
										</div>
										<div id={"div_valeur_" + info.id} className="div_valeur_boombox">
											<div id={"valeur_" + info.id} className="text_action">
												{info.valeur}
											</div>
										</div>
									</div>
									<div style={{ width: 40 }} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BoomBox;
