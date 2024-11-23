import "./style.scss";

import { capitalizeFirstLetter, formatNumberForDollar } from "../../utils/utils";

import React from "react";
import { ReactSVG } from "react-svg";
import dayjs from "dayjs";
import { useExitKeys } from "../../hooks/useExitKeys";

const TabletteMain: React.FC<any> = ({ _changePage, data }) => {
	const levels = [
		// {
		//     name: 'TERRITOIRE',
		//     image: 'https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/territory.svg',
		//     id: 'territory'
		// },
		// {
		//     name: 'DOUBLE BUSINESS',
		//     image: 'https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/doubleBusiness.svg',
		//     id: 'doubleBusiness'
		// },
		// {
		//     name: 'PRODUCTEUR',
		//     image: 'https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/production.svg',
		//     id: 'production'
		// },
		// {
		//     name: 'TRAFIC D\'ARMES',
		//     image: 'https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/weaponTrafic.svg',
		//     id: 'weaponTrafic'
		// },
		{
			name: "TERRITOIRE",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/territory.svg",
			id: "territory",
		},
		{
			name: "LABORATOIRE",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/laboratory.svg",
			id: "laboratory",
		},
		// {
		//     name: 'COMMANDE',
		//     image: 'https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/PANIER.svg',
		//     id: 'command'
		// },
		{
			name: "DOUBLE BUSINESS",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/doubleBusiness.svg",
			id: "doubleBusiness",
		},
		{
			name: "TRAFIC D'ARMES",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/weaponTrafic.svg",
			id: "weaponTrafic",
		},
		{
			name: "ACCELERATION",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/SABLIER.svg",
			id: "upgrade",
		},
	];

	const rangs = ["D", "C", "B", "A", "S"];

	const notificationNumber = data?.orders.filter(e => dayjs().isBefore(dayjs(e.date))).length;

	useExitKeys();

	return (
		<>
			<div className="Content">
				<div
					className="Informations A-SlideIn"
					style={{
						animationDelay: ".8s",
					}}>
					<div className="Up">
						<div className="Logo">
							<img src="https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/profile.webp" />
						</div>
						<div className="Span">{data?.crewName.toUpperCase()}</div>
						<div className="Motto">{data?.crewMotto.toUpperCase()}</div>
					</div>
					<div className="Infos">
						<div className="Span">INFORMATIONS</div>
						<div className="Bar"></div>
					</div>
					<div
						className="InfosContainer"
						style={{
							marginTop: 30,
						}}>
						<div className="Name">
							TOTAL DÉPENSÉ :<div className="Span">{formatNumberForDollar(data?.informations.totalSpent)}</div>
						</div>
					</div>
					<div className="InfosContainer">
						<div className="Name">
							COMMANDES PASSÉES :<div className="Span">{data?.informations.totalCommands}</div>
						</div>
					</div>
					<div className="InfosContainer">
						<div className="Name">
							PRODUIT LE PLUS COMMANDÉ :<div className="Span">{data?.informations.mostOrdered}</div>
						</div>
					</div>
				</div>
				<div
					className="Commandes A-SlideIn"
					style={{
						animationDelay: "1s",
					}}>
					<div className="Logo">
						{notificationNumber > 0 && <div className="Notification">{notificationNumber}</div>}
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/calendar.webp" />
					</div>
					<div className="Container">
						<div className="Title">Historique des commandes</div>
						<div className="CommandeList">
							{data?.orders.map((e, key) => (
								<div key={key} className="CommandeContainer">
									<div
										className="Commande"
										style={
											dayjs(e.date).isBefore(dayjs())
												? {
														borderLeft: "10px solid white",
													}
												: {
														borderLeft: "10px solid #F6C903",
													}
										}>
										<div className="Up">
											<div className="Date">{dayjs(e.date).format("DD MMM")}</div>
											<div className="Additional">
												{capitalizeFirstLetter(e.type) +
													(dayjs(e.date).isBefore(dayjs()) ? " à " : " à venir ") +
													dayjs(e.date).format("hh:mm")}
											</div>
											<div className="Price">{formatNumberForDollar(e.price)}</div>
										</div>
										<div className="Items">
											{e.items.map((_e, key) => (
												<div key={key} className="Item">
													x{_e.quantity} {_e.name}
												</div>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div
					className="CrewRank A-SlideIn"
					style={{
						animationDelay: "1.2s",
					}}>
					<div className="CrewGeneral">
						<div className="Logo">
							<img src="https://cdn.sacul.cloud/v2/vision-cdn/TabletteIllegale/levelup.webp" />
						</div>
						<div className="Span">
							Rang de Crew
							<div className="SubSpan">SCORE XP : {data?.crewXp}</div>
						</div>
					</div>
					<div className="CrewLevels">
						{levels.map((e, index) => (
							<div key={index} className="Level">
								<div className={"Head " + (data?.crewLevel > index ? "yellow" : "")}>RANG {rangs[index]}</div>
								<div className={"Body " + (data?.crewLevel > index ? "yellow" : "")}>
									<ReactSVG className="Svg" src={e.image} />
									<div className="Span">{e.name}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				style={{
					position: "fixed",
					top: -300,
				}}>
				<linearGradient id="initial" x1="0" x2="0" y1="0" y2="1">
					<stop offset="0%" stopColor="#FFFFFF" />
					<stop offset="100%" stopColor="#C5C5C5" />
				</linearGradient>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				style={{
					position: "fixed",
					top: -300,
				}}>
				<linearGradient id="high" x1="0" x2="0" y1="0" y2="1">
					<stop offset="0%" stopColor="#F89427" />
					<stop offset="100%" stopColor="#FBBC04" />
				</linearGradient>
			</svg>
		</>
	);
};

export default TabletteMain;
