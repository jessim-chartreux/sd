import "./style.scss";

import React, { useContext, useState } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

//https://assets-vision-fa.cdn.purplemaze.net/https://cdn.sacul.cloud/v2/vision-cdn/Concessionnaire/Voiture/%22..v.name..%22.webp

type Table = {
	garage: [];
	pound: [];
	isPremium: boolean;
};

type Vehicule = {
	id: number;
	price?: number;
	image: string;
	name: string;
	label: string;
};

const GaragePublique: React.FC = () => {
	const context = useContext(GlobalContext);

	const [tab, setTab] = useState<"garage" | "fourriere">("garage");
	const [lastClick, setLastClick] = useState<number>(0);

	const blank_data = {
		garage: [],
		pound: [
			{
				id: 1,
				price: 0,
				image: "https://assets-vision-fa.cdn.purplemaze.net/https://cdn.sacul.cloud/v2/vision-cdn/Concessionnaire/Voiture/jugular.webp",
				name: "jugular",
				label: "Jugular SACULPD",
			},
			{
				id: 2,
				price: 0,
				image: "https://assets-vision-fa.cdn.purplemaze.net/https://cdn.sacul.cloud/v2/vision-cdn/Concessionnaire/Voiture/jugular.webp",
				name: "jugular",
				label: "Jugular SACULPD",
			},
			{
				id: 3,
				price: 0,
				image: "https://assets-vision-fa.cdn.purplemaze.net/https://cdn.sacul.cloud/v2/vision-cdn/Concessionnaire/Voiture/jugular.webp",
				name: "jugular",
				label: "Jugular SACULPD",
			},
			{
				id: 4,
				price: 0,
				image: "https://assets-vision-fa.cdn.purplemaze.net/https://cdn.sacul.cloud/v2/vision-cdn/Concessionnaire/Voiture/jugular.webp",
				name: "jugular",
				label: "Jugular SACULPD",
			},
			{
				id: 5,
				price: 0,
				image: "https://assets-vision-fa.cdn.purplemaze.net/https://cdn.sacul.cloud/v2/vision-cdn/Concessionnaire/Voiture/jugular.webp",
				name: "jugular",
				label: "Jugular SACULPD",
			},
			{
				id: 6,
				price: 0,
				image: "https://assets-vision-fa.cdn.purplemaze.net/https://cdn.sacul.cloud/v2/vision-cdn/Concessionnaire/Voiture/jugular.webp",
				name: "jugular",
				label: "Jugular SACULPD",
			},
			{
				id: 7,
				price: 0,
				image: "https://assets-vision-fa.cdn.purplemaze.net/https://cdn.sacul.cloud/v2/vision-cdn/Concessionnaire/Voiture/jugular.webp",
				name: "jugular",
				label: "Jugular SACULPD",
			},
			{
				id: 8,
				price: 0,
				image: "https://assets-vision-fa.cdn.purplemaze.net/https://cdn.sacul.cloud/v2/vision-cdn/Concessionnaire/Voiture/jugular.webp",
				name: "jugular",
				label: "Jugular SACULPD",
			},
		],
		isPremium: false,
		garageType: "voiture",
	};

	const data: any = isDev ? blank_data : context.data;

	const getVehicle = async (veh: Vehicule) => {
		if (!veh) return;

		if (lastClick === veh.id) return;
		setLastClick(veh.id);

		console.log("click", veh.id, lastClick);

		postAsync("getVehicule", { veh, tab });
	};

	useExitKeys();

	return (
		<div className="GaragePublique" style={{ width: 490, height: 600 }}>
			{(!data.garageType || data.garageType === "voiture") && (
				<div className="GaragePublique-header">
					<img className="GaragePublique-headerImage" src={"https://cdn.sacul.cloud/v2/vision-cdn/GaragePublique/header.webp"} />
					<div className="GaragePublique-boutique">
						<img src={"https://cdn.sacul.cloud/v2/vision-cdn/GaragePublique/car_icon.webp"} />
						<span>Voitures</span>
					</div>
				</div>
			)}

			{data.garageType === "bateau" && (
				<div className="GaragePublique-header">
					<img className="GaragePublique-headerImage" src={"https://cdn.sacul.cloud/v2/vision-cdn/GaragePublique/header2.webp"} />
					<div className="GaragePublique-boutique">
						<img src={"https://cdn.sacul.cloud/v2/vision-cdn/GaragePublique/ship_icon.webp"} />
						<span>Bateaux</span>
					</div>
				</div>
			)}

			<div className="GaragePublique-centeredContent">
				<div className="GaragePublique-tab">
					<div
						className={tab === "garage" ? "GaragePublique-tabItem active" : "GaragePublique-tabItem"}
						onClick={() => {
							setTab("garage");
							setLastClick(0);
						}}>
						Garage
					</div>
					<div
						className={tab === "fourriere" ? "GaragePublique-tabItem active" : "GaragePublique-tabItem"}
						onClick={() => {
							setTab("fourriere");
							setLastClick(0);
						}}>
						Fourrière
					</div>
				</div>
			</div>
			<div className="GaragePublique-listContainer">
				<div className="GaragePublique-itemList">
					{tab === "garage" && data.isPremium && (
						<>
							<div key={1} className="GaragePublique-item active" onClick={() => getVehicle(data.garage[0])}>
								<img src={data.garage[0] ? data.garage[0].image : ""} />
								<React.Fragment>
									<div className="GaragePublique-name">{data.garage[0] ? data.garage[0].label : "Emplacement #1"}</div>
								</React.Fragment>
							</div>
							<div key={2} className="GaragePublique-item active" onClick={() => getVehicle(data.garage[1])}>
								<img src={data.garage[1] ? data.garage[1].image : ""} />
								<React.Fragment>
									<div className="GaragePublique-name">{data.garage[1] ? data.garage[1].label : "Emplacement #2"}</div>
								</React.Fragment>
							</div>
							<div key={3} className="GaragePublique-item active" onClick={() => getVehicle(data.garage[2])}>
								<img src={data.garage[2] ? data.garage[2].image : ""} />
								<React.Fragment>
									<div className="GaragePublique-name">{data.garage[2] ? data.garage[2].label : "Emplacement #3"}</div>
								</React.Fragment>
							</div>
						</>
					)}

					{tab === "garage" && !data.isPremium && (
						<>
							<div key={1} className="GaragePublique-item active" onClick={() => getVehicle(data.garage[0])}>
								<img src={data.garage[0] ? data.garage[0].image : ""} />
								<React.Fragment>
									<div className="GaragePublique-name">{data.garage[0] ? data.garage[0].label : "Emplacement #1"}</div>
								</React.Fragment>
							</div>
							<div key={2} className="GaragePublique-item locked">
								<React.Fragment>
									<div className="GaragePublique-name locked">Emplacement #2</div>
								</React.Fragment>
							</div>
							<div key={3} className="GaragePublique-item locked">
								<React.Fragment>
									<div className="GaragePublique-name locked">Emplacement #3</div>
								</React.Fragment>
							</div>
						</>
					)}

					{tab === "fourriere" && (
						<>
							{data.pound.map((item: Vehicule) => {
								return (
									<div key={item.id} className="GaragePublique-item active" onClick={() => getVehicle(item)}>
										<img src={item.image} />
										<React.Fragment>
											<div className="GaragePublique-name">{item.label}</div>
										</React.Fragment>
									</div>
								);
							})}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default GaragePublique;
