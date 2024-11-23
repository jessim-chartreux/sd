import "./progressbar.scss";

import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { close } from "../../hooks/useExitKeys";

interface IProgressBar {
	text: string;
	time: number;
}

const Progressbar: React.FC = () => {
	const context = useContext(GlobalContext);
	const data: IProgressBar | null = isDev
		? {
				text: "Loading",
				time: 20,
			}
		: (context.data as IProgressBar);

	useEffect(() => {
		const progressbar = Array.from(document.getElementsByClassName("progressbar_container_bar") as HTMLCollectionOf<HTMLElement>);

		progressbar[0].style.transition = "width " + data.time + "s ease-in-out";

		const interval_ = setInterval(() => {
			progressbar[0].style.width = "0px";
			clearInterval(interval_);
		}, 100);

		const interval = setInterval(() => {
			close();
			clearInterval(interval);
		}, data.time * 1000);
	});

	return (
		<div className="progressbar d-flex justify-content-center align-items-center flex-column">
			<span className="progressbar_text">{data.text}</span>

			<div className="progressbar_container">
				<div className="progressbar_container_bar" />
			</div>
		</div>
	);
};

export default Progressbar;
