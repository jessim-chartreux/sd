import React, { useContext, useEffect, useState } from "react";

import { VisageMenuData as ApparenceMenuData } from "./apparenceData";
import Button from "./utils/Button";
import ColorPicker2 from "./ColorPicker";
import CreationContexte from "./CreationContexte";
import MenuField from "./utils/MenuField";
import { postAsync } from "../../utils/postAsync";

const Apparence: React.FC = () => {
	const { setData, data, setCanContinue, setHidden, hidden, catalogue } = useContext(CreationContexte);
	const [localData, sLocalData] = useState(data?.apparence ?? {});
	const [a, sA] = useState(null);
	const [curr, setCurr] = useState(null);
	const [offset1, setOffset1] = useState(0);
	const colors = [
		"#198D31",
		"#10561F",
		"#186E94",
		"#091B51",
		"#722E21",
		"#452019",
		"#DF6F21",
		"#44C9E5",
		"#FFFFFF",
		"#A9D4AE",
		"#ECCA32",
		"#AA1E1E",
		"#151515",
		"#149690",
		"#BA7F22",
		"#6399E0",
		"#B34141",
		"#12583A",
		"#717171",
		"#C5C5C5",
		"#32A933",
		"#A9C5A9",
		"#C22525",
		"#3DA0D0",
		"#9A9A9A",
		"#ECBAE8",
		"#000000",
		"#3198AE",
		"#10407A",
		"#EBBB52",
		"#D7D7D7",
		"#FFFFFF",
	];

	useEffect(() => {
		postAsync("CreationPersonnage", {
			onglet: "apparence",
		});
	}, []);

	useEffect(() => {
		setCurr(ApparenceMenuData.find(e => e.items.filter(_e => _e.id === a).length > 0)?.items.find(_e => _e.id === a));
	}, [a]);

	useEffect(() => {
		setData({
			...data,
			apparence: localData,
		});
		setCanContinue(true);
	}, [localData]);

	useEffect(() => {
		setHidden(a && a !== "eyes" ? true : false);
	}, [a]);

	const handleItemClicked = _a => {
		sA(_a.id);
	};

	return (
		<div className="apparence__wrapper">
			{!hidden &&
				ApparenceMenuData.map((_apparence, i) => (
					<React.Fragment key={"zae" + i}>
						<MenuField fieldName={_apparence.name.toUpperCase()}>
							{(
								_apparence?.items?.filter(e => (data?.identity?.characterChoice === "women" ? !e.hideOnWoman : true)) ?? []
							).map((_apparenceItem, idx) => (
								<React.Fragment key={idx}>
									<div className="flexDiv apparenceButton">
										<Button
											onClick={_ => handleItemClicked(_apparenceItem)}
											className="--flex"
											type={_apparenceItem.id === a ? "A1" : "A2"}>
											{_apparenceItem.name}
										</Button>
									</div>
								</React.Fragment>
							))}
						</MenuField>
					</React.Fragment>
				))}
			{hidden && (
				<ColorPicker2
					items={catalogue.filter(e => e.category === a)}
					setA={sA}
					sO={curr?.choices.includes("opacity")}
					sC1={curr?.choices.includes("color1")}
					sC2={curr?.choices.includes("color2")}
					itemValue={localData[a]?.item}
					opacityValue={localData[a]?.opacity ?? 50}
					setValue={(type, e) => {
						const temp = {
							...localData,
						};
						if (!temp[a]) {
							temp[a] = {};
						}
						temp[a][type] = e;
						sLocalData(temp);
					}}
				/>
			)}
			{a === "eyes" && (
				<div className="colorPicker eyes">
					<div className="span">COULEUR PRIMAIRE</div>
					<div
						className="left"
						style={{
							left: 60,
							top: 63,
						}}
						onClick={() => {
							if (offset1 < 0) setOffset1(offset1 + 33);
						}}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/left.webp" />
					</div>
					<div
						className="right"
						onClick={() => {
							if (offset1 > 33 * colors.length * -1 + 33 * 10) setOffset1(offset1 - 33);
						}}
						style={{
							right: 60,
							top: 63,
						}}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/right.webp" />
					</div>

					<div className="colorPick">
						{colors.map((c, i) => (
							<div
								key={"a" + i}
								className="color"
								onClick={() => {
									const temp = {
										...localData,
									};
									if (!temp["eyes"]) {
										temp["eyes"] = {};
									}
									temp["eyes"]["color1"] = i;
									sLocalData(temp);
								}}
								style={{
									background: `linear-gradient(180deg, ${c}FF  0%, ${c}FF 100%)`,
									transform: `translateX(${offset1}px)`,
								}}></div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Apparence;
