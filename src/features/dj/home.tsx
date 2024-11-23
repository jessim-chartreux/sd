import "./dj.scss";

import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../app";
import { HomeT } from "./type";
import arrow from "./arrow.webp";
import block from "./block.webp";
import check from "./check.webp";
import heart from "./heart.webp";
import loop from "./loop.webp";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const Home: React.FC<HomeT> = props => {
	const context = useContext(GlobalContext);
	useExitKeys();
	const [range, setRange] = useState<number>(50);
	useEffect(() => {
		if (context?.data?.volume) {
			setRange(context?.data?.volume);
		}
		if (context?.data?.musicPlay) {
			props.setMusicPlay(context?.data?.musicPlay);
		}
	}, [context?.data?.musicPlay, context?.data?.volume, props]);

	return (
		<div className="Home">
			<div className="Home-ytp">
				<label className="Home-ytp-label" htmlFor="youtube">
					YOUTUBE
				</label>
				<input
					className="Home-ytp-input"
					type="text"
					name="youtube"
					id="youtube"
					value={props.input}
					onChange={e => props.setInput(e.target.value)}
				/>
				<div className="Home-ytp-icon">
					<img className="Home-ytp-icon-icon" src={loop} alt="" />
				</div>
			</div>
			<div className="Home-music">
				<p className="Home-music-title">MUSIQUE</p>
				<button
					className="Home-music-btn"
					onClick={() => {
						if (props.input === "") return;
						postAsync("AddNewMusic", { input: props.input, name: context?.data?.name });
						props.setInput("");
					}}>
					ENREGISTRER
					<img className="Home-music-icon" src={check} alt="" />
				</button>
				<button className="Home-music-btn" onClick={() => props.setPage("musiques")}>
					MES MUSIQUES
					<img className="Home-music-icon" src={heart} alt="" />
				</button>
				<button className="Home-music-btn" onClick={() => props.setPage("fil d'attente")}>
					FIL D'ATTENTE
					<img className="Home-music-icon" src={arrow} alt="" />
				</button>
				<button
					className="Home-music-btn Home-music-disabled"
					//onClick={() => props.setPage("platine")}
				>
					PLATINE DJ
					<img className="Home-music-icon" src={block} alt="" />
				</button>
			</div>
			<div className="Home-vol">
				<label className="Home-vol-label" htmlFor="myRange">
					VOLUME
				</label>
				<input
					className="Home-vol-input"
					type="range"
					min="0"
					max="100"
					value={range}
					id="myRange"
					onChange={e => {
						setRange(Number(e.target.value));
					}}
					onMouseUp={() => {
						postAsync("changeRange", { range, name: context?.data?.name });
					}}
				/>
			</div>
			<p className="Home-namePlay">{props.musicPlay}</p>
		</div>
	);
};

export default Home;
