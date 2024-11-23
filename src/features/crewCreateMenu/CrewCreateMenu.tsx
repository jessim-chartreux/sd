import "./CrewCreateMenu.scss";

import React, { useEffect, useState } from "react";

import { SliderPicker } from "react-color";
import { postAsync } from "../../utils/postAsync";

const CrewCreateMenu = () => {
	const [windowSize, setWindowSize] = useState(getWindowSize());
	const [crewNameMenu, setCrewNameMenu] = useState("");
	const [deviseMenu, setDeviseMenu] = useState("");
	const [blockPickerColor, setBlockPickerColor] = useState("#37d67a");

	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(getWindowSize());
		}

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	const handleChangeCrewNameMenu = event => {
		setCrewNameMenu(event.target.value);
	};

	const handleChangeDeviseMenu = event => {
		setDeviseMenu(event.target.value);
	};

	const handleSubmit = async () => {
		function getIfValue() {
			if (crewNameMenu.length === 0 || deviseMenu.length === 0) return false;
			return true;
		}

		if (getIfValue()) {
			await postAsync("crewMenu_callback", {
				crewNameMenu: crewNameMenu,
				crewDeviseMenu: deviseMenu,
				crewColor: blockPickerColor,
			});
		}

		setTimeout(() => {
			setCrewNameMenu("");
			setDeviseMenu("");
			setBlockPickerColor("#37d67a");
		}, 2000);
	};

	return (
		<html>
			<head>
				<meta />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link href="styles.css" rel="stylesheet" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap" rel="stylesheet"></link>
				<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />
			</head>
			<body>
				<div style={{ width: windowSize.innerWidth, height: windowSize.innerHeight, position: "relative", display: "flex" }}>
					<div style={{ flex: "auto", display: "flex", position: "relative" }}>
						<div id="bgc" />
						<div id="header">
							<img src="https://cdn.sacul.cloud/v2/vision-cdn/crew/crewMenuBanniere.webp" />
						</div>

						<div style={{ position: "absolute", top: 290, left: 500, display: "flex", flexDirection: "column" }}>
							<img
								src="https://cdn.sacul.cloud/v2/vision-cdn/crew/logo.webp"
								style={{ border: "1px solid white", borderRadius: 50, padding: "7px" }}
							/>
						</div>
						<div style={{ position: "absolute", top: 325, left: 485, display: "flex", flexDirection: "column" }}>
							<div id="create_text"> CREATION</div>
						</div>

						<div id="prompt">
							<div id="crewNameMenu">
								<label htmlFor="input_crewNameMenu">
									NOM DU{" "}
									<span style={{ color: blockPickerColor, marginLeft: "4px" }} className="crew">
										CREW
									</span>
								</label>
								<input
									name="input_crewNameMenu"
									id="input_crewNameMenu"
									value={crewNameMenu}
									onChange={handleChangeCrewNameMenu}
								/>
							</div>
							<div id="deviseMenu">
								<label htmlFor="input_deviseMenu">
									DEVISE DU{" "}
									<span style={{ color: blockPickerColor, marginLeft: "4px" }} className="crew">
										CREW
									</span>
								</label>
								<input name="input_deviseMenu" id="input_deviseMenu" value={deviseMenu} onChange={handleChangeDeviseMenu} />
							</div>
							<div id="colorCrew">
								<label htmlFor="color">
									COULEUR DU{" "}
									<span style={{ color: blockPickerColor, marginLeft: "4px" }} className="crew">
										CREW
									</span>
								</label>
								<div id="slider">
									<SliderPicker
										name="color"
										color={blockPickerColor}
										onChange={color => {
											setBlockPickerColor(color.hex);
										}}
									/>
								</div>
							</div>
							<div id="sendButton">
								<button className="button_valider" onClick={handleSubmit}>
									VALIDER LES INFORMATIONS
								</button>
							</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
};

export default CrewCreateMenu;
