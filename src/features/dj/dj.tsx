import "./dj.scss";

import React, { useContext, useState } from "react";

import { GlobalContext } from "../../app";
import Home from "./home";
import Page from "./page";
import next from "./next.webp";
import play from "./play.webp";
import { postAsync } from "../../utils/postAsync";
import stop from "./stop.webp";
import { useExitKeys } from "../../hooks/useExitKeys";

const Dj: React.FC = () => {
	const context = useContext(GlobalContext);
	useExitKeys();
	const [page, setPage] = useState<string>("home");
	const [input, setInput] = useState<string>("");
	const [musicPlay, setMusicPlay] = useState<string>("");

	return (
		<div id="dj">
			<img src="https://cdn.sacul.cloud/v2/vision-cdn/Headers/header_dj.webp" alt="image" />
			{page === "home" ? (
				<Home setPage={setPage} input={input} setInput={setInput} musicPlay={musicPlay} setMusicPlay={setMusicPlay} />
			) : (
				<Page setPage={setPage} page={page} setMusicPlay={setMusicPlay} />
			)}
			<div className="footer">
				<button
					className="footer-btn"
					style={{ background: "linear-gradient(180deg, #33963C 0%, rgba(30, 180, 90, 0.58) 100%)" }}
					onClick={() =>
						input === ""
							? postAsync("PlayDj", context?.data?.name)
							: postAsync("justplayFlozii", { input, name: context?.data?.name })
					}>
					<img className="footer-btn-icon" src={play} alt="" />
					Play
				</button>
				<button
					className="footer-btn"
					style={{ background: "linear-gradient(180deg, #5557A1 0%, #4A3E88 100%)" }}
					onClick={() => postAsync("NextDj", context?.data?.name)}>
					<img className="footer-btn-icon" src={next} alt="" />
					Suivant
				</button>
				<button
					className="footer-btn"
					style={{
						background: "linear-gradient(90deg, #C21A20 0%, #D2383E 0.01%, #C42B31 13.45%, #B31D22 89.82%, #A61116 103.26%)",
					}}
					onClick={() => postAsync("StopDj", context?.data?.name)}>
					<img className="footer-btn-icon" src={stop} alt="" />
					Stop
				</button>
			</div>
		</div>
	);
};

export default Dj;
