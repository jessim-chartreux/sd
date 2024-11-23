import "./dj.scss";

import { PageT, myMusicListT, myPlayListT } from "./type";
import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import loop from "./loop.webp";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useExitKeys } from "../../hooks/useExitKeys";

const Page: React.FC<PageT> = props => {
	const context = useContext(GlobalContext);
	useExitKeys();
	const [music, setMusic] = useState<myMusicListT[] | myPlayListT[]>([]);
	const [input, setInput] = useState<string>("");
	const [focus, setFocus] = useState<boolean>(false);
	useEffect(() => {
		if (props.page === "musiques") {
			if (isDev) {
				setMusic([
					{
						title: "music1",
						url: "yoyoyoyoy",
					},
					{
						title: "la deux",
						url: "yoyoyoyoy",
					},
					{
						title: "trois",
						url: "yoyoyoyoy",
					},
					{
						title: "music1",
						url: "yoyoyoyoy",
					},
					{
						title: "music2",
						url: "yoyoyoyoy",
					},
					{
						title: "music3",
						url: "yoyoyoyoy",
					},
					{
						title: "music1",
						url: "yoyoyoyoy",
					},
					{
						title: "music2",
						url: "yoyoyoyoy",
					},
					{
						title: "music3",
						url: "yoyoyoyoy",
					},
					{
						title: "music1",
						url: "yoyoyoyoy",
					},
					{
						title: "music2",
						url: "yoyoyoyoy",
					},
					{
						title: "music3",
						url: "yoyoyoyoy",
					},
					{
						title: "music1",
						url: "yoyoyoyoy",
					},
					{
						title: "music2",
						url: "yoyoyoyoy",
					},
					{
						title: "music3",
						url: "yoyoyoyoy",
					},
					{
						title: "music1",
						url: "yoyoyoyoy",
					},
					{
						title: "music2",
						url: "yoyoyoyoy",
					},
					{
						title: "music3",
						url: "yoyoyoyoy",
					},
					{
						title: "music1",
						url: "yoyoyoyoy",
					},
					{
						title: "music2",
						url: "yoyoyoyoy",
					},
					{
						title: "music3",
						url: "yoyoyoyoy",
					},
				]);
			} else {
				(async () => {
					const result = await postAsync("djGetMyMusicList", { name: context?.data?.name });
					setMusic(result.data);
				})();
			}
		} else if (props.page === "fil d'attente") {
			if (isDev) {
				setMusic([
					{
						title: "music1",
						url: "yyoyoyoy",
						isActive: true,
						pos: 0,
					},
					{ title: "music2", url: "yyoyoyoy", isActive: false, pos: 1 },
					{
						title: "music3",
						url: "yyoyoyoy",
						isActive: false,
						pos: 1,
					},
				]);
			} else {
				(async () => {
					const result = await postAsync("djGetMyPlayList", { name: context?.data?.name });
					setMusic(result.data);
				})();
			}
		}
	}, [context?.data?.name, props.page]);

	useBackspaceKey(() => {
		console.log(focus);
		if (focus) return;
		props.setPage("home");
	});

	return (
		<div className="Page">
			<div className="Page-header">{props.page}</div>
			<div className="Page-ytp">
				<label className="Page-ytp-label" htmlFor="youtube">
					Chercher
				</label>
				<input
					className="Page-ytp-input"
					type="text"
					name="youtube"
					id="youtube"
					value={input}
					onChange={e => setInput(e.target.value)}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
				/>
				<div className="Page-ytp-icon">
					<img className="Page-ytp-icon-icon" src={loop} alt="" />
				</div>
			</div>
			<div className="Page-music">
				{music
					.filter(item => item?.title.includes(input))
					.map((mus, key) => (
						<div
							className="Page-music-unit"
							key={key}
							onClick={() => {
								props.setMusicPlay(mus.title);
								postAsync(props.page === "musiques" ? "addMusicToPlaylist" : "PlayMusicToPlayList", {
									name: context?.data?.name,
									input: mus,
								});
							}}>
							{mus.title}
						</div>
					))}
			</div>
		</div>
	);
};

export default Page;
