import React, { useContext, useEffect, useState } from "react";

import Button from "./utils/Button";
import CreationContexte from "./CreationContexte";
import InputRange from "./utils/InputRange";
import MenuField from "./utils/MenuField";
import { parentList } from "./parents";
import { postAsync } from "../../utils/postAsync";

const Character: React.FC = () => {
	const { setData, data, setCanContinue } = useContext(CreationContexte);
	const [r, sR] = useState(data?.character?.lookingValue * 10 || 5);
	const [p, sP] = useState(data?.character?.skinValue * 10 || 5);
	const [c, sC] = useState("parent1");
	const [p1, sP1] = useState(data?.character?.parent1 ?? null);
	const [p2, sP2] = useState(data?.character?.parent2 ?? null);
	const [page, sPage] = useState(1);

	const totalPages = Math.ceil(parentList.length / 4);

	useEffect(() => {
		postAsync("CreationPersonnage", {
			onglet: "personnage",
		});
	}, []);

	useEffect(() => {
		setData({
			...data,
			character: {
				lookingValue: r / 10,
				skinValue: p / 10,
				parent1: p1,
				parent2: p2,
			},
		});
		setCanContinue(p1 && p2);
	}, [p1, p2, p, r, c]);

	const switchParent = (parentType: string, value: number) => {
		if (c === "parent1") {
			sP1(value);
		} else {
			sP2(value);
		}
	};

	const setEditingParent = (parent: string) => {
		sC(parent);
	};

	const prevPage = () => {
		if (page > 1) {
			sPage(page - 1);
		}
	};

	const nextPage = () => {
		const totalPages = Math.ceil(parentList.length / 4);
		if (page < totalPages) {
			sPage(page + 1);
		}
	};

	return (
		<div className="character__wrapper">
			<MenuField fieldName="HÉRITAGE">
				<div className="flexDiv">
					<div className="parents__wrapper">
						<img
							src={
								p1
									? `https://cdn.sacul.cloud/v2/vision-cdn/parents/${parentList.find((p, i) => i + 1 === p1)?.image}.webp`
									: ""
							}
							alt=""
						/>
						<img
							src={
								p2
									? `https://cdn.sacul.cloud/v2/vision-cdn/parents/${parentList.find((p, i) => i + 1 === p2)?.image}.webp`
									: ""
							}
							alt=""
						/>
					</div>
					<div className="buttons__wrapper">
						<Button
							customStyle={{ width: "150px" }}
							onClick={_ => setEditingParent("parent1")}
							type={c === "parent1" ? "C1" : "C2"}>
							{parentList.find((p, i) => i + 1 === p1)?.name ?? "PARENT 1"}
						</Button>
						<Button
							customStyle={{ width: "150px" }}
							onClick={_ => setEditingParent("parent2")}
							type={c === "parent2" ? "C1" : "C2"}>
							{parentList.find((p, i) => {
								return i + 1 === p2;
							})?.name ?? "PARENT 2"}
						</Button>
					</div>
				</div>
			</MenuField>
			<MenuField className="characters__wrapper">
				<div
					onClick={prevPage}
					className="before switcher"
					style={page > 1 ? {} : { filter: "brightness(0.6)", cursor: "initial" }}>
					<img src="https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/next.svg" style={{ rotate: "180deg" }} />
				</div>
				<div className="countchar">
					{page} / {totalPages}
				</div>
				<div className="chars__int__wrapper">
					{parentList.slice((page - 1) * 4, page * 4).map((_parent, index) => (
						<div
							key={_parent.image}
							onClick={_ => switchParent(c, index + 1 + page * 4 - 4)}
							className={`character ${(c === "parent1" ? p1 : p2) === index + 1 + page * 4 - 4 ? "--selected" : ""}`}>
							<img src={`https://cdn.sacul.cloud/v2/vision-cdn/parents/${_parent.image}.webp`} alt="" />
							<span className="character__name">
								{(c === "parent1" ? p1 : p2) === index + 1 + page * 4 - 4 ? (
									<img src={"https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/confirm.svg"} alt="" />
								) : (
									<>{_parent.name}</>
								)}
							</span>
						</div>
					))}
				</div>
				<div
					onClick={nextPage}
					className="after switcher"
					style={page < totalPages ? {} : { filter: "brightness(0.6)", cursor: "initial" }}>
					<img src="https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/next.svg" />
				</div>
			</MenuField>

			<MenuField>
				<div className="flexDiv">
					<InputRange
						onChange={event => {
							sR(event.target.valueAsNumber);
						}}
						defaultV={r}
						rangeName="RESSEMBLANCE"
						className="--flex"
						customStyle={{
							background:
								r < 5
									? `linear-gradient(90deg, transparent 0%, transparent ${r * 10}%, #5e6cb6 ${
											r * 10
										}%, #5e6cb6 50%, #5e6cb6 ${r * 10}%, transparent ${r * 10}%, transparent 100%)`
									: r === 5
										? ""
										: `linear-gradient(90deg, transparent 0%, transparent 50%, #5e6cb6 50%, #5e6cb6 ${
												r * 10
											}%, transparent ${r * 10}%, transparent 100%)`,
						}}
					/>
					<InputRange
						onChange={event => {
							sP(event.target.valueAsNumber);
						}}
						rangeName="PEAU"
						className="--flex"
						defaultV={p}
						customStyle={{
							background:
								p < 5
									? `linear-gradient(90deg, transparent 0%, transparent ${p * 10}%, #5e6cb6 ${
											p * 10
										}%, #5e6cb6 50%, #5e6cb6 ${p * 10}%, transparent ${p * 10}%, transparent 100%)`
									: p === 5
										? ""
										: `linear-gradient(90deg, transparent 0%, transparent 50%, #5e6cb6 50%, #5e6cb6 ${
												p * 10
											}%, transparent ${p * 10}%, transparent 100%)`,
						}}
					/>
				</div>
			</MenuField>
		</div>
	);
};

export default Character;
