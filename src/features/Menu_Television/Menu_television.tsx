import "./Menu_television.scss";

import { BsFillPauseFill, BsFillSkipEndFill, BsFillStopFill, BsPlayFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";

import Slider from "@mui/material/Slider";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const Menu_television: React.FC = () => {
	const [inputText, setinputText] = useState("");
	const [value1, setvalue1] = useState(70);
	const [value2, _setvalue2] = useState(10);
	const [action, _setaction] = useState("play");
	useExitKeys();

	const handleChangeText = event => {
		setinputText(event.target.value);
	};

	/* const click_action = info => {
		let valeur;
		if (info == "play") {
			valeur = "bloc8";
		}
		if (info == "pause") {
			valeur = "bloc9";
		}
		if (info == "skip") {
			valeur = "bloc10";
		}
		if (info == "stop") {
			valeur = "bloc11";
		}
		document.getElementById(valeur).classList.add("animation_btn_television");
		setTimeout(() => {
			document.getElementById(valeur).classList.remove("animation_btn_television");
		}, 300);

		setaction(info);

		const data_callback = {
			url_youtube: inputText,
			action: info,
			volume: value1,
		};

		postAsync("Television_click_action", data_callback);
	}; */

	const Action = (type: "play" | "pause" | "skip" | "stop") => {
		postAsync("Television_click_action", {
			url_youtube: inputText,
			action: type,
			volume: value1,
		});
	};

	useEffect(() => {
		postAsync("Television_volume_action", {
			url_youtube: inputText,
			action: action,
			volume: value1,
		});
	}, [action, inputText, value1, value2]);

	return (
		<div
			style={{
				display: "flex",
				flex: "auto",
				flexDirection: "column",
				position: "relative",
				backgroundColor: "transparent",
			}}>
			<div className="Container_Television">
				<div style={{ flex: "auto", display: "flex", flexDirection: "column" }}>
					<div id="bloc1" style={{ height: 102, display: "flex", width: "100%" }}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/Television/header.webp" style={{ height: "100%", width: "100%" }} />
					</div>
					<div style={{ flex: "auto", padding: "26px", display: "flex" }}>
						<div style={{ flex: "auto", display: "flex", flexDirection: "column" }}>
							<div className="text_title" id="bloc2">
								URL YOUTUBE
							</div>
							<div style={{ height: 6 }} />
							<div style={{ height: 27, width: "100%", display: "flex" }} id="bloc3">
								<input className="text_input" value={inputText} onChange={handleChangeText} />
							</div>
							<div style={{ height: 20 }} />
							<div className="text_title" id="bloc4">
								VOLUME
							</div>
							<div style={{ height: 0 }} />
							<div style={{ width: "100%", position: "relative", top: -5, display: "flex", height: "auto" }} id="bloc5">
								<Slider
									aria-label="time-indicator"
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
							<div className="text_title" id="bloc4">
								ACTIONS
							</div>
							<div className="Buttons">
								<div
									className="div_btn_television play"
									id="bloc8"
									onClick={() => {
										Action("play");
									}}>
									<BsPlayFill color="white" />
									<div className="text_btn">PLAY</div>
								</div>
								<div
									className="div_btn_television pause"
									id="bloc9"
									onClick={() => {
										Action("pause");
									}}>
									<BsFillPauseFill color="white" />
									<div className="text_btn">PAUSE</div>
								</div>
								<div
									className="div_btn_television skip"
									id="bloc10"
									onClick={() => {
										Action("skip");
									}}>
									<BsFillSkipEndFill color="white" />
									<div className="text_btn">SKIP</div>
								</div>
								<div
									className="div_btn_television stop"
									id="bloc11"
									onClick={() => {
										Action("stop");
									}}>
									<BsFillStopFill color="white" />
									<div className="text_btn">STOP</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu_television;
