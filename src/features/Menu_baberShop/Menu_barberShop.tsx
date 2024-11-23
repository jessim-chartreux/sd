import "./Menu_barberShop.scss";

import React, { useContext, useEffect, useState } from "react";

import { AlphaPicker } from "react-color";
import { BsFillPersonFill } from "react-icons/bs";
import { GlobalContext } from "../../app";
import hexRgb from "hex-rgb";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import rgbHex from "rgb-hex";
import { useExitKeys } from "../../hooks/useExitKeys";

//Latest modif a faire : Utilisateur peut enregistrer plusieurs modif en meme temps lorsqu'il appuie sur valider ( a voir avec le backend)

interface IDataCatalogue {
	id?: number;
	image?: string;
	categorie?: string;
}

interface IDataCouleur_primaire {
	id?: number;
	background?: string;
	hex?: string;
	rgba?: string;
}

interface IDataCouleur_secondaire {
	id?: number;
	background?: string;
	hex?: string;
	rgba?: string;
}

interface IDatabarberShop {
	data_catalogue?: IDataCatalogue[];
	data_couleur_primaire?: IDataCouleur_primaire[];
	data_couleur_secondaire?: IDataCouleur_secondaire[];
}

const Menu_barberShop: React.FC = () => {
	const [anim, setanim] = useState(false);
	const [windowSize, setWindowSize] = useState(getWindowSize());
	const [choiceUser, setchoiceUser] = useState("menu");
	const [choiceUser_Item, setchoiceUser_Item] = useState("");
	const [blockPickerColor1, setBlockPickerColor1] = useState("#fff");
	const [blockPickerColor2, setBlockPickerColor2] = useState("#fff");
	const [bloc_couleur, setbloc_couleur] = useState("");
	const [view2, setview2] = useState(false);

	useExitKeys();
	const context = useContext(GlobalContext);

	const data_catalogue = [
		{
			id: 0,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Bouche/2.webp",
			categorie: "bouche",
		},
		{
			id: 1,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Bouche/1.webp",
			categorie: "bouche",
		},
		{
			id: 2,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Bouche/2.webp",
			categorie: "bouche",
		},
		{
			id: 3,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Bouche/3.webp",
			categorie: "bouche",
		},
		{
			id: 4,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Bouche/2.webp",
			categorie: "bouche",
		},
		{
			id: 5,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Bouche/2.webp",
			categorie: "bouche",
		},
		{
			id: 6,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Bouche/2.webp",
			categorie: "bouche",
		},
		{
			id: 7,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Bouche/2.webp",
			categorie: "hauts",
		},
		{
			id: 8,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Bouche/2.webp",
			categorie: "bouche",
		},
		{
			id: 9,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Bouche/2.webp",
			categorie: "bouche",
		},
		{
			id: 10,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Bouche/2.webp",
			categorie: "bouche",
		},
		{
			id: 11,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Bouche/2.webp",
			categorie: "bouche",
		},
		{
			id: 12,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Maquillage/0.webp",
			categorie: "maquillage",
		},
		{
			id: 13,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Maquillage/0.webp",
			categorie: "maquillage",
		},
		{
			id: 14,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Maquillage/0.webp",
			categorie: "maquillage",
		},
		{
			id: 15,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Maquillage/0.webp",
			categorie: "maquillage",
		},
		{
			id: 16,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Maquillage/0.webp",
			categorie: "maquillage",
		},
		{
			id: 17,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Maquillage/0.webp",
			categorie: "maquillage",
		},
		{
			id: 18,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Maquillage/0.webp",
			categorie: "maquillage",
		},
		{
			id: 19,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Maquillage/0.webp",
			categorie: "maquillage",
		},
		{
			id: 20,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Bouche/2.webp",
			categorie: "bouche",
		},
		{
			id: 21,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Cheveux/1.webp",
			categorie: "cheveux",
		},
		{
			id: 22,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Cheveux/0.webp",
			categorie: "cheveux",
		},
		{
			id: 23,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Cheveux/1.webp",
			categorie: "cheveux",
		},
		{
			id: 24,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Cheveux/0.webp",
			categorie: "cheveux",
		},
		{
			id: 25,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Cheveux/0.webp",
			categorie: "cheveux",
		},
		{
			id: 26,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Cheveux/1.webp",
			categorie: "cheveux",
		},
		{
			id: 27,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Cheveux/0.webp",
			categorie: "cheveux",
		},
		{
			id: 28,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Cheveux/1.webp",
			categorie: "cheveux",
		},
		{
			id: 29,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Cheveux/0.webp",
			categorie: "cheveux",
		},
		{
			id: 30,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Cheveux/0.webp",
			categorie: "cheveux",
		},
		{
			id: 31,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/Cheveux/1.webp",
			categorie: "cheveux",
		},
	];

	const data_couleur_primaire = [
		{
			id: 0,
			background: "linear-gradient(180deg, #179148 0%, rgba(42, 163, 90, 0.872892) 47.56%, rgba(66, 188, 115, 0.71) 85.94%)",
			rgba: "rgba(23, 144, 72, 1)",
			hex: "#179048",
		},
		{
			id: 1,
			background: "linear-gradient(180deg, #FBBC04 0%, rgba(251, 188, 4, 0.4) 97.4%)",
			rgba: "rgba(251, 188, 4, 1)",
			hex: "#FBBC04",
		},
		{
			id: 2,
			background: "linear-gradient(180deg, #1F52B5 0%, rgba(19, 35, 119, 0.72) 100%)",
			rgba: "rgba(31, 82, 181, 1)",
			hex: "#1F52B5",
		},
		{
			id: 3,
			background: "linear-gradient(180deg, #971FB5 0%, rgba(67, 19, 105, 0.62) 100%)",
			rgba: "rgba(151, 31, 181, 1)",
			hex: "#971FB5",
		},
		{
			id: 4,
			background: "linear-gradient(180deg, #56AECA 0%, rgba(0, 145, 190, 0.58) 100%)",
			rgba: "rgba(86, 174, 202, 1)",
			hex: "#56AECA",
		},
		{
			id: 5,
			background: "linear-gradient(180deg, #CA5656 0%, rgba(190, 0, 0, 0.58) 100%)",
			rgba: "rgba(202, 86, 86, 1)",
			hex: "#CA5656",
		},
		{
			id: 6,
			background: "linear-gradient(180deg, #CA56BE 0%, rgba(190, 0, 57, 0.58) 100%)",
			rgba: "rgba(202, 86, 190, 1)",
			hex: "#CA56BE",
		},
		{
			id: 7,
			background: "linear-gradient(180deg, #FFDBC1 0%, rgba(255, 161, 94, 0.58) 100%)",
			rgba: "rgba(255, 219, 193, 1)",
			hex: "#FFDBC1",
		},
		{
			id: 8,
			background: "linear-gradient(180deg, #FFFFFF 0%, rgba(222, 222, 222, 0.58) 100%)",
			rgba: "rgba(255, 255, 255, 1)",
			hex: "#FFFFFF",
		},
		{
			id: 9,
			background: "linear-gradient(180deg, #000000 0%, rgba(15, 15, 15, 0.9) 55.21%, rgba(0, 0, 0, 1) 100%)",
			rgba: "rgba(0, 0, 0, 1)",
			hex: "#000000",
		},
		{
			id: 10,
			background: "linear-gradient(180deg, #179148 0%, rgba(42, 163, 90, 0.872892) 47.56%, rgba(66, 188, 115, 0.71) 85.94%)",
			rgba: "rgba(23, 144, 72, 1)",
			hex: "#179048",
		},
		{
			id: 11,
			background: "linear-gradient(180deg, #FBBC04 0%, rgba(251, 188, 4, 0.4) 97.4%)",
			rgba: "rgba(251, 188, 4, 1)",
			hex: "#FBBC04",
		},
		{
			id: 12,
			background: "linear-gradient(180deg, #179148 0%, rgba(42, 163, 90, 0.872892) 47.56%, rgba(66, 188, 115, 0.71) 85.94%)",
			rgba: "rgba(23, 144, 72, 1)",
			hex: "#1F52B5",
		},
	];

	const data_couleur_secondaire = [
		{
			id: 0,
			background: "linear-gradient(180deg, #179148 0%, rgba(42, 163, 90, 0.872892) 47.56%, rgba(66, 188, 115, 0.71) 85.94%)",
			rgba: "rgba(23, 144, 72, 1)",
			hex: "#179048",
		},
		{
			id: 1,
			background: "linear-gradient(180deg, #FBBC04 0%, rgba(251, 188, 4, 0.4) 97.4%)",
			rgba: "rgba(251, 188, 4, 1)",
			hex: "#FBBC04",
		},
		{
			id: 2,
			background: "linear-gradient(180deg, #1F52B5 0%, rgba(19, 35, 119, 0.72) 100%)",
			rgba: "rgba(31, 82, 181, 1)",
			hex: "#1F52B5",
		},
		{
			id: 3,
			background: "linear-gradient(180deg, #971FB5 0%, rgba(67, 19, 105, 0.62) 100%)",
			rgba: "rgba(151, 31, 181, 1)",
			hex: "#971FB5",
		},
		{
			id: 4,
			background: "linear-gradient(180deg, #56AECA 0%, rgba(0, 145, 190, 0.58) 100%)",
			rgba: "rgba(86, 174, 202, 1)",
			hex: "#56AECA",
		},
		{
			id: 5,
			background: "linear-gradient(180deg, #CA5656 0%, rgba(190, 0, 0, 0.58) 100%)",
			rgba: "rgba(202, 86, 86, 1)",
			hex: "#CA5656",
		},
		{
			id: 6,
			background: "linear-gradient(180deg, #CA56BE 0%, rgba(190, 0, 57, 0.58) 100%)",
			rgba: "rgba(202, 86, 190, 1)",
			hex: "#CA56BE",
		},
		{
			id: 7,
			background: "linear-gradient(180deg, #FFDBC1 0%, rgba(255, 161, 94, 0.58) 100%)",
			rgba: "rgba(255, 219, 193, 1)",
			hex: "#FFDBC1",
		},
		{
			id: 8,
			background: "linear-gradient(180deg, #FFFFFF 0%, rgba(222, 222, 222, 0.58) 100%)",
			rgba: "rgba(255, 255, 255, 1)",
			hex: "#FFFFFF",
		},
		{
			id: 9,
			background: "linear-gradient(180deg, #000000 0%, rgba(15, 15, 15, 0.9) 55.21%, rgba(0, 0, 0, 1) 100%)",
			rgba: "rgba(0, 0, 0, 1)",
			hex: "#000000",
		},
		{
			id: 10,
			background: "linear-gradient(180deg, #179148 0%, rgba(42, 163, 90, 0.872892) 47.56%, rgba(66, 188, 115, 0.71) 85.94%)",
			rgba: "rgba(23, 144, 72, 1)",
			hex: "#179048",
		},
		{
			id: 11,
			background: "linear-gradient(180deg, #FBBC04 0%, rgba(251, 188, 4, 0.4) 97.4%)",
			rgba: "rgba(251, 188, 4, 1)",
			hex: "#FBBC04",
		},
		{
			id: 12,
			background: "linear-gradient(180deg, #179148 0%, rgba(42, 163, 90, 0.872892) 47.56%, rgba(66, 188, 115, 0.71) 85.94%)",
			rgba: "rgba(23, 144, 72, 1)",
			hex: "#1F52B5",
		},
	];

	const data_barberShop = {
		data_catalogue: data_catalogue,
		data_couleur_primaire: data_couleur_primaire,
		data_couleur_secondaire: data_couleur_secondaire,
	};

	const data: IDatabarberShop | null = isDev ? data_barberShop : (context.data as IDatabarberShop);

	function getWindowSize() {
		const { innerWidth, innerHeight } = window;
		return { innerWidth, innerHeight };
	}

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(getWindowSize());
		}

		if (anim == false) {
			document.getElementById("bloc1").style.display = "none";
			document.getElementById("bloc2").style.display = "none";
			document.getElementById("bloc3").style.display = "none";
			document.getElementById("bloc4").style.display = "none";
			document.getElementById("bloc5").style.display = "none";
			document.getElementById("bloc6").style.display = "none";
			document.getElementById("header_btn_animation").style.display = "none";

			// NTM CELUI QUI A FAIT CA. JE VAIS TE RETROUVER ET DE FAIRE LE TDB
			// AnisMobile99 JE VAIS TE RETROUVER ET TE FAIRE LE TDB
			setTimeout(() => {
				document.getElementById("header_btn_animation").style.display = "flex";
				setTimeout(() => {
					document.getElementById("bloc1").style.display = "flex";
					document.getElementById("bloc7").style.display = "flex";
					setTimeout(() => {
						document.getElementById("bloc2").style.display = "flex";
						setTimeout(() => {
							document.getElementById("bloc3").style.display = "flex";
							setTimeout(() => {
								document.getElementById("bloc4").style.display = "flex";
								document.getElementById("bloc5").style.display = "flex";
								setTimeout(() => {
									document.getElementById("bloc6").style.display = "flex";
								}, 200);
							}, 200);
						}, 200);
					}, 200);
				}, 200);
			}, 500);
			setanim(true);
		}

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, [anim, data]);

	const renderLogo = () => {
		if (choiceUser == "menu") {
			return (
				<div
					id="bloc7"
					style={{
						flex: "auto",
						display: "flex",
						position: "relative",
						left: -15,
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}>
					<BsFillPersonFill color="white" size={22} />
					<div className="text_gender">HOMME</div>
				</div>
			);
		}
		if (choiceUser == "cheveux") {
			return (
				<div
					style={{
						flex: "auto",
						display: "flex",
						position: "relative",
						left: -15,
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}>
					<img src="https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/cheveux.webp" />
					<div className="text_gender">CHEVEUX</div>
				</div>
			);
		}
		if (choiceUser == "barbe") {
			return (
				<div
					style={{
						flex: "auto",
						display: "flex",
						position: "relative",
						left: -15,
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}>
					<img src="https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/barbe.webp" />
					<div className="text_gender">BARBE</div>
				</div>
			);
		}
		if (choiceUser == "yeux") {
			return (
				<div
					style={{
						flex: "auto",
						display: "flex",
						position: "relative",
						left: -15,
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}>
					<img src="https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/yeux.webp" />
					<div className="text_gender">YEUX</div>
				</div>
			);
		}
		if (choiceUser == "maquillage") {
			return (
				<div
					style={{
						flex: "auto",
						display: "flex",
						position: "relative",
						left: -15,
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}>
					<img src="https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/maquillage.webp" />
					<div className="text_gender">MAQUILLAGE</div>
				</div>
			);
		}
		if (choiceUser == "bouche") {
			return (
				<div
					style={{
						flex: "auto",
						display: "flex",
						position: "relative",
						left: -15,
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}>
					<img src="https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/bouche.webp" />
					<div className="text_gender">BOUCHE</div>
				</div>
			);
		}
	};

	const [LogoCheveuxHover, setLogoCheveuxHover] = useState(false);
	const [LogoBarbeHover, setLogoBarbeHover] = useState(false);
	const [LogoYeuxHover, setLogoYeuxHover] = useState(false);
	const [LogoMaquillageHover, setLogoMaquillageHover] = useState(false);
	const [LogoBoucheHover, setLogoBoucheHover] = useState(false);

	const hoverLogoIn = dataReturn => {
		if (dataReturn == "cheveux") {
			setLogoCheveuxHover(true);
			setLogoBarbeHover(false);
			setLogoYeuxHover(false);
			setLogoMaquillageHover(false);
			setLogoBoucheHover(false);
		}
		if (dataReturn == "barbe") {
			setLogoCheveuxHover(false);
			setLogoBarbeHover(true);
			setLogoYeuxHover(false);
			setLogoMaquillageHover(false);
			setLogoBoucheHover(false);
		}
		if (dataReturn == "yeux") {
			setLogoCheveuxHover(false);
			setLogoBarbeHover(false);
			setLogoYeuxHover(true);
			setLogoMaquillageHover(false);
			setLogoBoucheHover(false);
		}
		if (dataReturn == "maquillage") {
			setLogoCheveuxHover(false);
			setLogoBarbeHover(false);
			setLogoYeuxHover(false);
			setLogoMaquillageHover(true);
			setLogoBoucheHover(false);
		}
		if (dataReturn == "bouche") {
			setLogoCheveuxHover(false);
			setLogoBarbeHover(false);
			setLogoYeuxHover(false);
			setLogoMaquillageHover(false);
			setLogoBoucheHover(true);
		}
	};

	const hoverLogoOut = dataReturn => {
		if (dataReturn == "cheveux") {
			setLogoCheveuxHover(false);
			setLogoBarbeHover(false);
			setLogoYeuxHover(false);
			setLogoMaquillageHover(false);
			setLogoBoucheHover(false);
		}
		if (dataReturn == "barbe") {
			setLogoCheveuxHover(false);
			setLogoBarbeHover(false);
			setLogoYeuxHover(false);
			setLogoMaquillageHover(false);
			setLogoBoucheHover(false);
		}
		if (dataReturn == "yeux") {
			setLogoCheveuxHover(false);
			setLogoBarbeHover(false);
			setLogoYeuxHover(false);
			setLogoMaquillageHover(false);
			setLogoBoucheHover(false);
		}
		if (dataReturn == "maquillage") {
			setLogoCheveuxHover(false);
			setLogoBarbeHover(false);
			setLogoYeuxHover(false);
			setLogoMaquillageHover(false);
			setLogoBoucheHover(false);
		}
		if (dataReturn == "bouche") {
			setLogoCheveuxHover(false);
			setLogoBarbeHover(false);
			setLogoYeuxHover(false);
			setLogoMaquillageHover(false);
			setLogoBoucheHover(false);
		}
	};

	const click_bloc = item => {
		let valeur = "";
		if (item == "cheveux") {
			valeur = "bloc1";
		}
		if (item == "barbe") {
			valeur = "bloc2";
		}
		if (item == "yeux") {
			valeur = "bloc3";
		}
		if (item == "maquillage") {
			valeur = "bloc4";
		}
		if (item == "bouche") {
			valeur = "bloc5";
		}

		document.getElementById(valeur).classList.add("animation_btn");
		setTimeout(() => {
			setchoiceUser(item);
			setTimeout(() => {
				document.getElementById("bloc20").style.display = "flex";
				setTimeout(() => {
					setview2(true);
				}, 200);
			}, 200);
		}, 300);
	};

	const renderContent = () => {
		if (choiceUser == "menu") {
			return (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						flex: "auto",
						padding: 10,
						paddingRight: 35,
						paddingLeft: 35,
						cursor: "pointer",
					}}>
					<div
						id="bloc1"
						onMouseOut={() => hoverLogoOut("cheveux")}
						onMouseMove={() => hoverLogoIn("cheveux")}
						className="div_hauts_barberShop"
						onClick={() => click_bloc("cheveux")}>
						<div style={{ width: 80 }} />
						<img
							src={
								LogoCheveuxHover
									? "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/cheveux_hover.webp"
									: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/cheveux.webp"
							}
						/>
						<div style={{ width: 70 }} />
						CHEVEUX
					</div>
					<div style={{ height: 20 }} />
					<div
						id="bloc2"
						onMouseOut={() => hoverLogoOut("barbe")}
						onMouseMove={() => hoverLogoIn("barbe")}
						className="div_hauts_barberShop"
						onClick={() => click_bloc("barbe")}>
						<div style={{ width: 80 }} />
						<img
							src={
								LogoBarbeHover
									? "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/barbe_hover.webp"
									: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/barbe.webp"
							}
						/>
						<div style={{ width: 88 }} />
						BARBE
					</div>
					<div style={{ height: 20 }} />
					<div
						id="bloc3"
						onMouseOut={() => hoverLogoOut("yeux")}
						onMouseMove={() => hoverLogoIn("yeux")}
						className="div_hauts_barberShop"
						onClick={() => click_bloc("yeux")}>
						<div style={{ width: 80 }} />
						<img
							src={
								LogoYeuxHover
									? "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/yeux_hover.webp"
									: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/yeux.webp"
							}
						/>
						<div style={{ width: 50 }} />
						YEUX
					</div>
					<div style={{ height: 20 }} />
					<div style={{ height: 65, width: "100%", display: "flex" }}>
						<div
							id="bloc4"
							onMouseOut={() => hoverLogoOut("maquillage")}
							onMouseMove={() => hoverLogoIn("maquillage")}
							className="div_bas"
							onClick={() => click_bloc("maquillage")}>
							<div style={{ width: 40 }} />
							<img
								src={
									LogoMaquillageHover
										? "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/maquillage_hover.webp"
										: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/maquillage.webp"
								}
							/>
							<div style={{ width: 25 }} />
							MAQUILLAGE
						</div>
						<div style={{ width: 10 }} />
						<div
							id="bloc5"
							onMouseOut={() => hoverLogoOut("bouche")}
							onMouseMove={() => hoverLogoIn("bouche")}
							className="div_bas"
							onClick={() => click_bloc("bouche")}>
							<div style={{ width: 40 }} />
							<img
								src={
									LogoBoucheHover
										? "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/bouche_hover.webp"
										: "https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/bouche.webp"
								}
							/>
							<div style={{ width: 25 }} />
							BOUCHE
						</div>
					</div>
					<div style={{ flex: "auto", justifyContent: "center", alignItems: "center", display: "flex" }}>
						<div
							id="bloc6"
							onClick={() => click_Valider()}
							style={{
								height: 30,
								width: 320,
								alignSelf: "center",
								border: "none",
								justifyContent: "center",
								borderRadius: 6,
								background: "linear-gradient(180deg, #33963C 0%, rgba(30, 180, 90, 0.58) 100%)",
								display: "flex",
								alignItems: "center",
							}}
							className="div_btn_barber">
							<div className="text_dessing">VALIDER</div>
						</div>
					</div>
				</div>
			);
		}
		if (choiceUser == "bouche") {
			return (
				<div style={{ display: "flex", flex: "auto", padding: "0px 20px 30px 35px" }}>
					<div style={{ flex: "auto" }}>
						<div style={{ width: "100%", height: 410, overflow: "scroll", overflowX: "hidden" }} className="scroll" id="bloc20">
							<div style={{ width: "auto", height: "auto", display: "flex", flexWrap: "wrap" }}>
								{data.data_catalogue
									.filter(info => info.categorie == "bouche")
									.map((info, i) => {
										return (
											<div
												key={i}
												className="div_barber"
												id={"div_barber_general_" + info.id}
												onClick={() => click_item(info)}
												onMouseOut={() => fonctionOut(info)}
												onMouseMove={() => fonctionMove(info)}>
												<img
													id={"div_barber_photo_" + info.id}
													src={info.image}
													style={{ height: "100%", width: "100%", alignSelf: "center" }}
												/>
												<div
													id={"div_barber_absolue_" + info.id}
													style={{
														position: "absolute",
														height: "100%",
														display: "none",
														width: "100%",
														background:
															"linear-gradient(90deg, rgba(94, 108, 182, 0.3) 0%, rgba(94, 108, 182, 0.3) 100%)",
													}}
												/>
											</div>
										);
									})}
							</div>
						</div>
					</div>
				</div>
			);
		}
		if (choiceUser == "maquillage") {
			return (
				<div style={{ display: "flex", flex: "auto", padding: "0px 20px 30px 35px" }}>
					<div style={{ flex: "auto" }}>
						<div style={{ width: "100%", height: 410, overflow: "scroll", overflowX: "hidden" }} className="scroll" id="bloc20">
							<div style={{ width: "auto", height: "auto", display: "flex", flexWrap: "wrap" }}>
								{data?.data_catalogue
									.filter(info => info.categorie == "maquillage")
									.map((info, i) => {
										return (
											<div
												key={i}
												className="div_barber"
												id={"div_barber_general_" + info.id}
												onClick={() => click_item(info)}
												onMouseOut={() => fonctionOut(info)}
												onMouseMove={() => fonctionMove(info)}>
												<img src={info.image} style={{ height: "100%", width: "100%", alignSelf: "center" }} />
											</div>
										);
									})}
							</div>
						</div>
					</div>
				</div>
			);
		}
		if (choiceUser == "yeux") {
			return (
				<div style={{ display: "flex", flex: "auto", padding: "0px 20px 30px 35px" }}>
					<div style={{ flex: "auto" }}>
						<div style={{ width: "100%", height: 410, overflow: "scroll", overflowX: "hidden" }} className="scroll" id="bloc20">
							<div style={{ width: "auto", height: "auto", display: "flex", flexWrap: "wrap" }}>
								{data?.data_catalogue
									.filter(info => info.categorie == "yeux")
									.map((info, i) => {
										return (
											<div
												key={i}
												className="div_barber"
												id={"div_barber_general_" + info.id}
												onClick={() => click_item(info)}
												onMouseOut={() => fonctionOut(info)}
												onMouseMove={() => fonctionMove(info)}>
												<img src={info.image} style={{ height: "100%", width: "100%", alignSelf: "center" }} />
											</div>
										);
									})}
							</div>
						</div>
					</div>
				</div>
			);
		}
		if (choiceUser == "barbe") {
			return (
				<div style={{ display: "flex", flex: "auto", padding: "0px 20px 30px 35px" }}>
					<div style={{ flex: "auto" }}>
						<div style={{ width: "100%", height: 410, overflow: "scroll", overflowX: "hidden" }} className="scroll" id="bloc20">
							<div style={{ width: "auto", height: "auto", display: "flex", flexWrap: "wrap" }}>
								{data.data_catalogue
									.filter(info => info.categorie == "barbe")
									.map((info, i) => {
										return (
											<div
												key={i}
												className="div_barber"
												id={"div_barber_general_" + info.id}
												onClick={() => click_item(info)}
												onMouseOut={() => fonctionOut(info)}
												onMouseMove={() => fonctionMove(info)}>
												<img src={info.image} style={{ height: "100%", width: "100%", alignSelf: "center" }} />
											</div>
										);
									})}
							</div>
						</div>
					</div>
				</div>
			);
		}
		if (choiceUser == "cheveux") {
			return (
				<div style={{ display: "flex", flex: "auto", padding: "0px 20px 30px 35px" }}>
					<div style={{ flex: "auto" }}>
						<div style={{ width: "100%", height: 410, overflow: "scroll", overflowX: "hidden" }} className="scroll" id="bloc20">
							<div style={{ width: "auto", height: "auto", display: "flex", flexWrap: "wrap" }}>
								{data.data_catalogue
									.filter(info => info.categorie == "cheveux")
									.map((info, i) => {
										return (
											<div
												key={i}
												className="div_barber"
												id={"div_barber_general_" + info.id}
												onClick={() => click_item(info)}
												onMouseOut={() => fonctionOut(info)}
												onMouseMove={() => fonctionMove(info)}>
												<img src={info.image} style={{ height: "100%", width: "100%", alignSelf: "center" }} />
											</div>
										);
									})}
							</div>
						</div>
					</div>
				</div>
			);
		}
	};

	const fonctionMove = element => {
		if (element.categorie == "bouche") {
			document.getElementById("div_barber_absolue_" + element.id).style.display = "flex";
		} else {
			document.getElementById("div_barber_general_" + element.id).style.background =
				"linear-gradient(90deg, rgba(94, 108, 182, 0.3) 0%, rgba(94, 108, 182, 0.3) 100%)";
		}
	};

	const fonctionOut = element => {
		if (element.categorie == "bouche") {
			document.getElementById("div_barber_absolue_" + element.id).style.display = "none   ";
		} else {
			document.getElementById("div_barber_general_" + element.id).style.background = "rgba(255, 255, 255, 0.2)";
		}
	};

	const click_item = dataReturn => {
		setchoiceUser_Item(dataReturn);
		const tableau_temp = data?.data_catalogue.filter(info => info.categorie == dataReturn.categorie);

		for (let index = 0; index < tableau_temp.length; index++) {
			const element = tableau_temp[index];
			document.getElementById("div_barber_general_" + element.id).style.border = "0px solid transparent";
		}
		if (dataReturn.id == dataReturn.id) {
			document.getElementById("div_barber_general_" + dataReturn.id).style.border = "0.5px solid white";
		}

		const couleur_hex = blockPickerColor1;
		const couleur_rgba = hexRgb(couleur_hex);

		const menuBarber_callback = {
			action: "change_item",
			categorie: dataReturn.categorie,
			id_item_categorie: dataReturn.id,
			couleur_item_rgba: couleur_rgba,
			couleur_item_hex: couleur_hex,
			opacity: couleur_rgba.alpha,
		};

		postAsync("Menu_barberShop_callback", menuBarber_callback);
	};

	const click_header = () => {
		document.getElementById("header_btn_animation").classList.add("animation_btn");
		setTimeout(() => {
			setchoiceUser("menu");
			setview2(false);
			setTimeout(() => {
				//  document.getElementById('header_btn_animation').classList.remove('animation_btn');
			}, 1000);
		}, 300);
	};

	const click_couleur = (dataColor, bloc) => {
		setalphaValue(100);

		if (bloc == "primaire") {
			setbloc_couleur("primaire");
			setBlockPickerColor1(dataColor.rgba);

			for (let index = 0; index < data.data_couleur_primaire.length; index++) {
				const element = data.data_couleur_primaire[index];
				document.getElementById("id_couleur_primaire_" + element.id).style.border = "0px solid transparent";
			}
			if (dataColor.id == dataColor.id) {
				document.getElementById("id_couleur_primaire_" + dataColor.id).style.border = "0.5px solid white";
			}

			const menuBarber_callback = {
				action: "changeColor_primaire",
				item: choiceUser_Item,
				couleur_secondaire_gen: blockPickerColor2,
				couleur_primaire_item_rgba: dataColor.rgba,
				couleur_primaire_item_hex: dataColor.hex,
				opacity_primaire: 1,
			};

			postAsync("Menu_barberShop_callback", menuBarber_callback);
		} else {
			for (let index = 0; index < data?.data_couleur_secondaire.length; index++) {
				const element = data?.data_couleur_secondaire[index];
				document.getElementById("id_couleur_secondaire_" + element.id).style.border = "0px solid transparent";
			}
			if (dataColor.id == dataColor.id) {
				document.getElementById("id_couleur_secondaire_" + dataColor.id).style.border = "0.5px solid white";
			}

			setbloc_couleur("secondaire");
			setBlockPickerColor2(dataColor.rgba);

			const menuBarber_callback = {
				action: "changeColor_secondaire",
				item: choiceUser_Item,
				couleur_primaire_gen: blockPickerColor1,
				couleur_secondaire_item_rgba: dataColor.rgba,
				couleur_secondaire_item_hex: dataColor.hex,
				opacity_secondaire: 1,
			};

			postAsync("Menu_barberShop_callback", menuBarber_callback);
		}
	};

	const [alphaValue, setalphaValue] = useState(100);

	const handleChangeColor = c => {
		if (bloc_couleur == "primaire") {
			setBlockPickerColor1("#" + rgbHex(c.rgb.r, c.rgb.g, c.rgb.b, c.rgb.a));
			const color_rgba = hexRgb(blockPickerColor1);

			const alpha_int = color_rgba.alpha;
			const alpha_prctage = alpha_int * 100;
			const value_final = alpha_prctage.toFixed(2);
			const value = parseInt(value_final);
			setalphaValue(value);

			const menuBarber_callback = {
				action: "changeColor_primaire_opacity",
				item: choiceUser_Item,
				couleur_secondaire_gen: blockPickerColor2,
				couleur_primaire_item_hex: blockPickerColor1,
				couleur_primaire_item_rgba: color_rgba,
				opacity_primaire: color_rgba.alpha,
			};

			postAsync("Menu_barberShop_callback", menuBarber_callback);
		} else {
			setBlockPickerColor2("#" + rgbHex(c.rgb.r, c.rgb.g, c.rgb.b, c.rgb.a));
			const color_rgba = hexRgb(blockPickerColor2);

			const alpha_int = color_rgba.alpha;
			const alpha_prctage = alpha_int * 100;
			const value_final = alpha_prctage.toFixed(2);
			const value = parseInt(value_final);
			setalphaValue(value);

			const menuBarber_callback = {
				action: "changeColor_secondaire_opacity",
				item: choiceUser_Item,
				couleur_primaire_gen: blockPickerColor1,
				couleur_secondaire_item_hex: blockPickerColor2,
				couleur_secondaire_item_rgba: color_rgba,
				opacity_secondaire: color_rgba.alpha,
			};

			postAsync("Menu_barberShop_callback", menuBarber_callback);
		}
	};

	const scrollDivColorPrimaire = direction => {
		if (direction == "left") {
			const element_temp = document.getElementById("divao_primaire_scroll");
			element_temp.scrollLeft = element_temp.scrollLeft - 35;
		} else {
			const element_temp = document.getElementById("divao_primaire_scroll");
			element_temp.scrollLeft = element_temp.scrollLeft + 35;
		}
	};

	const scrollDivColorSecondaire = direction => {
		if (direction == "left") {
			const element_temp_secondaire = document.getElementById("divao_secondaire_scroll");
			element_temp_secondaire.scrollLeft = element_temp_secondaire.scrollLeft - 35;
		} else {
			const element_temp_secondaire = document.getElementById("divao_secondaire_scroll");
			element_temp_secondaire.scrollLeft = element_temp_secondaire.scrollLeft + 35;
		}
	};

	const choiceColor = () => {
		if (bloc_couleur == "primaire") {
			return blockPickerColor1;
		} else {
			return blockPickerColor2;
		}
	};

	const click_Valider = () => {
		const _menuBarber_callback = {
			action: "click_Enregistrer",
			item: choiceUser,
			couleur_primaire_gen: blockPickerColor1,
			couleur_secondaire_gen: blockPickerColor2,
		};

		setTimeout(() => {
			setBlockPickerColor1("#fff");
			setBlockPickerColor2("#fff");
			setbloc_couleur("");
			setview2(false);
			setalphaValue(100);
		}, 500);
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
				<link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet" />
			</head>
			<body>
				<div style={{ width: windowSize.innerWidth, height: windowSize.innerHeight, display: "flex" }}>
					<div
						style={{ display: "flex", flex: 1, position: "relative", backgroundColor: "black" }}
						className="Container_Principal">
						<div className="Container_BarberShop">
							<div style={{ height: 20 }} />
							<div style={{ display: "flex", height: 85, width: "100%", alignItems: "center" }}>
								<img
									id="header_btn_animation"
									className="div_btn_barber"
									onClick={() => click_header()}
									style={{
										height: "100%",
										cursor: "pointer",
										width: 338,
										position: "relative",
										left: -30,
										borderRadius: 10,
										display: "none",
									}}
									src="https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/BARBER.webp"
								/>
								{renderLogo()}
							</div>
							<div style={{ height: 20 }} />
							{renderContent()}
						</div>

						<div className="Container_BarberShop2" style={{ display: view2 ? "flex" : "none" }}>
							<div style={{ width: 70 }} />
							<div style={{ flex: "auto", display: "flex", padding: "20px 5px 20px 5px" }}>
								<div style={{ flex: "auto", width: 350, display: "flex", flexDirection: "column" }}>
									<div className="text_title">OPACITÉ</div>
									<div style={{ height: 5 }} />
									<div style={{ height: 23, width: "100%", display: "flex", position: "relative", cursor: "pointer" }}>
										<AlphaPicker width="100%" color={choiceColor()} onChange={c => handleChangeColor(c)} />
										<div className="text_alpha">{alphaValue} %</div>
									</div>
									<div style={{ height: 20 }} />
									<div className="text_title">COULEUR PRIMAIRE</div>
									<div style={{ height: 5 }} />
									<div
										style={{
											height: 32,
											width: "auto",
											display: "flex",
											position: "relative",
											alignItems: "center",
											background:
												"linear-gradient(90.02deg, rgba(255, 255, 255, 0) 3.78%, rgba(255, 255, 255, 0.12) 34.05%, rgba(255, 255, 255, 0.122) 64.32%, rgba(255, 255, 255, 0) 94.59%)",
										}}>
										<img
											src="https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/chevron_left.webp"
											style={{ position: "absolute", left: -30, cursor: "pointer" }}
											onClick={() => scrollDivColorPrimaire("left")}
										/>
										<div
											style={{
												width: "auto",
												height: "100%",
												overflow: "auto",
												flexDirection: "row",
												whiteSpace: "nowrap",
												overflowY: "hidden",
												overflowX: "hidden",
											}}
											id="divao_primaire_scroll">
											{data?.data_couleur_primaire.map((info, i) => {
												return (
													<div
														key={i}
														onClick={() => click_couleur(info, "primaire")}
														id={"id_couleur_primaire_" + info.id}
														style={{
															height: 30,
															cursor: "pointer",
															display: "inline-block",
															width: 30,
															marginRight: 5,
															borderRadius: 30,
															border: "transparent",
															background: info.background,
														}}
													/>
												);
											})}
										</div>
										<img
											src="https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/chevron_right.webp"
											style={{ position: "absolute", right: -30, cursor: "pointer" }}
											onClick={() => scrollDivColorPrimaire("right")}
										/>
									</div>
									<div style={{ height: 20 }} />
									<div className="text_title">COULEUR SECONDAIRE</div>
									<div style={{ height: 5 }} />
									<div
										style={{
											height: 32,
											width: "auto",
											display: "flex",
											position: "relative",
											alignItems: "center",
											background:
												"linear-gradient(90.02deg, rgba(255, 255, 255, 0) 3.78%, rgba(255, 255, 255, 0.12) 34.05%, rgba(255, 255, 255, 0.122) 64.32%, rgba(255, 255, 255, 0) 94.59%)",
										}}>
										<img
											src="https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/chevron_left2.webp"
											style={{ position: "absolute", left: -30, cursor: "pointer" }}
											onClick={() => scrollDivColorSecondaire("left")}
										/>
										<div
											style={{
												width: "auto",
												cursor: "pointer",
												height: "100%",
												overflow: "auto",
												flexDirection: "row",
												whiteSpace: "nowrap",
												overflowY: "hidden",
												overflowX: "hidden",
											}}
											id="divao_secondaire_scroll">
											{data?.data_couleur_secondaire.map((info, i) => {
												return (
													<div
														key={i}
														onClick={() => click_couleur(info, "secondaire")}
														id={"id_couleur_secondaire_" + info.id}
														style={{
															height: 30,
															cursor: "pointer",
															display: "inline-block",
															width: 30,
															marginRight: 5,
															borderRadius: 30,
															border: "transparent",
															background: info.background,
														}}
													/>
												);
											})}
										</div>
										<img
											src="https://cdn.sacul.cloud/v2/vision-cdn/BarberShop/chevron_right2.webp"
											style={{ position: "absolute", right: -30, cursor: "pointer" }}
											onClick={() => scrollDivColorSecondaire("right")}
										/>
									</div>
								</div>
							</div>
							<div style={{ width: 70 }} />
						</div>
					</div>
				</div>
			</body>
		</html>
	);
};

export default Menu_barberShop;
