import "./deathscreen.scss";

import React, { useContext, useState } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import useInterval from "../../utils/useInterval";

interface IDeathScreenData {
	secToWait: number;
}

const DeathScreen: React.FC = () => {
	const context = useContext(GlobalContext);

	const [secLeft, setSecLeft] = useState(null);
	const [reportDone, setReportDone] = useState(false);
	const [reportOpen, setReportOpen] = useState(false);
	const [reportError, setReportError] = useState<string>("");

	const data: IDeathScreenData | null = isDev
		? {
				secToWait: 10,
			}
		: (context.data as IDeathScreenData);

	const secondsToTime = (secs: number) => {
		const divisor_for_minutes = secs % (60 * 60);
		let minutes: any = Math.floor(divisor_for_minutes / 60);
		const divisor_for_seconds = divisor_for_minutes % 60;
		let seconds: any = Math.ceil(divisor_for_seconds);
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		return `${minutes}:${seconds}`;
	};

	const callAction = (action: string) => {
		if (action == "respawn" && data.secToWait !== 0) return;

		postAsync("deathscreen__action", {
			action,
		});
	};

	const handleSendReport = () => {
		const report = (document.getElementById("report") as HTMLTextAreaElement).value;

		if (!report.trim().length) return;
		if (report.split(" ").length < 3) {
			setReportError("Veuillez fournir plus de détails dans votre report.");
			return;
		}

		// Send the report
		postAsync("sendReport", {
			report,
			dontCloseUI: true,
		});

		setReportDone(true);
		setReportOpen(false);
	};

	useInterval(
		() => {
			// Your custom logic here
			setSecLeft((secLeft: any) => (secLeft = secLeft + 1));
		},
		data.secToWait - secLeft <= 0 ? null : 1000,
	);

	return (
		<div className="deathscreen">
			<div className="deathscreen_top">
				<h1 className="deathscreen_top_text">
					Vous êtes <b className="deathscreen_top_textcolor">inconscient</b>...{" "}
				</h1>
			</div>
			{reportOpen && (
				<div className="deathscreen_top" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
					{reportError && <p style={{ color: "red" }}>{reportError}</p>}
					<textarea
						id="report"
						placeholder="Raison du report..."
						style={{
							background: "rgba(0,0,0,.5)",
							border: "none",
							color: "white",
							outline: "none",
							padding: "10px",
							borderRadius: "5px",
							width: "50%",
							height: "100px",
							resize: "none",
						}}></textarea>
					<button
						style={{
							background: "white",
							width: "min-content",
							padding: "10px 40px",
							borderRadius: "50px",
							marginTop: "10px",
						}}
						onClick={handleSendReport}>
						Envoyer
					</button>
				</div>
			)}
			<div className="deathscreen_bottom">
				<div
					className="deathscreen_bottom_top d-flex justify-content-center align-items-center flex-row"
					style={{
						backgroundImage:
							"linear-gradient(90deg, rgba(6,6,6,0.12) 0%, rgba(170,0,0,0.52) 100%),url('https://cdn.sacul.cloud/v2/vision-cdn/deathscreen/background.webp')",
					}}>
					<img className="deathscreen_bottom_top_img" src="https://cdn.sacul.cloud/v2/vision-cdn/deathscreen/timer.webp" />
					<p className="deathscreen_bottom_top_text">{secondsToTime(data.secToWait - secLeft)}</p>
				</div>
				<div className="deathscreen_bottom_container d-flex justify-content-center align-items-center flex-row">
					<button
						onClick={() => callAction("DeathscreenCallEmergency")}
						className="deathscreen_bottom_container_button d-flex justify-content-center align-items-center">
						<span className="deathscreen_bottom_container_button_text">Alerter les secours</span>
					</button>
					<button
						onClick={() => {
							if (data.secToWait - secLeft == 0) {
								callAction("DeathscreenRespawn");
							}
						}}
						className={`deathscreen_bottom_container_button d-flex justify-content-center align-items-center ${
							data.secToWait - secLeft == 0 ? "" : "inactive"
						}`}>
						<span className="deathscreen_bottom_container_button_text">Me relever</span>
					</button>
					{!reportDone && (
						<button
							onClick={() => setReportOpen(!reportOpen)}
							className="deathscreen_bottom_container_button d-flex justify-content-center align-items-center">
							<span className="deathscreen_bottom_container_button_text">
								{reportOpen ? "Fermer le menu report" : "Faire un report"}
							</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default DeathScreen;
