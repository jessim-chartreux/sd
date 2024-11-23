import "./style.scss";

import React, { useState } from "react";

import { ReactSVG } from "react-svg";
import { close } from "../../../hooks/useExitKeys";
import { playOnClickSound } from "../../../utils/sounds";
import { postAsync } from "../../../utils/postAsync";
import { useKey } from "../../../hooks/useKey";

const RadialMenuBuilder: React.FC<any> = ({
	elements,
	title,
	hideShortcut,
	shortcut = "F1",
	shortcutAction = "POUR FERMER LE MENU",
	size = 500,
}) => {
	const [v, setV] = useState(0);
	useKey(shortcut, close);

	return (
		<div
			className="container"
			onMouseMove={e => {
				const rect = document.querySelector(".pointer").getBoundingClientRect();
				const x = e.clientX - rect.left; //x position within the element.
				const y = e.clientY - rect.top; //y position within the element.
				const angle = (Math.atan2(x, y) / Math.PI) * 180 * -1;
				setV(((360 + Math.round(angle)) % 360) + 180);
			}}>
			<div className="pointer"></div>
			<div className="middle">
				<div
					className="title"
					style={{
						paddingTop: hideShortcut ? 25 : 0,
					}}>
					{title}
				</div>
				{!hideShortcut && (
					<div className="close">
						<div className="key">{shortcut?.toUpperCase()}</div>
						{shortcutAction}
					</div>
				)}
				<div
					className="arrow"
					style={{
						transform: `rotate(${v}deg)`,
						bottom: hideShortcut ? 15 : -7.5,
					}}>
					<img src="https://cdn.sacul.cloud/v2/vision-cdn/RadialMenus/arrow.webp"></img>
				</div>
			</div>
			<div
				className={"radialMenu " + "size" + elements.length}
				style={{
					width: size,
					height: size,
				}}>
				{elements.map((e, i) => (
					<div
						key={i}
						className="buttonContainer"
						style={{
							transform: `rotate(${(360 / elements.length) * i}deg)`,
						}}>
						<div
							className="button"
							style={{
								width: (size / elements.length) * 2.4,
							}}
							onClick={() => {
								playOnClickSound();
								postAsync("radialmenu__callback", { button: e.action });
							}}>
							<div
								className="buttonContent"
								style={{
									transform: `rotate(${(360 / elements.length) * -i}deg)`,
								}}>
								{e.icon ? (
									<div className="w-icon">
										<ReactSVG src={e.icon} className="svg" />
										<span>{e.name}</span>
									</div>
								) : (
									<div className="n-icon">
										<span>{e.name}</span>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
				<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
					<clipPath id="doughnut-path">
						<path
							d={`
                        M0,${size / 2} A${size / 2},${size / 2} 0,1,1 ${size},${size / 2} A${size / 2},${size / 2} 0,1,1 0,${size / 2} z
                        M${size / 4},${size / 2} A${size / 4},${size / 4} 0,1,1 ${size * 0.75},${size / 1.87} A${size / 4},${
							size / 4
						} 0,1,1 ${size / 4},${size / 2} z`}
							clipRule="evenodd"
						/>
					</clipPath>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg">
					<linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
						<stop offset="0%" stopColor="#000000" />
						<stop offset="100%" stopColor="#454545" />
					</linearGradient>
				</svg>
			</div>
		</div>
	);
};

export default RadialMenuBuilder;
