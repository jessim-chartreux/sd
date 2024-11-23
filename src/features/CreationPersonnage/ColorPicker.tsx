import "react-circular-progressbar/dist/styles.css";
import "./style.scss";

import React, { useState } from "react";

import InputRange from "./utils/InputRange";
import { colors } from "../../components/UI/ColorPicker/ColorPicker";
import { setArrayLength } from "../../utils/utils";

const ColorPicker2: React.FC<any> = ({ sO, sC1, sC2, items, title, icon, itemValue, opacityValue, setValue, setA }) => {
	const [offset1, setOffset1] = useState(0);
	const [offset2, setOffset2] = useState(0);

	const changeColor1 = e => {
		setValue("color1", e);
	};

	const changeColor2 = e => {
		setValue("color2", e);
	};

	const changeOpacity = e => {
		setValue("opacity", e);
	};

	return (
		<div className="_colorPicker">
			<div className="header">
				<div className="back" onClick={() => setA(null)}>
					<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/left.webp" />
				</div>

				<div className="current">
					{/* <img src="https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/eye.svg" />
                    <div className="span">COIFFURE</div> */}
				</div>
			</div>
			<div className="VisionMenu-itemList">
				{setArrayLength(items, 9).map((item, index) => (
					<div
						key={"key" + item?.id + index + item?.category + item?.subCategory}
						className={
							item?.isPlaceholder
								? "VisionMenu-placeholder"
								: "VisionMenu-item " + (JSON.stringify(itemValue) === JSON.stringify(item) ? "selected" : "")
						}
						onClick={() => {
							setValue("item", item);
						}}>
						{!item?.isPlaceholder && (
							<>
								<img src={item.img} />
								<div className={"VisionMenu-name "}>{item.label}</div>
							</>
						)}
						{item?.isPlaceholder && (
							<>
								<div className={"VisionMenu-placeholder "}></div>
							</>
						)}
					</div>
				))}
			</div>
			<div className="colorPicking">
				{!sO && !sC1 && sC2 && <div></div>}
				{(sO || sC1 || sC2) && (
					<div className="colorPicker">
						{sO && (
							<>
								<div className="opacit">
									<div className="span">OPACITÉ</div>
									{sO && <div className="opacityValue">{opacityValue}%</div>}
									<InputRange
										max={100}
										min={0}
										defaultV={opacityValue}
										onChange={event => {
											changeOpacity(event.target.valueAsNumber);
										}}
										className="--flex"
										customStyle={{
											background: `linear-gradient(90deg, #5e6cb6 0%, #5e6cb6 ${opacityValue}%, transparent ${opacityValue}%, transparent 100%)`,
										}}
									/>
								</div>
							</>
						)}

						{sC1 && (
							<div className="Container">
								<div className="span">COULEUR PRIMAIRE</div>
								<div
									className="left"
									style={{
										left: -75,
										top: 48,
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
										right: -75,
										top: 48,
									}}>
									<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/right.webp" />
								</div>

								<div className="colorPick">
									{colors.map((c, i) => (
										<div
											key={"a" + i}
											className="color"
											onClick={() => changeColor1(i + 1)}
											style={{
												background: `linear-gradient(180deg, ${c}FF  0%, ${c}FF 100%)`,
												transform: `translateX(${offset1}px)`,
											}}></div>
									))}
								</div>
							</div>
						)}

						{sC2 && (
							<div className="Container">
								<div className="span">COULEUR SECONDAIRE</div>
								<div
									className="left"
									style={{
										left: -75,
										top: 48,
									}}
									onClick={() => {
										if (offset2 < 0) setOffset2(offset2 + 33);
									}}>
									<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/left.webp" />
								</div>
								<div
									className="right"
									onClick={() => {
										if (offset2 > 33 * colors.length * -1 + 33 * 10) setOffset2(offset2 - 33);
									}}
									style={{
										right: -75,
										top: 48,
									}}>
									<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/right.webp" />
								</div>

								<div className="colorPick">
									{colors.map((c, i) => (
										<div
											key={"a2" + i}
											className="color"
											onClick={() => changeColor2(i + 1)}
											style={{
												background: `linear-gradient(180deg, ${c}FF  0%, ${c}66 100%)`,
												transform: `translateX(${offset2}px)`,
											}}></div>
									))}
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ColorPicker2;
