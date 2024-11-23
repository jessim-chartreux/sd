import "./fuelstation.scss";

import React, { useContext, useState } from "react";

import FuelButton from "./button/button";
import FuelContainer from "./container/container";
import FuelRange from "./range/range";
import { GlobalContext } from "../../app";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const Fuelstation: React.FC = () => {
	useExitKeys();

	const context = useContext(GlobalContext);
	const params = (context.data as { maxFuel?: number; literPrice?: number }) || {};
	const maxFuel = params.maxFuel ? +params.maxFuel : 50;
	const literPrice = params.literPrice ? +params.literPrice : 1;
	const minFuel = 0;

	const [state, setState] = useState({
		maxFuel: maxFuel,
		fuel: Math.floor(maxFuel * 0.6),
	});

	const priceToPay = () => (state.fuel * literPrice).toFixed(2);
	const setMaxFuel = () => setState({ ...state, fuel: maxFuel });

	const doPay = (useCash: boolean) => {
		postAsync("fuelstation__callback", {
			useCash,
			amount: state.fuel,
		});
	};

	return (
		<div className="fuelstation">
			<FuelContainer title="Remplir le réservoir d'essence">
				<div className="fuelstation_row">
					<FuelButton icon="https://cdn.sacul.cloud/v2/vision-cdn/fuelstation/nozzle.webp" onClick={setMaxFuel}>
						Faire le plein
					</FuelButton>
					<div className="fuelstation_label">
						{state.fuel}
						<span className="fuelstation_unit">L</span>
					</div>
				</div>
				<FuelRange
					value={state.fuel}
					onChange={v => setState(state => ({ ...state, fuel: v }))}
					min={minFuel}
					max={state.maxFuel}
				/>
			</FuelContainer>
			<FuelContainer title="Procéder au paiement">
				<div className="fuelstation_row">
					<FuelButton icon="https://cdn.sacul.cloud/v2/vision-cdn/fuelstation/cash.webp" onClick={() => doPay(true)}>
						Payer en espèce
					</FuelButton>
					<FuelButton icon="https://cdn.sacul.cloud/v2/vision-cdn/fuelstation/card.webp" onClick={() => doPay(false)}>
						Payer par carte
					</FuelButton>
					<div className="fuelstation_label">
						{priceToPay()} <span className="fuelstation_unit">$</span>
					</div>
				</div>
			</FuelContainer>
		</div>
	);
};

export default Fuelstation;
