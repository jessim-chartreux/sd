import "./style.scss";

import React, { useContext, useEffect, useState } from "react";

import Button from "../../components/UI/Button/Buttton";
import { GlobalContext } from "../../app";
import MenuBuilder from "../../components/MenuBuilder/MenuBuilder";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useEnterKey } from "../../hooks/useEnterKey";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuAnimalerie: React.FC = () => {
	const context = useContext(GlobalContext);
	const [show, setShow] = useState("main");
	const [button, setButton] = useState(false);
	const [name, setName] = useState("");
	const [selections, setSelections] = useState<any[]>([]);
	const [selected, setSelected] = useState(null);
	const [catalogue, setCatalogue] = useState([
		{
			id: 1,
			price: 1000,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/chat1.webp",
			category: "chat",
			subCategory: "chat",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Chat",
		},
		{
			id: 7,
			price: 1100,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/chien6.webp",
			category: "chien",
			subCategory: "chien",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Rhodesian Ridgeback",
		},
		{
			id: 8,
			price: 1100,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/chien7.webp",
			category: "chien",
			subCategory: "chien",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Caim terrier",
		},
		{
			id: 2,
			price: 1200,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/chien1.webp",
			category: "chien",
			subCategory: "chien",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Tozen",
		},
		{
			id: 3,
			price: 1200,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/chien2.webp",
			category: "chien",
			subCategory: "chien",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Berger Allemand",
		},
		{
			id: 4,
			price: 2300,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/chien3.webp",
			category: "chien",
			subCategory: "chien",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Berger Autralien",
		},
		{
			id: 5,
			price: 2300,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/chien4.webp",
			category: "chien",
			subCategory: "chien",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Carlin",
		},
		{
			id: 7,
			price: 2500,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/chien7.webp",
			category: "chien",
			subCategory: "chien",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Caniche",
		},
		{
			id: 6,
			price: 3000,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/chien5.webp",
			category: "chien",
			subCategory: "chien",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Husky",
		},
		{
			id: 9,
			price: 3000,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/chien9.webp",
			category: "chien",
			subCategory: "chien",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Rottweiler",
		},
		{
			id: 10,
			price: 2000,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/cochon1.webp",
			category: "ferme",
			subCategory: "ferme",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Cochon",
		},
		{
			id: 10,
			price: 3000,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/vache1.webp",
			category: "ferme",
			subCategory: "ferme",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Vache",
		},
		{
			id: 11,
			price: 1000,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/lapin1.webp",
			category: "autres",
			subCategory: "autres",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Lapin",
		},
		{
			id: 14,
			price: 1000,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/poule1.webp",
			category: "autres",
			subCategory: "autres",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Poule",
		},
		{
			id: 13,
			price: 5000,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/loup1.webp",
			category: "animauxsauvages",
			subCategory: "animauxsauvages",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Loup",
		},
		{
			id: 14,
			price: 5000,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/panthere1.webp",
			category: "animauxsauvages",
			subCategory: "animauxsauvages",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Panthere",
		},
		{
			id: 16,
			price: 2500,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/sanglier1.webp",
			category: "animauxsauvages",
			subCategory: "animauxsauvages",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Sanglier",
		},
		{
			id: 17,
			price: 4000,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/singe1.webp",
			category: "singe",
			subCategory: "singe",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Singe",
		},
		{
			id: 18,
			price: 4000,
			image: "https://cdn.sacul.cloud/v2/vision-cdn/animalerie/singe2.webp",
			category: "singe",
			subCategory: "singe",
			//idVariation: null,
			isPremium: true,
			owned: false,
			label: "Singe",
		},
	]);

	const [a, setA] = useState("main");

	useExitKeys();

	useEnterKey(() => {
		if (!data.user.currentSubscription) {
			if (selected?.idVariation !== undefined || selections[0]?.idVariation !== undefined) {
				if (selections.find(e => e.isPremium && !e.owned) || (selections.length && selected.isPremium && !selected.owned)) return;
			} else if (selected.isPremium && !selected.owned) {
				return;
			}
		}
		if (selected) {
			if (selections.length === buttons.find(_e => _e.name === show).progressBar.length - 1) setShow("finalSubmit");
			setSelections([...selections, selected]);
			setSelected(null);
		}
	});

	useBackspaceKey(() => {
		setSelected(null);
		if (show === "main") {
			postAsync("backPreBinco");
			return;
		}
		if (selections.length === 0) {
			setShow("main");
		} else {
			const _a = [...selections];
			while (_a[_a.length - 1]?.default === true) {
				_a.pop();
			}
			_a.pop();
			setSelections(_a);
			if (show === "finalSubmit") {
				setShow(a);
			}
		}
	});

	useEffect(() => {
		if (
			data.catalogue.filter(
				e =>
					e.category === show &&
					e.subCategory === buttons.find(_e => _e?.name === show)?.progressBar[selections.length]?.name &&
					(selections[selections.length - 1]?.idVariation === undefined
						? true
						: e?.targetId === selections[selections.length - 1]?.idVariation),
			).length === 0 &&
			show !== "main" &&
			show !== "finalSubmit"
		) {
			setSelections([...selections, { default: true }]);
		}
		if (selections?.length === buttons.find(_e => _e.name === show)?.progressBar.length && selections.length > 0) {
			setShow("finalSubmit");
		}
	}, [selections]);

	const _buttons = [
		{
			name: "chien",
			price: 10,
			progressBar: [
				{
					name: "chien",
				},
			],
			width: "full",
			onClickCallback: () => {
				setShow("chien");
				postAsync("MenuAnimalerieClickButton", { button: "chien" });
			},
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/chien.svg",
			hoverStyle: "fill-black stroke-black",
		},
		{
			name: "chat",
			price: 10,
			progressBar: [
				{
					name: "chat",
				},
			],
			width: "full",
			onClickCallback: () => {
				setShow("chat");
				postAsync("MenuAnimalerieClickButton", { button: "chat" });
			},
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/chat.svg",
			hoverStyle: "fill-black stroke-black",
		},
		{
			name: "ferme",
			price: 10,
			progressBar: [
				{
					name: "ferme",
				},
			],
			width: "full",
			onClickCallback: () => {
				setShow("ferme");
				postAsync("MenuAnimalerieClickButton", { button: "ferme" });
			},
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/vache.svg",
			hoverStyle: "fill-black stroke-black",
		},
		{
			name: "animauxsauvages",
			price: 10,
			progressBar: [
				{
					name: "animauxsauvages",
				},
			],
			width: "full",
			onClickCallback: () => {
				setShow("animauxsauvages");
				postAsync("MenuAnimalerieClickButton", { button: "animauxsauvages" });
			},
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/loup.svg",
			hoverStyle: "fill-black stroke-black",
		},
		{
			name: "singe",
			price: 10,
			progressBar: [
				{
					name: "singe",
				},
			],
			width: "half",
			onClickCallback: () => {
				setShow("singe");
				postAsync("MenuAnimalerieClickButton", { button: "singe" });
			},
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/singe.svg",
			hoverStyle: "fill-black stroke-black",
		},
		{
			name: "autres",
			price: 10,
			progressBar: [
				{
					name: "autres",
				},
			],
			width: "half",
			onClickCallback: () => {
				setShow("autres");
				postAsync("MenuAnimalerieClickButton", { button: "autres" });
			},
			image: "https://cdn.sacul.cloud/v2/vision-cdn/svg/lapin.svg",
			hoverStyle: "fill-black stroke-black",
		},
	];

	const data_item = {
		catalogue: catalogue,
		buttons: _buttons,
		headerIconName: "ANIMALERIE",
		showTurnAroundButtons: false,
		hideItemList: ["all_animals"],
		user: {
			balance: 120,
			currentSubscription: 0,
		},
	};

	const onMessage = (event: any) => {
		if (event?.data?.type === "unlockedItem") {
			const data = isDev ? { catalogue } : context?.data;
			context.setData(
				data?.catalogue?.map(e => {
					if (JSON.stringify(e) === JSON.stringify(event?.data?.item)) {
						e.owned = true;
					}
					return e;
				}),
			);

			if (isDev) {
				setCatalogue(
					data?.catalogue?.map(e => {
						if (JSON.stringify(e) === JSON.stringify(event?.data?.item)) {
							e.owned = true;
						}
						return e;
					}),
				);
			}
		}
		if (event?.data?.type === "unlockedItems") {
			const data = isDev ? { catalogue } : context?.data;
			const localData = event?.data?.items?.map(e => JSON.stringify(e));
			context.setData(
				data?.catalogue?.map(e => {
					if (localData.includes(JSON.stringify(e))) {
						e.owned = true;
					}
					return e;
				}),
			);

			if (isDev) {
				setCatalogue(
					data?.catalogue?.map(e => {
						if (JSON.stringify(e) === JSON.stringify(event?.data?.item)) {
							e.owned = true;
						}
						return e;
					}),
				);
			}
		}
	};

	useEffect(() => {
		if (show === "main" && data?.forceCategory) setShow(data.forceCategory);
	}, [show]);

	React.useEffect(() => {
		window.addEventListener("message", onMessage);
		return () => window.removeEventListener("message", onMessage);
	}, []);

	const data: any | null = isDev ? data_item : context.data;

	const buttons = data.buttons.map(e => {
		e.onClickCallback = () => {
			setShow(e.name);
			setA(e.name);
			postAsync("MenuAnimalerieClickButton", { button: e.name });
		};
		return e;
	});

	const getTab = () => {
		if (show === "main") {
			return [
				{
					name: "",
					type: "buttons",
					elements: [...buttons],
				},
			] as any;
		}
		return [
			{
				name: "",
				type: "elements",
				...(data.hideItemList.includes(buttons.find(_e => _e?.name === show)?.progressBar[selections.length]?.name)
					? { variation: "no-image" }
					: {}),
				elements: data.catalogue
					.filter(
						e =>
							e.category === show &&
							e.subCategory === buttons.find(_e => _e?.name === show)?.progressBar[selections.length]?.name &&
							(selections[selections.length - 1]?.idVariation === undefined
								? true
								: e?.targetId === selections[selections.length - 1]?.idVariation),
					)
					.map((_e: any) => {
						_e.onClickCallback = () => {
							postAsync("MenuAnimalerieClickHabit", _e);
							setSelected(_e);
						};
						return _e;
					}),
			},
		] as any;
	};

	return (
		<div className="MenuAnimalerie trueAnimal">
			{button && show === "main" && (
				<div className="setName">
					<Button
						callback={() => {
							postAsync("MenuAnimalerieNomTenu", name);
						}}
						color="green"
						height={30}></Button>
				</div>
			)}
			{show !== "finalSubmit" && (
				<MenuBuilder
					showTurnAroundButtons={data?.showTurnAroundButtons}
					showValidationButtons={show !== "main" && show !== "finalSubmit"}
					isBoutique={selections[selections?.length - 1]?.isPremium}
					selected={selected}
					forceBoutiqueHeader={(data?.progressElementToForceBoutiqueHeader ?? []).includes(show)}
					headerImage={"https://cdn.sacul.cloud/v2/vision-cdn/headers/animalerie.webp"}
					headerIcon={data.headerIcon}
					headerIconName={data?.forceCategory?.toUpperCase() || data.headerIconName}
					tabs={getTab()}
					progressBar={
						show !== "main"
							? {
									current: selections.length,
									elements: buttons.find(e => e.name === show)?.progressBar ?? [],
								}
							: undefined
					}
				/>
			)}
			{show === "finalSubmit" && (
				<MenuBuilder
					showTurnAroundButtons={data?.showTurnAroundButtons}
					headerImage={"https://cdn.sacul.cloud/v2/vision-cdn/headers/binco.webp"}
					headerIcon={"https://cdn.sacul.cloud/v2/vision-cdn/icons/market-cart.webp"}
					headerIconName={"PAIEMENT"}
					finalSubmit={{
						onCancel: () => {
							setShow("main");
							setSelections([]);
						},
						onSubmit: () => {
							postAsync("MenuAnimalerie", {
								selections,
							});
						},
						cancelLabel: "ANNULER",
						submitLabel: "VALIDER L'ACHAT",
						item: {
							label: (selections[0]?.price ?? 0) + " $",
							image: selections[0]?.image ?? "",
						},
					}}
				/>
			)}
		</div>
	);
};

export default MenuAnimalerie;
