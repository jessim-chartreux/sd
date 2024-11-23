import React, { useContext, useEffect } from "react";
import "./style.scss";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { playOnClickSound } from "../../utils/sounds";
import { useKey } from "../../hooks/useKey";

const KeyboardInput: React.FC = () => {
	const context = useContext(GlobalContext);

	const inputRef = React.useRef<HTMLInputElement>(null);

	const data = isDev
		? {
				title: "Nom du personnage",
				defaultValue: "John Doe",
			}
		: context.data;

	const [value, setValue] = React.useState(data.defaultValue || "");

	const handleValidate = () => {
		postAsync("KeyboardInputResponse", { value });
		playOnClickSound();
	};

	const handleCancel = () => {
		postAsync("KeyboardInputResponse", { value: null });
		playOnClickSound();
	};

	useKey("Escape", handleCancel);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<div className="KeyboardInput">
			<h1>{data.title}</h1>
			<input
				ref={inputRef}
				value={value}
				placeholder={`${data.title}...`}
				onChange={e => setValue(e.target.value)}
				onKeyDown={e => {
					if (e.key === "Enter") {
						handleValidate();
					}
				}}
			/>
		</div>
	);
};

export default KeyboardInput;
