import "./style.scss";

import React, { useContext, useState } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";
import { useKey } from "../../hooks/useKey";

const RightCaseBuilder = () => {
	useExitKeys();
	const [i, setI] = useState<boolean>(false);
	const context = useContext(GlobalContext);
	const data: any | null = isDev
		? {
				headerName: "decoration d'interieur",
				headerIcon: "/https://cdn.sacul.cloud/v2/vision-cdn/RightCaseBuilder/info.webp",
				items: [
					{
						icon: "/https://cdn.sacul.cloud/v2/vision-cdn/RightCaseBuilder/run.webp",
						title: "Suivre",
						action: "zizifesseyummy",
					},
					{
						icon: "/https://cdn.sacul.cloud/v2/vision-cdn/RightCaseBuilder/triangle.webp",
						title: "attaquer",
						action: "zizifesseyummy1",
					},
					{
						icon: "/https://cdn.sacul.cloud/v2/vision-cdn/RightCaseBuilder/run.webp",
						title: "Suivre",
						action: "zizifesseyummy",
					},
					{
						icon: "/https://cdn.sacul.cloud/v2/vision-cdn/RightCaseBuilder/run.webp",
						title: "Suivre",
						action: "zizifesseyummy",
					},
					{
						icon: "/https://cdn.sacul.cloud/v2/vision-cdn/RightCaseBuilder/run.webp",
						title: "Suivre",
						action: "zizifesseyummy",
					},
					{
						icon: "/https://cdn.sacul.cloud/v2/vision-cdn/RightCaseBuilder/run.webp",
						title: "Suivre",
						action: "zizifesseyummy",
					},
					{
						icon: "/https://cdn.sacul.cloud/v2/vision-cdn/RightCaseBuilder/run.webp",
						title: "Suivre",
						action: "zizifesseyummy",
					},
					{
						icon: "/https://cdn.sacul.cloud/v2/vision-cdn/RightCaseBuilder/run.webp",
						title: "Suivre",
						action: "zizifesseyummy",
					},
				],
			}
		: context.data;

	const getGridColumns = gridlength => {
		if (gridlength === 1) return "auto";
		else if (gridlength === 2) return "auto auto";
		else if (gridlength === 3) return "auto auto auto";
		else return "auto auto auto auto";
	};

	useKey("i", () => {
		setI(!i);
		postAsync("RCBI", i);
	});

	return (
		<div className="containerRCB">
			{i ? (
				<div className={`icon`}>
					<img className="icon-img" src={data.headerIcon} alt="" />
				</div>
			) : null}
			<div className="RCB" style={{ top: `${data.items.length <= 4 ? "86%" : "77%"}` }}>
				{!i ? (
					<div className={`RCB-menu ${i ? "slideToLeft" : "slideFromLeft"}`}>
						<p className={`RCB-menu-title`}>{data.headerName}</p>
						<div className="RCB-menu-icon">
							<img className="RCB-menu-icon-img" src={data.headerIcon} alt="" />
						</div>
					</div>
				) : null}
				<div
					className={`RCB-cases ${i ? "slideToLeft" : "slideFromLeft"}`}
					style={{ gridTemplateColumns: getGridColumns(data.items.length), display: i ? "none" : "grid" }}>
					{data.items.map(item => (
						<div className="RCB-cases-case" key={item.action} onClick={() => postAsync("RCB", item)}>
							<div className="RCB-cases-case-icon">
								<img className="RCB-cases-case-icon-img" src={item.icon} alt="" />
							</div>
							<div className="RCB-cases-case-title">
								<p className="RCB-cases-case-title-text">{item.title}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default RightCaseBuilder;
