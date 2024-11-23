import "./interaction.scss";

import React, { useContext } from "react";
import { close, useExitKeys } from "../../hooks/useExitKeys";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";

interface IInteraction {
	label: string;
	icon: string;
	action: string;
	args: any;
}

interface IInteractionState {
	position: {
		x: number;
		y: number;
	};
	interactions: IInteraction[];
}

const Interaction: React.FC = () => {
	useExitKeys();
	const context = useContext(GlobalContext);

	const state = (context.data as IInteractionState) || {
		position: { x: 0, y: 0 },
		interactions: isDev
			? [
					{
						label: "Test 1 zdzzdzzdzddzdzdzdzzdzdzdzzdz",
						icon: "coeurblanc",
						action: "test",
						args: [],
					},
					{
						label: "Test 1",
						icon: "police",
						action: "test",
						args: [],
					},
					{
						label: "Test 1",
						icon: "police",
						action: "test",
						args: [],
					},
					{
						label: "Test 1",
						icon: "police",
						action: "test",
						args: [],
					},
					{
						label: "Test 1",
						icon: "police",
						action: "test",
						args: [],
					},
					{
						label: "Test 1",
						icon: "police",
						action: "test",
						args: [],
					},
					{
						label: "Test 1",
						icon: "police",
						action: "test",
						args: [],
					},
					{
						label: "Test 1",
						icon: "police",
						action: "test",
						args: [],
					},
				]
			: [],
	};

	const clampPosition = (x: number, y: number) => {
		const width = 460;
		const height = 300;

		const minX = width / 2;
		const maxX = window.innerWidth - minX;

		const minY = height / 2;
		const maxY = window.innerHeight - minY;

		return [Math.max(minX, Math.min(maxX, x)), Math.max(minY, Math.min(maxY, y))];
	};
	const [posX, posY] = clampPosition(state.position.x * window.innerWidth, state.position.y * window.innerHeight);

	const mapData = (data: IInteraction[]) => {
		return data;
	};

	const data: IInteraction[] = mapData(state.interactions);

	const handleClick = (item: IInteraction) => {
		postAsync("context__callback", {
			action: item.action,
			args: item.args,
		});
		close();
	};

	const renderItem = (item: IInteraction, index: number) => {
		return item ? (
			<div className="interaction_item" key={index}>
				<div className="interaction_item_container" onClick={() => handleClick(item)}>
					<img src={`https://cdn.sacul.cloud/v2/vision-cdn/interact/${item.icon}.webp`} alt="Interact icon" />
					<div className="label">{item.label}</div>
				</div>
			</div>
		) : (
			<React.Fragment key={index} />
		);
	};

	return (
		<div className="interaction" style={{ top: posY + "px", left: posX + "px" }}>
			<div className="interaction_wheel">
				<div className="interaction_row interaction_center">{[data[2], data[4], data[6]].map(renderItem)}</div>
				<div className="interaction_row interaction_between">{[data[0], data[1]].map(renderItem)}</div>
				<div className="interaction_row interaction_center">{[data[3], data[5], data[7]].map(renderItem)}</div>
			</div>
			<div className="interaction_close" onClick={close}>
				X
			</div>
		</div>
	);
};

export default Interaction;
