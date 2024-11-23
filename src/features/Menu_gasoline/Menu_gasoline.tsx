import "./Menu_gasoline.scss";

import React, { useContext, useEffect, useState } from "react";

import { AiOutlineCheck } from "react-icons/ai";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

interface IDataAchatRapide {
	id?: number;
	prix?: string;
	image?: string;
	name?: string;
	label?: string;
}

interface IDataCatalogue {
	id?: number;
	name?: string;
	image?: string;
}

interface IDataLTDGasoline {
	data_catalogue?: IDataCatalogue[];
	data_achatrapide?: IDataAchatRapide[];
}

const Menu_gasoline: React.FC = () => {
	useExitKeys();

	const [windowSize, setWindowSize] = useState(getWindowSize());
	const [choiceUser, setchoiceUser] = useState("");
	const context = useContext(GlobalContext);

	const achatRapide_item = [
		{
			id: 0,
			prix: "20",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Vespucci/img_mask3.webp",
			name: "test",
			label: "",
		},
		{
			id: 1,
			prix: "198",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Vespucci/img_mask.webp",
			name: "test",
			label: "",
		},
		{
			id: 2,
			prix: "0",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Vespucci/img_mask2.webp",
			name: "test",
			label: "",
		},
	];

	const catalogue_item = [
		{
			id: 3,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/other/photo_haut_clothes.webp",
			name: "hauts",
		},
		{
			id: 4,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/other/photo_haut_clothes.webp",
			name: "sous_hauts",
		},
		{
			id: 5,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/other/photo_haut_clothes.webp",
			name: "bas",
		},
		{
			id: 6,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/other/photo_haut_clothes.webp",
			categorie: "chaussure",
		},
		{
			id: 7,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/other/photo_haut_clothes.webp",
			categorie: "accessoire",
		},
		{
			id: 8,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/other/photo_haut_clothes.webp",
			categorie: "autre",
		},
		{
			id: 9,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/other/photo_haut_clothes.webp",
			name: "hauts",
		},
		{
			id: 10,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/other/photo_haut_clothes.webp",
			name: "sous_hauts",
		},
		{
			id: 11,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/other/photo_haut_clothes.webp",
			name: "bas",
		},
		{
			id: 12,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/other/photo_haut_clothes.webp",
			categorie: "chaussure",
		},
		{
			id: 13,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/other/photo_haut_clothes.webp",
			categorie: "accessoire",
		},
		{
			id: 14,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/other/photo_haut_clothes.webp",
			categorie: "autre",
		},
	];

	const data_LTD = {
		data_catalogue: catalogue_item,
		data_achatrapide: achatRapide_item,
	};

	const data: IDataLTDGasoline | null = isDev ? data_LTD : (context.data as IDataLTDGasoline);

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
	}, [data]);

	const onHoverEnter = element => {
		document.getElementById("text" + element).style.display = "none";
		document.getElementById("img" + element).style.backgroundColor =
			"linear-gradient(90deg, rgba(105, 126, 238, 0.348958) 0%, rgba(94, 108, 182, 0.5) 43.75%, rgba(94, 108, 182, 0.5) 100%)";
		document.getElementById("div_img" + element).style.height = "100%";
		document.getElementById("div_abs" + element).style.display = "flex";
	};

	const onHoverOut = element => {
		document.getElementById("text" + element).style.display = "flex";
		document.getElementById("img" + element).style.backgroundColor = "transparent";
		document.getElementById("div_img" + element).style.height = "86%";
		document.getElementById("div_abs" + element).style.display = "none";
	};

	const fonctionMove = element => {
		document.getElementById("div_img" + element).style.transform = "scaleY(1.1)";
	};

	const fonctionOut = element => {
		document.getElementById("div_img" + element).style.transform = "scaleY(1)";
	};

	const onclickItem = dataReturn => {
		setchoiceUser(dataReturn);
		for (let index = 0; index < data.data_catalogue.length; index++) {
			const element = data.data_catalogue[index];
			document.getElementById("div_general" + element.id).style.border = "0px solid transparent";
		}
		for (let index = 0; index < data.data_achatrapide.length; index++) {
			const element = data.data_achatrapide[index];
			document.getElementById("div_general" + element.id).style.border = "none";
		}
		if (dataReturn.id == dataReturn.id) {
			document.getElementById("div_btn_LTD").style.display = "flex";
			document.getElementById("div_general" + dataReturn.id).style.border = "0.5px solid white";
		}
	};

	const clickBtn = () => {
		postAsync("valider_achatrapide_LTDgasoline", {
			choiceUser,
		});
	};

	const clickOut = dataReturn => {
		document.getElementById("div_btn_LTD").style.display = "none";
		for (let index = 0; index < data.data_catalogue.length; index++) {
			const element = data.data_catalogue[index];
			document.getElementById("div_general" + element.id).style.border = "0px solid transparent";
		}
		for (let index = 0; index < data.data_achatrapide.length; index++) {
			const element = data.data_achatrapide[index];
			document.getElementById("div_general" + element.id).style.border = "0px solid transparent";
		}
		if (dataReturn.id == dataReturn.id) {
			document.getElementById("div_general" + dataReturn.id).style.border = "0.5px solid white";
		}

		postAsync("voir_catalogue_LTDgasoline", {
			dataReturn,
		});
	};

	return (
		<html>
			<head>
				<meta />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title></title>
				<link href="styles.css" rel="stylesheet" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&family=Space+Grotesk&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" rel="stylesheet" />
			</head>
			<body>
				<div style={{ width: windowSize.innerWidth, height: windowSize.innerHeight, display: "flex" }}>
					<div style={{ display: "flex", flex: 1, position: "relative", backgroundColor: "transparent" }}>
						<div className="Container_gasoline">
							<div style={{ height: 15 }} />
							<div style={{ display: "flex", height: 85, width: "100%", alignItems: "center" }}>
								<img
									style={{ height: "100%", width: 348, position: "relative", left: -30, borderRadius: 10 }}
									src="https://cdn.sacul.cloud/v2/vision-cdn/Gasoline/header.webp"
								/>
								<div
									style={{
										flex: "auto",
										display: "flex",
										position: "relative",
										left: -15,
										justifyContent: "center",
										alignItems: "center",
										flexDirection: "column",
									}}>
									<img src="https://cdn.sacul.cloud/v2/vision-cdn/Gasoline/logo.webp" />
									<div className="text_catalogue">CATALOGUE</div>
								</div>
							</div>
							<div style={{ height: 20 }} />
							<div style={{ flex: "auto", display: "flex" }}>
								<div style={{ width: 140 }} />
								<div style={{ flex: "auto", display: "flex", flexDirection: "column" }}>
									<div
										style={{
											width: "100%",
											height: 450,
											overflow: "scroll",
											overflowX: "hidden",
											flexDirection: "column",
											display: "flex",
										}}
										className="scroll">
										<div className="text_title">ACHAT RAPIDE</div>
										<div style={{ marginBottom: 4 }} />
										<div style={{ width: "100%", height: "auto", display: "flex" }}>
											{data.data_achatrapide.map((data, i) => {
												return (
													<div
														key={i}
														className="div_achat_rapide_gasoline"
														id={"div_general" + data.id}
														onClick={() => onclickItem(data)}
														onMouseOut={() => onHoverOut(data.id)}
														onMouseMove={() => onHoverEnter(data.id)}>
														<div
															id={"div_img" + data.id}
															style={{
																height: "86%",
																width: "100%",
																position: "relative",
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																borderRadius: "6px",
															}}>
															<img
																src={data.image}
																id={"img" + data.id}
																style={{ height: "100%", width: "100%", zIndex: 2, borderRadius: "6px" }}
															/>
															<div
																id={"div_abs" + data.id}
																style={{
																	height: "100%",
																	width: "100%",
																	position: "absolute",
																	background:
																		"linear-gradient(90deg, rgba(105, 126, 238, 0.348958) 0%, rgba(94, 108, 182, 0.5) 43.75%, rgba(94, 108, 182, 0.5) 100%)",
																	zIndex: 2,
																	display: "none",
																	borderRadius: "6px",
																}}
															/>
														</div>
														<div
															id={"text" + data.id}
															style={{
																flex: "auto",
																display: "flex",
																justifyContent: "center",
																alignItems: "center",
																background: "rgba(94, 108, 182, 0.7)",
																borderRadius: "0px 0px 6px 6px",
															}}>
															<div className="text_price_gasoline">{data.prix} $</div>
														</div>
													</div>
												);
											})}
										</div>
										<div style={{ marginBottom: 15 }} />
										<div className="text_title">CATALOGUE LTD</div>
										<div style={{ marginBottom: 4 }} />
										<div style={{ width: "100%", height: "auto", display: "flex", flexWrap: "wrap" }}>
											{data.data_catalogue.map((data, i) => {
												return (
													<div
														key={i}
														className="div_catalogue_item_gasoline"
														id={"div_general" + data.id}
														onClick={() => clickOut(data)}>
														<div
															id={"div_img" + data.id}
															style={{
																flex: "auto",
																display: "flex",
																flexDirection: "column",
																justifyContent: "center",
															}}
															onMouseOut={() => fonctionOut(data.id)}
															onMouseMove={() => fonctionMove(data.id)}>
															<img
																src={data.image}
																style={{ height: "75%", width: "82%", alignSelf: "center" }}
															/>
														</div>
													</div>
												);
											})}
										</div>
									</div>
									<div style={{ flex: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
										<div onClick={() => clickBtn()} className="div_btn_LTD" id="div_btn_LTD">
											<AiOutlineCheck color="white" style={{ position: "relative", left: -10 }} size={20} />
											<div className="text_btn">VALIDER L'ACHAT</div>
										</div>
									</div>
								</div>
								<div style={{ width: 60 }} />
							</div>
						</div>
					</div>
				</div>
			</body>
		</html>
	);
};

export default Menu_gasoline;
