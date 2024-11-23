import React, { useContext, useEffect } from "react";
import "./ChoiceInput.scss";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { playOnClickSound } from "../../utils/sounds";

const ChoiceInput: React.FC = () => {
	const context = useContext(GlobalContext);

	const inputRef = React.useRef<HTMLInputElement>(null);

	const data = isDev
		? {
				action: "Êtes vous sûr de vouloir débannir cette personne?",
			}
		: context.data;

	const handleValidate = () => {
		postAsync("ChoiceInputResponse", { value: true });
		playOnClickSound();
	};

	const handleCancel = () => {
		postAsync("ChoiceInputResponse", { value: false });
		playOnClickSound();
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<div className="ChoiceInput">
			<h1>{data.action}</h1>
			<div className="buttons">
				<button className="confirm" onClick={handleValidate}>
					Confirmer
				</button>
				<button className="cancel" onClick={handleCancel}>
					Annuler
				</button>
			</div>
		</div>
	);
};

export default ChoiceInput;
