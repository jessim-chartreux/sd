import "./style.scss";

import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import React, { useContext, useState } from "react";

import Button from "../../components/UI/Button/Buttton";
import { GlobalContext } from "../../app";
import { Slider } from "@mui/material";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuVehicule: React.FC = () => {
	const context = useContext(GlobalContext);
	useExitKeys();

	const [values, setValues] = useState([false, false, false, false, false, false, false, false, false, false]);

	const data: any = isDev
		? {
				fuel: 10,
				condition: 32,
				immatriculation: "SWGHEKJD",
				vehicleName: "ORACLE XLS",
			}
		: context.data;

	return (
		<div className="MenuVoiture">
			<img src="https://cdn.sacul.cloud/v2/vision-cdn/MenuVehicule/banner.webp" />
			<div className="header">
				<div className="headerName">{data.vehicleName}</div>
				<img
					style={{
						marginLeft: "auto",
						marginRight: 20,
					}}
					src="https://cdn.sacul.cloud/v2/vision-cdn/MenuVehicule/fuel.webp"
				/>
				<div
					className="fuel"
					style={{
						color: data.fuel > 42 ? "#33963C" : data.fuel > 21 ? "#FBBC04" : "#E01F1F",
					}}>
					{data.fuel}L
				</div>
				<div
					style={{
						width: 45,
						height: 45,
						marginRight: 20,
					}}>
					<CircularProgressbarWithChildren
						value={data.condition}
						maxValue={100}
						minValue={1}
						background
						strokeWidth={8}
						styles={buildStyles({
							pathColor: "#ffffff",
							trailColor: "rgba(255,255,255,0.6)",
							backgroundColor: "rgba(0,0,0,0.7)",
							pathTransitionDuration: 5,
							strokeLinecap: "butt",
						})}>
						<div
							className="condition"
							style={{
								color: data.condition > 66 ? "#33963C" : data.condition > 33 ? "#FBBC04" : "#E01F1F",
							}}>
							{data.condition}%
						</div>
					</CircularProgressbarWithChildren>
				</div>
			</div>
			<div className="main">
				<div
					className="span"
					style={{
						marginTop: 30,
						marginBottom: 10,
					}}>
					PLAQUE D'IMMATRICULATION
				</div>
				<div className="plaque">{data.immatriculation}</div>

				<div
					className="span"
					style={{
						marginTop: 30,
						marginBottom: 5,
					}}>
					ÉTAT DU MOTEUR
				</div>
				<div
					style={{
						display: "flex",
						marginLeft: 34,
					}}>
					<Button
						disabledHoverSound={true}
						color="green"
						callback={() => {
							postAsync("MenuVoiture", {
								moteur: true,
							});
						}}
						width={200}
						height={25}
						fontSize={"12px"}
						fontWeight={700}
						margin={"0 17px 0 0"}
						label="ALLUMER LE MOTEUR"
					/>
					<Button
						disabledHoverSound={true}
						color="red"
						callback={() => {
							postAsync("MenuVoiture", {
								moteur: false,
							});
						}}
						width={200}
						height={25}
						fontSize={"12px"}
						fontWeight={700}
						label="ÉTEINDRE LE MOTEUR"
					/>
				</div>

				<div
					className="span"
					style={{
						marginTop: 30,
						marginBottom: 0,
					}}>
					GESTION DES PORTES
				</div>
				<div
					className="buttons"
					style={{
						marginLeft: 29.5,
					}}>
					<Button
						disabledHoverSound={true}
						color="blue"
						callback={() => {
							const id = 0;
							postAsync("MenuVoiture", { porteAvantG: values[0] });
							const _v = [...values];
							_v[id] = !_v[id];
							setValues(_v);
						}}
						width={133}
						height={25}
						fontSize={"12px"}
						fontWeight={700}
						label="PORTE AVANT G."
						selected={values[0]}
						selectedStyle={{
							background: "linear-gradient(180deg, rgba(251, 188, 4, 0.8) 0%, rgba(251, 157, 4, 0.8) 100%)",
						}}
					/>
					<Button
						disabledHoverSound={true}
						color="blue"
						callback={() => {
							const id = 1;
							postAsync("MenuVoiture", {
								capot: values[1],
							});
							const _v = [...values];
							_v[id] = !_v[id];
							setValues(_v);
						}}
						width={133}
						height={25}
						fontSize={"12px"}
						fontWeight={700}
						label="CAPOT"
						selected={values[1]}
						selectedStyle={{
							background: "linear-gradient(180deg, rgba(251, 188, 4, 0.8) 0%, rgba(251, 157, 4, 0.8) 100%)",
						}}
					/>
					<Button
						disabledHoverSound={true}
						color="blue"
						callback={() => {
							const id = 2;
							postAsync("MenuVoiture", { porteAvantD: values[2] });
							const _v = [...values];
							_v[id] = !_v[id];
							setValues(_v);
						}}
						width={133}
						height={25}
						fontSize={"12px"}
						fontWeight={700}
						label="PORTE AVANT D."
						selected={values[2]}
						selectedStyle={{
							background: "linear-gradient(180deg, rgba(251, 188, 4, 0.8) 0%, rgba(251, 157, 4, 0.8) 100%)",
						}}
					/>
					<Button
						disabledHoverSound={true}
						color="blue"
						callback={() => {
							const id = 3;
							postAsync("MenuVoiture", { porteArriereG: values[3] });
							const _v = [...values];
							_v[id] = !_v[id];
							setValues(_v);
						}}
						width={133}
						height={25}
						fontSize={"12px"}
						fontWeight={700}
						label="PORTE ARRIÈRE G."
						selected={values[3]}
						selectedStyle={{
							background: "linear-gradient(180deg, rgba(251, 188, 4, 0.8) 0%, rgba(251, 157, 4, 0.8) 100%)",
						}}
					/>
					<Button
						disabledHoverSound={true}
						color="blue"
						callback={() => {
							const id = 4;
							postAsync("MenuVoiture", { coffre: values[4] });
							const _v = [...values];
							_v[id] = !_v[id];
							setValues(_v);
						}}
						width={133}
						height={25}
						fontSize={"12px"}
						fontWeight={700}
						label="COFFRE"
						selected={values[4]}
						selectedStyle={{
							background: "linear-gradient(180deg, rgba(251, 188, 4, 0.8) 0%, rgba(251, 157, 4, 0.8) 100%)",
						}}
					/>
					<Button
						disabledHoverSound={true}
						color="blue"
						callback={() => {
							const id = 5;
							postAsync("MenuVoiture", { porteArriereD: values[5] });
							const _v = [...values];
							_v[id] = !_v[id];
							setValues(_v);
						}}
						width={133}
						height={25}
						fontSize={"12px"}
						fontWeight={700}
						label="PORTE ARRIÈRE D."
						selected={values[5]}
						selectedStyle={{
							background: "linear-gradient(180deg, rgba(251, 188, 4, 0.8) 0%, rgba(251, 157, 4, 0.8) 100%)",
						}}
					/>
				</div>

				<div
					className="span"
					style={{
						marginTop: 30,
						marginBottom: 0,
					}}>
					GESTION DES FENÊTRES
				</div>
				<div
					className="buttons"
					style={{
						marginLeft: 29.5,
					}}>
					<Button
						disabledHoverSound={true}
						color="blue"
						callback={() => {
							const id = 6;
							postAsync("MenuVoiture", { fenetreAvantG: values[6] });
							const _v = [...values];
							_v[id] = !_v[id];
							setValues(_v);
						}}
						width={205}
						height={25}
						fontSize={"12px"}
						fontWeight={700}
						label="FENÊTRE AVANT G."
						selected={values[6]}
						selectedStyle={{
							background: "linear-gradient(180deg, rgba(251, 188, 4, 0.8) 0%, rgba(251, 157, 4, 0.8) 100%)",
						}}
					/>
					<Button
						disabledHoverSound={true}
						color="blue"
						callback={() => {
							const id = 7;
							postAsync("MenuVoiture", { fenetreAvantD: values[7] });
							const _v = [...values];
							_v[id] = !_v[id];
							setValues(_v);
						}}
						width={205}
						height={25}
						fontSize={"12px"}
						fontWeight={700}
						label="FENÊTRE AVANT D."
						selected={values[7]}
						selectedStyle={{
							background: "linear-gradient(180deg, rgba(251, 188, 4, 0.8) 0%, rgba(251, 157, 4, 0.8) 100%)",
						}}
					/>
					<Button
						disabledHoverSound={true}
						color="blue"
						callback={() => {
							const id = 8;
							postAsync("MenuVoiture", { fenetreArriereG: values[8] });
							const _v = [...values];
							_v[id] = !_v[id];
							setValues(_v);
						}}
						width={205}
						height={25}
						fontSize={"12px"}
						fontWeight={700}
						label="FENÊTRE ARRIÈRE G."
						selected={values[8]}
						selectedStyle={{
							background: "linear-gradient(180deg, rgba(251, 188, 4, 0.8) 0%, rgba(251, 157, 4, 0.8) 100%)",
						}}
					/>
					<Button
						disabledHoverSound={true}
						color="blue"
						callback={() => {
							const id = 9;
							postAsync("MenuVoiture", { fenetreArriereD: values[9] });
							const _v = [...values];
							_v[id] = !_v[id];
							setValues(_v);
						}}
						width={205}
						height={25}
						fontSize={"12px"}
						fontWeight={700}
						label="FENÊTRE ARRIÈRE D."
						selected={values[9]}
						selectedStyle={{
							background: "linear-gradient(180deg, rgba(251, 188, 4, 0.8) 0%, rgba(251, 157, 4, 0.8) 100%)",
						}}
					/>
				</div>

				<div
					className="span"
					style={{
						marginTop: 30,
						marginBottom: 0,
						display: "flex",
					}}>
					LIMITATEUR DE VITESSE <div className="key">K</div>
				</div>
				<Slider
					max={180}
					min={20}
					defaultValue={50}
					valueLabelDisplay="on"
					className="cSlider"
					onChangeCommitted={(a, value) => {
						postAsync("MenuVoiture", {
							limitateurVitesse: value,
						});
					}}
				/>

				<div
					className="span"
					style={{
						marginTop: 30,
						marginBottom: 5,
					}}>
					CONDUITE AUTOMATIQUE
				</div>
				<div
					style={{
						display: "flex",
						marginLeft: 34,
						marginBottom: 30,
					}}>
					<Button
						disabledHoverSound={true}
						color="green"
						callback={() => {
							postAsync("MenuVoiture", { conduiteAuto: true });
						}}
						width={200}
						height={25}
						fontSize={"12px"}
						fontWeight={700}
						margin={"0 17px 0 0"}
						label="ACTIVER"
					/>
					<Button
						disabledHoverSound={true}
						color="red"
						callback={() => {
							postAsync("MenuVoiture", { conduiteAuto: false });
						}}
						width={200}
						height={25}
						fontSize={"12px"}
						fontWeight={700}
						label="DÉSACTIVER"
					/>
				</div>
			</div>
		</div>
	);
};

export default MenuVehicule;
