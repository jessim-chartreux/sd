import "./style.scss";

import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../app";
import dayjs from "dayjs";
import { isDev } from "../../utils/isDev";

const BoutiqueCustom: React.FC = () => {
	const [show, setShow] = useState("main");
	const [custom, setCustom] = useState({});
	const [selected, setSelected] = useState<any>(null);
	const [colorIndex, setColorIndex] = useState(0);
	const [category, setCategory] = useState<null | number>(null);
	const catalogue = [
		{
			id: 1,
			category: 2,
			name: "ROLEX",
			subName: "Montre de luxe",
			availableColors: [
				{ value: "#AFFFFF", image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp" },
				{ value: "#BA0293", image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp" },
			],
			price: 3000,
			customFields: ["ECRITURE", "NUMERO"],
			owned: false,
		},
		{
			id: 2,
			category: 2,
			name: "ROLEX2",
			subName: "Montre de luxe",
			availableColors: [
				{ value: "#AFFFFF", image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp" },
				{ value: "#BA0293", image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp" },
			],
			price: 3000,
			customFields: ["ECRITURE", "NUMERO"],
			owned: false,
		},
		{
			id: 3,
			category: 2,
			name: "ROLEX3",
			subName: "Montre de luxe",
			availableColors: [
				{ value: "#AFFFFF", image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp" },
				{ value: "#BA0293", image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp" },
			],
			price: 3000,
			customFields: ["ECRITURE", "NUMERO"],
			owned: false,
		},
		{
			id: 4,
			category: 2,
			name: "ROLEX4",
			subName: "Montre de luxe",
			availableColors: [
				{ value: "#AFFFFF", image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp" },
				{ value: "#BA0293", image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp" },
			],
			price: 3000,
			customFields: ["ECRITURE", "NUMERO"],
			owned: false,
		},
		{
			id: 5,
			category: 2,
			name: "ROLEX5",
			subName: "Montre de luxe",
			availableColors: [
				{ value: "#AFFFFF", image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp" },
				{ value: "#BA0293", image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp" },
			],
			price: 3000,
			customFields: ["ECRITURE", "NUMERO"],
			owned: false,
		},
		{
			id: 6,
			category: 2,
			name: "ROLEX6",
			subName: "Montre de luxe",
			availableColors: [
				{ value: "#AFFFFF", image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp" },
				{ value: "#BA0293", image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp" },
			],
			price: 3000,
			customFields: ["ECRITURE", "NUMERO"],
			owned: false,
		},
	];
	const [sex, setSex] = useState(0);
	const context = useContext(GlobalContext);
	const [time, setTime] = useState<any>();

	useEffect(() => {
		const duration = 2;
		const endTime = new Date();
		endTime.setMinutes(endTime.getMinutes() + duration);
		let min = duration;
		let sec = 0;

		const interval = setInterval(() => {
			sec--;
			if (sec === -1) {
				sec = 59;
				min--;
			}
			const newValue = (
				<>
					<span className="minutes">{formatNumber(min)}</span>
					<span className="divider">:</span>
					<span className="seconds">{formatNumber(sec)}</span>
				</>
			);
			if (min === 0 && sec === 0) {
				clearInterval(interval);
			}
			setTime(newValue);
		}, 1000);
	}, []);

	const formatNumber = num => {
		return num.toLocaleString("en-US", {
			minimumIntegerDigits: 2,
			useGrouping: false,
		});
	};

	useEffect(() => {
		if (category) {
			setSelected(catalogue.filter(e => e.category === category && !e?.owned)?.[0]);
		}
	}, [category]);

	useEffect(() => {
		setColorIndex(0);
		setCustom({});
	}, [selected]);

	const data: any | null = isDev
		? {
				balance: 1545,
			}
		: context.data;

	return (
		<div className="BoutiqueCustom">
			{show === "???" && (
				<div className="ActiveCat">
					<div className="ActiveCatContent">
						<div className="Left">
							<div className="Name">{selected?.name}</div>
							<div className="SubName">{selected?.subName}</div>

							<div className="Span">COULEURS</div>
							<div className="Colors">
								{selected?.availableColors?.map((e, i) => (
									<div
										className={"Color" + (i === colorIndex ? " Selected" : "")}
										onClick={e => setColorIndex(i)}
										style={{ background: e.value }}
									/>
								))}
							</div>

							{selected?.customFields?.map(e => {
								return (
									<>
										{" "}
										<div className="Span">{e} :</div>
										<input
											type="text"
											className="Input"
											value={custom?.[e] ?? ""}
											onChange={ev => {
												const _custom = { ...custom };
												_custom[e] = ev?.currentTarget?.value;
												setCustom(_custom);
											}}
										/>
									</>
								);
							})}
						</div>
						<div className="Center">
							<div
								className="LeftArrow"
								onClick={() => {
									if (colorIndex === 0) {
										setColorIndex(selected.availableColors.length - 1);
									} else {
										setColorIndex(colorIndex - 1);
									}
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/left.svg" />
							</div>
							<div className="ImageContainer">
								<img src={selected?.availableColors?.[colorIndex]?.image} />
							</div>
							<div
								className="RightArrow"
								onClick={() => {
									if (colorIndex === selected.availableColors.length - 1) {
										setColorIndex(0);
									} else {
										setColorIndex(colorIndex + 1);
									}
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/left.svg" />
							</div>

							<div className="Price">
								<div className="Background2">
									<div className="Value">{selected?.price}</div>
									<svg xmlns="http://www.w3.org/2000/svg" width="178" height="49" viewBox="0 0 178 49" fill="none">
										<path
											d="M3.78366 8.37673C4.33519 3.69773 8.30106 0.171875 13.0125 0.171875H168.4C173.941 0.171875 178.25 4.98951 177.635 10.4959L174.263 40.6979C173.737 45.4017 169.76 48.9592 165.027 48.9592H9.45239C3.88901 48.9592 -0.427669 44.1038 0.223605 38.5787L3.78366 8.37673Z"
											fill="url(#paint0_linear_2135_328)"
										/>
										<defs>
											<linearGradient
												id="paint0_linear_2135_328"
												x1="86.1701"
												y1="0.171875"
												x2="86.1701"
												y2="48.9592"
												gradientUnits="userSpaceOnUse">
												<stop stopColor="#F5C724" />
												<stop offset="1" stopColor="#F77F20" />
											</linearGradient>
										</defs>
									</svg>
								</div>
								<div className="Background3">
									<div className="Logo">
										<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/logo.webp" />
									</div>
									<svg xmlns="http://www.w3.org/2000/svg" width="67" height="50" viewBox="0 0 67 50" fill="none">
										<path
											d="M1.74516 9.05981C1.96184 4.08973 6.05424 0.171875 11.029 0.171875H57.1072C62.3899 0.171875 66.61 4.56989 66.392 9.84806L65.1355 40.2691C64.9299 45.2479 60.8338 49.1783 55.8507 49.1783H9.70275C4.4117 49.1783 0.188421 44.7668 0.418879 39.4808L1.74516 9.05981Z"
											fill="url(#paint0_linear_2135_329)"
										/>
										<defs>
											<linearGradient
												id="paint0_linear_2135_329"
												x1="32.3818"
												y1="0.171875"
												x2="32.3818"
												y2="49.1783"
												gradientUnits="userSpaceOnUse">
												<stop stopColor="#F98F02" />
												<stop offset="1" stopColor="#FE5301" />
											</linearGradient>
										</defs>
									</svg>
								</div>
							</div>
						</div>
						<div className="Right">
							<div className="NewBoutique">
								<div className="Text">NOUVELLE BOUTIQUE</div>
								<div className="Timer">{time}</div>
							</div>
							<div className="ProductList">
								{catalogue
									.filter(e => e.category === category && !e?.owned && e?.id !== selected?.id)
									.map(e => (
										<div className="Product" onClick={() => setSelected(e)}>
											<div className="Image">
												<img src={e?.availableColors?.[0]?.image} />
											</div>
											<div className="NameContainer">
												<div className="Name">{e?.name}</div>
												<div className="SubName">{e?.subName}</div>
											</div>
											<div className="Price">{e?.price}</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
			)}
			{show === "main" && (
				<div className="Main">
					{/* <div className="Balance">
                        <div className="Background2">
                            <div className="Value">
                                <CountUp end={data.balance} start={data.balance} separator="" />
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="178" height="49" viewBox="0 0 178 49" fill="none">
                                <path d="M3.78366 8.37673C4.33519 3.69773 8.30106 0.171875 13.0125 0.171875H168.4C173.941 0.171875 178.25 4.98951 177.635 10.4959L174.263 40.6979C173.737 45.4017 169.76 48.9592 165.027 48.9592H9.45239C3.88901 48.9592 -0.427669 44.1038 0.223605 38.5787L3.78366 8.37673Z" fill="url(#paint0_linear_2135_328)" />
                                <defs>
                                    <linearGradient id="paint0_linear_2135_328" x1="86.1701" y1="0.171875" x2="86.1701" y2="48.9592" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F5C724" />
                                        <stop offset="1" stopColor="#F77F20" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="Background3">
                            <div className="Logo">
                                <img src='https://cdn.sacul.cloud/v2/vision-cdn/icons/logo.webp' />
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="67" height="50" viewBox="0 0 67 50" fill="none">
                                <path d="M1.74516 9.05981C1.96184 4.08973 6.05424 0.171875 11.029 0.171875H57.1072C62.3899 0.171875 66.61 4.56989 66.392 9.84806L65.1355 40.2691C64.9299 45.2479 60.8338 49.1783 55.8507 49.1783H9.70275C4.4117 49.1783 0.188421 44.7668 0.418879 39.4808L1.74516 9.05981Z" fill="url(#paint0_linear_2135_329)" />
                                <defs>
                                    <linearGradient id="paint0_linear_2135_329" x1="32.3818" y1="0.171875" x2="32.3818" y2="49.1783" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#F98F02" />
                                        <stop offset="1" stopColor="#FE5301" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div className="BuyVCoins TurnAroundButton">
                        <div>ACHETER DES VCOINS<div className="Button">E</div></div>
                    </div>
                    <div className="TurnAroundButton">
                        <div>QUITTER LE MENU<div className="Button">ECHAP</div></div>
                    </div> */}
					<div className="MainContent">
						<div className="Title">
							<b>BOUTIQUE</b> CUSTOM
						</div>
						{/* <div className="Category">
                            <span className={sex === 0 && "Selected"} onClick={() => setSex(0)}>Homme</span>
                            <span className={sex === 1 && "Selected"} onClick={() => setSex(1)}>Femme</span>
                        </div> */}
						<div className="Nav">
							<div className="Left">
								<div className="Element">
									<img src="https://cdn.sacul.cloud/v2/vision-cdn/Boutique/vet.webp" className="Bg" />
									<div className="Name">VETEMENTS</div>
									<div className="SubName">EXCLUSIFS</div>
								</div>
								<div
									className="Element"
									onClick={() => {
										setShow("???");
										setCategory(2);
									}}>
									<img src="https://cdn.sacul.cloud/v2/vision-cdn/Boutique/bij.webp" className="Bg" />
									<div className="Name">BIJOUX</div>
									<div className="SubName">DE MARQUE</div>
								</div>
							</div>
							<div className="Element">
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/Boutique/voit.webp" className="Bg" />
								<div className="Name">VEHICULES</div>
								<div className="SubName">INÉDITS</div>
								<div className="Decompte">{dayjs("2023-07-30").diff(dayjs(), "day")} JOURS RESTANTS</div>
							</div>
							<div className="Element">
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/Boutique/cus.webp" className="Bg" />
								<div className="Name">CUSTOM</div>
								<div className="SubName">ADDONS</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BoutiqueCustom;
