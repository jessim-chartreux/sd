import "./style.scss";

import React, { useContext, useState } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";
import { useKey } from "../../hooks/useKey";

const BlocNote: React.FC = () => {
	const context = useContext(GlobalContext);
	useExitKeys();

	useKey("Escape", () => {
		if (!data?.readOnlyTitle) postAsync("BlocNote", loc);
	});

	const data: any = isDev
		? {
				content: ["Ceci est la page 1", "Ceci est la page 2", "Ceci est la page 3", "Ceci est la page 4"],
				readOnlyTitle: "LECTURE DE LETTRE",
			}
		: context.data;

	const [page, setPage] = useState(0);

	const [loc, setLoc] = useState(data?.content ?? []);

	return (
		<div className={"BlocNote"}>
			<div
				className="Content Anim A-FadeIn"
				style={{
					backgroundImage: `"https://cdn.sacul.cloud/v2/vision-cdn/BlocNote/background.webp')`,
				}}></div>
			<div
				className="Content Anim A-FadeIn"
				style={{
					backgroundImage: `"https://cdn.sacul.cloud/v2/vision-cdn/BlocNote/background.webp')`,
				}}></div>
			<div
				className="Content A-FadeIn"
				style={{
					backgroundImage: `"https://cdn.sacul.cloud/v2/vision-cdn/BlocNote/background.webp')`,
				}}>
				<div className="Title">{data.readOnlyTitle ?? "BLOC NOTE"}</div>
				<div className="Page">PAGE {page + 1}</div>
				{/* <div className="Lines">
                    {(() => {
                        const _a = []
                        for (let i = 0; i <= 11; i++) {
                            _a.push(<div className="Line"></div>)
                        }
                        return _a
                    })()}
                </div> */}
				<textarea
					wrap="hard"
					cols={50}
					rows={12}
					value={loc[page] ?? ""}
					disabled={data.readOnlyTitle}
					onChange={e => {
						const _loc = [...loc];
						_loc[page] = e.currentTarget.value;
						setLoc(_loc);
					}}></textarea>
				{page > 0 && (
					<div
						className="prev"
						onClick={() => {
							setPage(page - 1);
						}}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/BlocNote/next.svg" />
					</div>
				)}
				{page < 5 && (data.readOnlyTitle ? data?.content?.length - 1 > page : true) && (
					<div
						className="next"
						onClick={() => {
							if (!loc[page]) {
								const _loc = [...loc];
								_loc[page] = "";
								setLoc(_loc);
							}
							setPage(page + 1);
						}}>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/BlocNote/next.svg" />
					</div>
				)}
			</div>
		</div>
	);
};

export default BlocNote;
