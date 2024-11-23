import "./style.scss";

import React, { useContext } from "react";

import { BoutiqueHeader } from "../../components/UI/BoutiqueHeader/BoutiqueHeader";
import BoutiquePack from "../../components/UI/BoutiquePack/BoutiquePack";
import { GlobalContext } from "../../app";
import { SERVER } from "../../config";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";
import { useKey } from "../../hooks/useKey";

const ShopPacks: React.FC<any> = () => {
	const context = useContext(GlobalContext);

	useKey("Escape", () => {
		postAsync("backToBoutique");
	});

	useExitKeys();

	const packs = [
		{
			price: 10,
			value: 1_000,
			level: "yellow",
			url: "https://visionboutique.tebex.io/package/5961280",
		},
		{
			price: 25,
			value: 3_000,
			level: "orange",
			url: "https://visionboutique.tebex.io/package/5961281",
		},
		{
			price: 35,
			value: 5_000,
			level: "red",
			url: "https://visionboutique.tebex.io/package/5961282",
		},
		{
			price: 50,
			value: 10_000,
			level: "purple",
			url: "https://visionboutique.tebex.io/package/5961283",
		},
		{
			price: 100,
			value: 25_000,
			level: "diamond",
			url: "https://visionboutique.tebex.io/package/6067238",
		},
		{
			price: 300,
			value: 100_000,
			bonus: true,
			level: "black",
			url: "https://visionboutique.tebex.io/package/6226825",
		},
	];

	const data = isDev
		? {
				packs,
				premium: true,
				credit: 1000,
				unique_id: "69",
			}
		: context.data;

	return (
		<div className="ShopPacksContainer">
			<BoutiqueHeader data={data} server={SERVER} />
			<div className="ShopPacks">
				<div className="Main">{"CRÉDITS"}</div>
				<div className="Sub">
					{"CRÉDITEZ VOTRE COMPTE EN VCOINS POUR UTILISER LA BOUTIQUE VISION"}
					<span>
						<p>{data.unique_id}</p>
						{"ID Vision"}
					</span>
				</div>
				<div className="ShopPacksSubContainer">
					{data?.packs?.map((pack: any, index: number) => (
						<BoutiquePack
							key={index}
							type="buyVCoins"
							price={pack.price}
							data={pack}
							callback={() => {
								(window as any).invokeNative ? (window as any).invokeNative("openUrl", pack.url) : window.open(pack.url);
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ShopPacks;
