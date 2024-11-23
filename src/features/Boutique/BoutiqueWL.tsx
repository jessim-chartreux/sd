import "./style.scss";

import React, { useContext, useEffect, useState } from "react";
import { playBoutiqueEnter, playBoutiqueLeave } from "../../utils/sounds";

import { BoutiqueHeader } from "../../components/UI/BoutiqueHeader/BoutiqueHeader";
import { GlobalContext } from "../../app";
import { SERVER } from "../../config";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useEnterKey } from "../../hooks/useEnterKey";
import { useExitKeys } from "../../hooks/useExitKeys";
import { useKey } from "../../hooks/useKey";

const BoutiqueWL: React.FC = () => {
	const [show, setShow] = useState("addonBoutique");
	const [custom, setCustom] = useState({});
	const [selected, setSelected] = useState<any>(null);
	const [colorIndex, setColorIndex] = useState(0);
	const [category, setCategory] = useState<null | number>(null);
	const [sex, setSex] = useState(0);
	const [selectedElement, setSelectedElement] = useState<any>(-1);
	const context = useContext(GlobalContext);
	const data: any | null = isDev
		? {
				balance: 1545,
				premium: true,
				unique_id: 69,
				nextCollection: "2023/08/26",
				catalogue: [
					{
						id: 1,
						category: 5,
						name: "ROLEX",
						subName: "Montre de luxe",
						availableColors: [
							{
								value: "#AFFFFF",
								front: "https://cdn.discordapp.com/attachments/1039559678356627509/1147089759177556058/61bfdda370395669ef69045868e36170.webp",
								back: "https://cdn.discordapp.com/attachments/1039559678356627509/1147089758787489832/17c8ff87c615c77f628e8da19807e99b.webp",
								icon: "https://cdn.discordapp.com/attachments/1039559678356627509/1147087047010558022/image.webp",
								name: "LAKERS",
								subName: "YELLOW EDITION",
							},
							{
								value: "#BA0293",
								front: "https://cdn.discordapp.com/attachments/1039559678356627509/1147089759177556058/61bfdda370395669ef69045868e36170.webp",
								back: "https://cdn.discordapp.com/attachments/1039559678356627509/1147089758787489832/17c8ff87c615c77f628e8da19807e99b.webp",
								icon: "https://cdn.discordapp.com/attachments/1039559678356627509/1147087083970756670/image.webp",
								name: "CELTICS",
								subName: "WHITE EDITION",
							},
						],
						price: 3000,
						customFields: [
							{ label: "NUMÉRO", type: "number" },
							{ label: "NOM", type: "text" },
						],
						owned: false,
						isNew: true,
					},
					{
						id: 1,
						category: 8,
						name: "ROLEX",
						subName: "Montre de luxe",
						availableColors: [
							{
								value: "#AFFFFF",
								front: "https://cdn.discordapp.com/attachments/1039559678356627509/1147089759177556058/61bfdda370395669ef69045868e36170.webp",
								back: "https://cdn.discordapp.com/attachments/1039559678356627509/1147089758787489832/17c8ff87c615c77f628e8da19807e99b.webp",
								icon: "https://cdn.discordapp.com/attachments/1039559678356627509/1147087047010558022/image.webp",
								name: "LAKERS",
								subName: "YELLOW EDITION",
							},
							{
								value: "#BA0293",
								front: "https://cdn.discordapp.com/attachments/1039559678356627509/1147089759177556058/61bfdda370395669ef69045868e36170.webp",
								back: "https://cdn.discordapp.com/attachments/1039559678356627509/1147089758787489832/17c8ff87c615c77f628e8da19807e99b.webp",
								icon: "https://cdn.discordapp.com/attachments/1039559678356627509/1147087083970756670/image.webp",
								name: "CELTICS",
								subName: "WHITE EDITION",
							},
						],
						price: 3000,
						customFields: [
							{ label: "NUMÉRO", type: "number" },
							{ label: "NOM", type: "text" },
						],
						owned: false,
						isNew: true,
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
					{
						id: 7,
						category: 1,
						name: "HAUTS",
						subName: "Gucci",
						availableColors: [
							{ value: "#AFFFFF", image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp" },
							{ value: "#BA0293", image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp" },
						],
						price: 3000,
						customFields: ["ECRITURE", "NUMERO"],
						owned: false,
					},
					{
						id: 8,
						category: 1,
						name: "VESTE3",
						subName: "Balmain",
						availableColors: [
							{
								value: "#AFFFFF",
								image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp",
								subName: "Blue edition",
							},
							{
								value: "#BA0293",
								image: "https://cdn.sacul.cloud/v2/vision-cdn/Boutique/placeholder.webp",
								subName: "Pink edition",
							},
						],
						price: 3000,
						customFields: ["ECRITURE", "NUMERO"],
						owned: false,
					},
				],
			}
		: context.data;
	/* const [time, setTime] = useState<any>();
	const categories = [
		{
			name: "Vêtements",
			icon: "vet-cu",
		},
		{
			name: "Bijoux",
			icon: "bij-cu",
		},
		{
			name: "Masque",
			icon: "mas",
		},
		{
			name: "Tatoo",
			icon: "tat",
		},
	]; */

	useKey("e", () => {
		postAsync("buyVCoins");
	});

	useExitKeys();

	useEffect(() => {
		if (category) {
			setSelected(data.catalogue.filter(e => e.category === category && !e?.owned)?.[0]);
		}
	}, [category]);

	useEffect(() => {
		setColorIndex(0);
		setCustom({});
	}, [selected]);

	/* const downSelectedElementAddon = (b?: boolean) => {
		if (selectedElement > 0) setSelectedElement(selectedElement - 1);
		else setSelectedElement(3);
	};

	const upSelectedElementAddon = (b?: boolean) => {
		if (b && selectedElement == 0) setSelectedElement(2);
		else if (selectedElement < 3) setSelectedElement(selectedElement + 1);
		else setSelectedElement(0);
	}; */

	const downSelectedElementCustom = (b?: boolean) => {
		if (b && selectedElement > 1) setSelectedElement(selectedElement - 2);
		else if (selectedElement > 0) setSelectedElement(selectedElement - 1);
		else setSelectedElement(5);
	};

	const upSelectedElementCustom = (b?: boolean) => {
		if (b && selectedElement <= 3) setSelectedElement(selectedElement + 2);
		else if (selectedElement < 5) setSelectedElement(selectedElement + 1);
		else setSelectedElement(0);
	};

	const playSound = () => {
		if (selectedElement !== 5) playBoutiqueEnter();
		else playBoutiqueLeave();
	};

	const enterCustom = () => {
		playSound();

		if (selectedElement == 0) {
			postAsync("BoutiqueCategory", { button: "CustomVetements", sex });
		} else if (selectedElement == 1) {
			postAsync("BoutiqueCategory", { button: "CustomBijoux", sex });
		} else if (selectedElement == 2) {
			postAsync("BoutiqueCategory", { button: "CustomMasque", sex });
		} else if (selectedElement == 3) {
			postAsync("BoutiqueCategory", { button: "CustomTatouage", sex });
		} else if (selectedElement == 4) {
			postAsync("BoutiqueCategory", { button: "CustomVehicules", sex });
		} else if (selectedElement == 5) {
			setShow("addonBoutique");
			setSelectedElement(0);
		}
	};

	useKey("ArrowRight", () => {
		upSelectedElementCustom(true);
	});

	useKey("ArrowLeft", () => {
		downSelectedElementCustom(true);
	});

	useKey("ArrowDown", () => {
		upSelectedElementCustom();
	});

	useKey("ArrowUp", () => {
		downSelectedElementCustom();
	});

	useEnterKey(() => {
		enterCustom();
	});

	return (
		<div className="BoutiqueWL">
			<BoutiqueHeader data={data} server={SERVER} />
			<div className="main">
				<div className="header">
					<h1 className="title">{"Subscriber"}</h1>
				</div>
				<div className="cards">
					<div
						className="card"
						style={{ backgroundImage: `url("https://cdn.sacul.cloud/v2/vision-cdn/Boutique/Sub1.webp")` }}
						onClick={() => {
							postAsync("SubSubscriber", { permanent: false });
							playBoutiqueEnter();
						}}></div>
					<div
						className="card"
						style={{ backgroundImage: `url("https://cdn.sacul.cloud/v2/vision-cdn/Boutique/Sub2.webp")` }}
						onClick={() => {
							postAsync("SubSubscriber", { permanent: true });
							playBoutiqueEnter();
						}}></div>
					<div
						className="card"
						style={{ backgroundImage: `url("https://cdn.sacul.cloud/v2/vision-cdn/Boutique/veh.png?format=webp")` }}
						onClick={() => {
							postAsync("BoutiqueCategory", { button: "VehiculesBoutique", sex });
							playBoutiqueEnter();
						}}></div>
				</div>
			</div>
			<div className="TurnAroundButton">
				<div>
					{"QUITTER LE MENU"}
					<div className="Button">{"ECHAP"}</div>
				</div>
			</div>
		</div>
	);
};

export default BoutiqueWL;
