import React, { useContext } from "react";

import { GlobalContext } from "../../app";
import LoadingBar from "../../components/loadingBar";
import RadialMenuBuilder from "../../components/UI/RadialMenuBuilder/RadialMenuBuilder";
import { isDev } from "../../utils/isDev";
import { useExitKeys } from "../../hooks/useExitKeys";

const RadialMenus: React.FC = () => {
	const context = useContext(GlobalContext);
	const elements = [
		{
			name: "SALUT",
		},
		{
			name: "SALUT",
		},
		{
			name: "SALUT",
		},
	];

	const data: any = isDev
		? {
				elements,
				title: "GESTION ANIMAL",
				key: "F12",
				bar: {
					crew: "Ballas gang",
					time: "0",
					color: "#33963C",
					value: "57",
					valueString: "Level 57",
					rank: "S",
					// color: "#334A96",
					// color: "#963333",
					// color: "#ffffff",
					postAsync: {
						url: "core:medicalBed:heal",
						data: {},
					},
				},
			}
		: context.data;

	useExitKeys();

	return (
		<>
			{data.bar && (
				<LoadingBar
					time="0"
					value={data.bar.value}
					valueString={data.bar.valueString}
					icon="box"
					subtext={
						<>
							Rang <span className="rank">{data.bar.rank}</span>
						</>
					}
					color={data.bar.color}
					postAsync={{ url: data.bar.postAsync.url, data: data.bar.postAsync.data }}
					placement="start">
					<span>{data.bar.crew}</span>
				</LoadingBar>
			)}
			<RadialMenuBuilder
				title={data.title}
				elements={data.elements}
				hideShortcut={data.hideKey || false}
				shortcut={data.key}
				shortcutAction={data.keyAction}
			/>
		</>
	);
};

export default RadialMenus;
