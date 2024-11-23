import React, { useContext, useEffect, useState } from "react";
import MenuField from "./utils/MenuField";
import Input from "./utils/Input";
import Button from "./utils/Button";
import CreationContexte from "./CreationContexte";
import { postAsync } from "../../utils/postAsync";

const Identity: React.FC = () => {
	const { setData, data, setCanContinue, premium } = useContext(CreationContexte);
	const [f, sF] = useState(data?.identity?.firstName ?? "");
	const [l, sL] = useState(data?.identity?.lastName ?? "");
	const [d1, sD1] = useState(data?.identity?.birthDate?.split("/")[0] ?? 1);
	const [d2, sD2] = useState(data?.identity?.birthDate?.split("/")[1] ?? 1);
	const [d3, sD3] = useState(data?.identity?.birthDate?.split("/")[2] ?? 1970);
	const [bZ, sBZ] = useState(data?.identity?.birthPlace ?? "");
	const [p, sP] = useState(data?.identity?.characterChoice ?? "men");

	useEffect(() => {
		postAsync("CreationPersonnage", {
			onglet: "identité",
		});
	}, []);

	useEffect(() => {
		setData({
			...data,
			identity: {
				firstName: f,
				lastName: l,
				birthDate: d1 + "/" + d2 + "/" + d3,
				birthPlace: bZ,
				characterChoice: p,
			},
		});
		setCanContinue(f !== "" && l !== "" && bZ !== "");
	}, [p]);

	useEffect(() => {
		setCanContinue(f !== "" && l !== "" && bZ !== "");
	}, [f, l, bZ]);

	const PedsButtons = [
		{
			value: "men",
			label: "Homme",
			buttonColor: "NORMAL",
			style: { background: "linear-gradient(180deg, rgba(94, 108, 182, 0.8) 0%, rgba(94, 108, 182, 0.496) 100%)", fontSize: "12px" },
		},
		{
			value: "women",
			label: "Femme",
			buttonColor: "ERROR",
			style: { background: "linear-gradient(180deg, rgba(253, 127, 127, 0.5) 0%, rgba(224, 31, 31, 0.5) 100%)", fontSize: "12px" },
		},
		{
			value: "custom",
			label: "Peds",
			buttonColor: "WARN",
			style: { background: "linear-gradient(180deg, rgba(251, 188, 4, 0.55) 0%, rgba(251, 157, 4, 0.55) 100%)", fontSize: "12px" },
		},
	];

	return (
		<div className="identity__wrapper">
			<div style={{ gap: "48px", paddingRight: 20 }} className="field flex">
				<Input
					value={f}
					setValue={sF}
					label="Nom"
					onBlur={() => {
						setData({
							...data,
							identity: {
								firstName: f,
								lastName: l,
								birthDate: d1 + "/" + d2 + "/" + d3,
								birthPlace: bZ,
								characterChoice: p,
							},
						});
						setCanContinue(f !== "" && l !== "" && bZ !== "");
					}}
				/>
				<Input
					value={l}
					setValue={sL}
					label="Prénom"
					onBlur={() => {
						setData({
							...data,
							identity: {
								firstName: f,
								lastName: l,
								birthDate: d1 + "/" + d2 + "/" + d3,
								birthPlace: bZ,
								characterChoice: p,
							},
						});
						setCanContinue(f !== "" && l !== "" && bZ !== "");
					}}
				/>
			</div>
			<MenuField className="dob__wrapper" fieldName="DATE DE NAISSANCE">
				<div className="flexDiv">
					<input
						type="number"
						value={d1}
						onChange={e => sD1(Number(e.currentTarget?.value) ?? 1)}
						onBlur={() => {
							setData({
								...data,
								identity: {
									firstName: f,
									lastName: l,
									birthDate: d1 + "/" + d2 + "/" + d3,
									birthPlace: bZ,
									characterChoice: p,
								},
							});
							setCanContinue(f !== "" && l !== "" && bZ !== "");
						}}
						min="1"
						max="31"
					/>
					<input
						type="number"
						value={d2}
						onChange={e => sD2(Number(e.currentTarget?.value) ?? 1)}
						onBlur={() => {
							setData({
								...data,
								identity: {
									firstName: f,
									lastName: l,
									birthDate: d1 + "/" + d2 + "/" + d3,
									birthPlace: bZ,
									characterChoice: p,
								},
							});
							setCanContinue(f !== "" && l !== "" && bZ !== "");
						}}
						min="1"
						max="12"
					/>
					<input
						type="number"
						value={d3}
						onChange={e => sD3(Number(e.currentTarget?.value) ?? 1)}
						onBlur={() => {
							setData({
								...data,
								identity: {
									firstName: f,
									lastName: l,
									birthDate: d1 + "/" + d2 + "/" + d3,
									birthPlace: bZ,
									characterChoice: p,
								},
							});
							setCanContinue(f !== "" && l !== "" && bZ !== "");
						}}
						min="1970"
						max="2023"
					/>
				</div>
			</MenuField>
			<div className="field">
				<Input
					value={bZ}
					setValue={sBZ}
					onBlur={() => {
						setData({
							...data,
							identity: {
								firstName: f,
								lastName: l,
								birthDate: d1 + "/" + d2 + "/" + d3,
								birthPlace: bZ,
								characterChoice: p,
							},
						});
						setCanContinue(f !== "" && l !== "" && bZ !== "");
					}}
					label="Lieu de naissance"
				/>
			</div>
			<MenuField fieldName="CHOIX DU PERSONNAGE">
				<div className="flexDiv">
					{PedsButtons.map(_button => {
						if (_button.value === "custom") {
							if (!premium) return null;
							return (
								<Button
									key={_button.value}
									onClick={() => sP(_button.value)}
									type={_button.buttonColor}
									customStyle={_button.style}
									className="--flex">
									{_button.label}
								</Button>
							);
						}
						return (
							<Button
								key={_button.value}
								onClick={() => sP(_button.value)}
								type={_button.buttonColor}
								customStyle={_button.style}
								className="--flex">
								{_button.label}
							</Button>
						);
					})}
				</div>
			</MenuField>
		</div>
	);
};

export default Identity;
