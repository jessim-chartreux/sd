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

const MenuBinco: React.FC = () => {
	const context = useContext(GlobalContext);
	const [show, setShow] = useState("main");
	const [button, setButton] = useState(false);
	const [name, setName] = useState("");
	const [selections, setSelections] = useState<any[]>([]);
	const [selected, setSelected] = useState(null);
	const [catalogue, setCatalogue] = useState([
		{
			label: "Haut N°0",
			subCategory: "Hauts",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			idVariation: 0,
			id: 0,
			category: "Hauts",
			isPremium: true,
			price: 150,
			isNew: true,
		},

		{
			label: "Variation N°1",
			subCategory: "Variations",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			targetId: 0,
			id: 0,
			category: "Hauts",
			isPremium: true,
		},
		{
			label: "Variation N°2",
			subCategory: "Variations",
			image: "https://cdn.sacul.cloud/v2/vision-cdn/Binco/Hauts/0.webp",
			targetId: 0,
			id: 1,
			category: "Hauts",
			isPremium: true,
			owned: true,
		},

		{
			id: 10,
			price: 20,
			image: "https://assets-vision-fa.cdn.purplemaze.net/https://cdn.sacul.cloud/v2/vision-cdn/Binco/Homme/Hauts/20_1.webp",
			category: "Hauts",
			subCategory: "Hauts",
			//idVariation: null,
			isPremium: false,
			owned: false,
			label: "Test Xff",
		},
		{
			label: "Variation N°1",
			subCategory: "Variations",
			image: "https://assets-vision-fa.cdn.purplemaze.net/https://cdn.sacul.cloud/v2/vision-cdn/Binco/Homme/Hauts/20_1.webp",
			targetId: 10,
			id: 10,
			category: "Hauts",
			isPremium: false,
		},
		{
			label: "Variation N°2",
			subCategory: "Variations",
			image: "https://assets-vision-fa.cdn.purplemaze.net/https://cdn.sacul.cloud/v2/vision-cdn/Binco/Homme/Hauts/20_2.webp",
			targetId: 10,
			id: 11,
			category: "Hauts",
			isPremium: false,
			owned: true,
		},
		{
			label: "Variation N°2",
			subCategory: "Variations",
			image: "https://assets-vision-fa.cdn.purplemaze.net/https://cdn.sacul.cloud/v2/vision-cdn/Binco/Homme/Hauts/20_3.webp",
			targetId: 10,
			id: 11,
			category: "Hauts",
			isPremium: false,
			owned: true,
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
			console.log([...selections, selected]);
			setSelections([...selections, selected]);
			console.log(selections);
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
			name: "Hauts",
			subName: "ouais ouais",
			width: "full",
			hoverStyle: "stroke-black",
			image: "https://cdn.discordapp.com/attachments/1063934823976144966/1143950049479512174/bd49bb3f81599c1dd8840e5935b016d3.webp",
			type: "coverBackground",
			//hoverStyle: 'fill-black stroke-black',
			price: 20,
			progressBar: [
				{
					name: "Hauts",
				},
				{
					name: "Variations",
				},
			],
		},
		{
			name: "Bas",
			width: "full",
			hoverStyle: "stroke-black",
			image: "https://media.discordapp.net/attachments/498529074717917195/1144393305195552768/image.webp",
			type: "coverBackground",
			//hoverStyle: 'fill-black stroke-black',
			price: 20,
			progressBar: [
				{
					name: "Bas",
				},
				{
					name: "Variations",
				},
			],
		},
		{
			name: "Chaussures",
			width: "half",
			hoverStyle: "stroke-black",
			image: "https://media.discordapp.net/attachments/498529074717917195/1144393364926627913/image.webp",
			type: "coverBackground",
			//hoverStyle: 'fill-black stroke-black',
			price: 20,
			progressBar: [
				{
					name: "Chaussures",
				},
				{
					name: "Variations",
				},
			],
		},
		{
			name: "Chapeaux",
			hoverStyle: "stroke-black",
			image: "https://media.discordapp.net/attachments/498529074717917195/1144393779575541780/image.webp",
			type: "coverBackground",
			width: "half",
			//hoverStyle: 'fill-black stroke-black',
			price: 20,
			progressBar: [
				{
					name: "Chapeaux",
				},
				{
					name: "Variations",
				},
			],
		},
		{
			name: "Lunettes",
			width: "half",
			//hoverStyle: 'fill-black stroke-black',
			hoverStyle: "stroke-black",
			image: "https://media.discordapp.net/attachments/498529074717917195/1144394033012162610/image.webp",
			type: "coverBackground",
			price: 20,
			progressBar: [
				{
					name: "Lunettes",
				},
				{
					name: "Variations",
				},
			],
		},
		{
			name: "Sacs",
			width: "half",
			hoverStyle: "stroke-black",
			image: "https://media.discordapp.net/attachments/498529074717917195/1144393559659778078/image.webp",
			type: "coverBackground",
			//hoverStyle: 'fill-black stroke-black',
			price: 20,
			progressBar: [
				{
					name: "Sacs",
				},
				{
					name: "Variations",
				},
			],
		},
		{
			name: "Cou",
			width: "half",
			hoverStyle: "stroke-black",
			image: "https://media.discordapp.net/attachments/498529074717917195/1144393442533838939/image.webp",
			type: "coverBackground",
			price: 20,
			progressBar: [
				{
					name: "Cou",
				},
				{
					name: "Variations",
				},
			],
		},
		{
			name: "Autres",
			subName: "Gants, sous-haut",
			width: "half",
			hoverStyle: "stroke-black",
			image: "https://media.discordapp.net/attachments/498529074717917195/1166695161590468649/image.webp",
			type: "coverBackground",
			price: 20,
			progressBar: [
				{
					name: "Autres",
				},
				{
					name: "Variations",
				},
			],
		},
	];

	const data_item = {
		catalogue: catalogue,
		buttons: _buttons,
		headerIcon: "https://cdn.discordapp.com/attachments/1063934823976144966/1144041162773119017/image_homme.webp",
		headerIconName: "Binco Homme",
		showTurnAroundButtons: true,
		hideItemList: ["bras"],
		//forceCategory: 'haut',
		// progressElementToForceBoutiqueHeader: ['haut', 'variations'],
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
	const parentElement = selections[selections.length - 1];

	const buttons = data.buttons.map(e => {
		e.onClickCallback = () => {
			setShow(e.name);
			setA(e.name);
			postAsync("MenuBincoClickButton", { button: e.name });
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
							postAsync("MenuBincoClickHabit", _e);
							console.log(_e);
							setSelected(_e);
						};
						return _e;
					}),
			},
		] as any;
	};

	return (
		<div className="MenuBinco trueBinco">
			{button && show === "main" && (
				<div className="setName">
					<Button
						callback={() => {
							postAsync("MenuBincoNomTenu", name);
						}}
						color="green"
						height={30}>
						<img height="15" width="15" src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/confirm.svg"} alt="" />
					</Button>
				</div>
			)}
			{show !== "finalSubmit" && (
				<MenuBuilder
					showTurnAroundButtons={data?.showTurnAroundButtons}
					showValidationButtons={show !== "main" && show !== "finalSubmit"}
					style={{
						overrideClassName: {
							main: show === "main" ? "overrideBinco" : "",
							header: show === "main" ? "overrideBinco" : "",
						},
					}}
					isBoutique={selections[selections?.length - 1]?.isPremium}
					selected={selected}
					selectedParent={parentElement}
					forceBoutiqueHeader={(data?.progressElementToForceBoutiqueHeader ?? []).includes(show)}
					headerImage={"https://cdn.sacul.cloud/v2/vision-cdn/headers/binco.webp"}
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
							postAsync("MenuBinco", {
								selections,
							});
						},
						cancelLabel: "ANNULER",
						submitLabel: "VALIDER L'ACHAT",
						item: {
							label: (selections[1]?.price ?? 0) + " $",
							image: selections[1]?.image ?? "",
						},
					}}
				/>
			)}
		</div>
	);
};

export default MenuBinco;
