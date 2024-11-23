import "./style.scss";

import React, { useState } from "react";

export const colors = [
	"#1c1f21",
	"#272a2c",
	"#312e2c",
	"#35261c",
	"#4b321f",
	"#5c3b24",
	"#6d4c35",
	"#6b503b",
	"#765c45",
	"#7f684e",
	"#99815d",
	"#a79369",
	"#af9c70",
	"#bba063",
	"#d6b97b",
	"#dac38e",
	"#9f7f59",
	"#845039",
	"#682b1f",
	"#61120c",
	"#640f0a",
	"#7c140f",
	"#a02e19",
	"#b64b28",
	"#a2502f",
	"#aa4e2b",
	"#626262",
	"#808080",
	"#aaaaaa",
	"#c5c5c5",
	"#463955",
	"#5a3f6b",
	"#763c76",
	"#ed74e3",
	"#eb4b93",
	"#f299bc",
	"#04959e",
	"#025f86",
	"#023974",
	"#3fa16a",
	"#217c61",
	"#185c55",
	"#b6c034",
	"#70a90b",
	"#439d13",
	"#dcb857",
	"#e5b103",
	"#e69102",
	"#f28831",
	"#fb8057",
	"#e28b58",
	"#d1593c",
	"#ce3120",
	"#ad0903",
	"#880302",
	"#1f1814",
	"#291f19",
	"#2e221b",
	"#37291e",
	"#2e2218",
	"#231b15",
	"#020202",
	"#706c66",
	"#9d7a50",
];

export const colorsF = [
	"#cc0000",
	"#cc0050",
	"#df0259",
	"#ffb7ed",
	"#fd99e4",
	"#ca5daf",
	"#923a61",
	"#ff6d6d",
	"#fda7a7",
	"#ffcaca",
	"#ffb2b2",
	"#f88f8f",
	"#ff7474",
	"#ff9960",
	"#ffb8f6",
	"#ffa0f3",
	"#ff81f0",
	"#ff73ee",
	"#ff19e3",
	"#f06fe1",
	"#ff3d3d",
	"#791d1d",
	"#fd0f0f",
	"#ff0000",
	"#f51b1b",
	"#ff37cc",
	"#fa17c0",
	"#d417a4",
	"#fa20c3",
	"#b72a93",
	"#d921aa",
	"#c418e1",
	"#d210f2",
	"#3210f2",
	"#1048f2",
	"#10abf2",
	"#04b0ff",
	"#04c7ff",
	"#04ffd4",
	"#1ed2b3",
	"#17927d",
	"#198370",
	"#d2f739",
	"#c8cc0f",
	"#f7fc00",
	"#fcff48",
	"#ffee0e",
	"#ffae0e",
	"#ffa237",
	"#d17e20",
	"#ffd09a",
	"#ffe2c0",
	"#ffeedb",
	"#ffe0db",
	"#d7d5d4",
];
const ColorPicker: React.FC<any> = ({ changeOpacity, changeColor1, changeColor2, changeColorF, sO, sC1, sC2, sCF }) => {
	const [offset1, setOffset1] = useState(0);
	const [offset2, setOffset2] = useState(0);
	const [offset3, setOffset3] = useState(0);
	const [opacity, setOpacity] = useState(100);

	return (
		<>
			{!sO && !sC1 && sC2 && <div></div>}
			{(sO || sC1 || sC2) && (
				<div className="colorPicker">
					{sO && (
						<>
							<div className="span">OPACITÉ</div>
							<div className="opacityValue">{opacity}%</div>
							<div
								className="opacity"
								onClick={ev => {
									setOpacity(Math.round(((ev.clientX - 160) * 100) / 330));
									changeOpacity(Math.round(((ev.clientX - 160) * 100) / 330));
								}}></div>
						</>
					)}

					{sC1 && (
						<div className="Container">
							<div className="span">COULEUR PRIMAIRE</div>
							<div
								className="left"
								style={{
									left: -20,
									top: 38,
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
									right: -20,
									top: 38,
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/right.webp" />
							</div>

							<div className="colorPick">
								{colors.map((c, i) => (
									<div
										key={i}
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
									left: -20,
									top: 38,
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
									right: -20,
									top: 38,
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/right.webp" />
							</div>

							<div className="colorPick">
								{colors.map((c, i) => (
									<div
										key={i}
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

					{sCF && (
						<div className="Container">
							<div className="span">COULEUR SECONDAIRE</div>
							<div
								className="left"
								style={{
									left: -20,
									top: 38,
								}}
								onClick={() => {
									if (offset3 < 0) setOffset3(offset3 + 33);
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/left.webp" />
							</div>
							<div
								className="right"
								onClick={() => {
									if (offset3 > 33 * colorsF.length * -1 + 33 * 10) setOffset3(offset3 - 33);
								}}
								style={{
									right: -20,
									top: 38,
								}}>
								<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/right.webp" />
							</div>

							<div className="colorPick">
								{colorsF.map((c, i) => (
									<div
										key={i}
										className="color"
										onClick={() => changeColorF(i + 1)}
										style={{
											background: `linear-gradient(180deg, ${c}FF  0%, ${c}66 100%)`,
											transform: `translateX(${offset3}px)`,
										}}></div>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default ColorPicker;
