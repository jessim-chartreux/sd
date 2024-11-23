import "./radio.scss";

import React, { useContext, useMemo, useState } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

interface IRadio {
	frequence: number;
}
const Radio = () => {
	useExitKeys();

	const audioOn = useMemo(() => new Audio("https://cdn.sacul.cloud/v2/vision-cdn/radio/on.ogg"), []);
	const audioOff = useMemo(() => new Audio("https://cdn.sacul.cloud/v2/vision-cdn/radio/off.ogg"), []);
	const context = useContext(GlobalContext);
	const data: IRadio = isDev
		? {
				frequence: 80.05,
			}
		: (context.data as IRadio);
	const [frequence, setFrequence] = useState(data.frequence);

	const updateFrequence = (action: string) => {
		postAsync("radio__callback", {
			action: "updateFrequence",
			args: action,
		});
	};

	const buttonAction = (action: string, data: any) => {
		postAsync("radio__callback", {
			action: action,
			args: data,
		});
	};

	const toggleRadio = async () => {
		try {
			const newState = isDev
				? Math.random() > 0.5
				: await postAsync("radio__callback", {
						action: "toggle",
					});

			if (newState) {
				audioOn.play();
			} else {
				audioOff.play();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const onMessage = React.useCallback(
		(event: any) => {
			if (event.data.type == "updateFrequence") setFrequence(event.data.frequence);
			if (event.data.type == "audioOn") audioOn.play();
			if (event.data.type == "audioOff") audioOff.play();
		},
		[audioOn, audioOff],
	);

	React.useEffect(() => {
		window.addEventListener("message", onMessage);
		return () => window.removeEventListener("message", onMessage);
	}, [onMessage]);

	return (
		<div id="radio">
			<img style={{ height: 695 }} src={"https://cdn.sacul.cloud/v2/vision-cdn/radio/radio@2x.webp"} />

			<div className="display">
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
					}}>
					<img
						style={{
							height: 16.5,
						}}
						src={"https://cdn.sacul.cloud/v2/vision-cdn/radio/latence@2x.webp"}
					/>

					<div
						style={{
							display: "flex",
							flexDirection: "column",
						}}>
						<img src={"https://cdn.sacul.cloud/v2/vision-cdn/radio/rx@2x.webp"} style={{ height: 9, marginBottom: 4 }} />
						<img src={"https://cdn.sacul.cloud/v2/vision-cdn/radio/tx@2x.webp"} style={{ height: 9 }} />
					</div>
				</div>

				<div
					style={{
						display: "flex",
						marginTop: 37.5,
						marginLeft: 10,
						justifyContent: "end",
					}}>
					<img
						src={"https://cdn.sacul.cloud/v2/vision-cdn/radio/ch@2x.webp"}
						style={{ height: 15, marginTop: 9, marginRight: 3 }}
					/>

					<p
						style={{
							fontFamily: "Quartz",
							font: "normal normal bold 38px/18px Quartz",
							letterSpacing: "-2.9px",
							margin: 0,
							color: "#4B5430",
							zIndex: 0,
						}}>
						{frequence}
					</p>
				</div>

				<div className="buttons">
					<img
						onClick={() => updateFrequence("add")}
						src={"https://cdn.sacul.cloud/v2/vision-cdn/radio/f@2x.webp"}
						style={{ margin: "0 3px", height: 35 }}
					/>
					<img
						onClick={toggleRadio}
						src={"https://cdn.sacul.cloud/v2/vision-cdn/radio/OFF@2x.webp"}
						style={{ margin: "0 3px", height: 37.5 }}
					/>
					<img
						onClick={() => updateFrequence("remove")}
						src={"https://cdn.sacul.cloud/v2/vision-cdn/radio/e@2x.webp"}
						style={{ margin: "0 3px", height: 35 }}
					/>
				</div>

				<div className="buttons" style={{ marginTop: 78 }}>
					<img
						onClick={() => buttonAction("mute", {})}
						src={"https://cdn.sacul.cloud/v2/vision-cdn/radio/VOLUME@2x.webp"}
						style={{ margin: "0 3px", height: 25 }}
					/>
					<img
						onClick={() => buttonAction("soundup", {})}
						src={"https://cdn.sacul.cloud/v2/vision-cdn/radio/+@2x.webp"}
						style={{ margin: "0 3px", height: 25 }}
					/>
					<img
						onClick={() => buttonAction("sounddown", {})}
						src={"https://cdn.sacul.cloud/v2/vision-cdn/radio/-@2x.webp"}
						style={{ margin: "0 3px", height: 25 }}
					/>
				</div>

				<div className="buttons" style={{ marginTop: 107 }}>
					<img
						onClick={() => buttonAction("man", {})}
						src={"https://cdn.sacul.cloud/v2/vision-cdn/radio/MAN@2x.webp"}
						style={{ margin: "0 3px", height: 25 }}
					/>
					<img
						onClick={() => buttonAction("check", {})}
						src={"https://cdn.sacul.cloud/v2/vision-cdn/radio/CHECK@2x.webp"}
						style={{ margin: "0 3px", height: 25 }}
					/>
				</div>
			</div>
		</div>
	);
};

export default Radio;
