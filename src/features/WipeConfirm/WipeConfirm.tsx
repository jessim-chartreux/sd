import React, { useContext, useEffect } from "react";
import "./WipeConfirm.scss";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { playOnClickSound } from "../../utils/sounds";

const WipeConfirm: React.FC = () => {
	const context = useContext(GlobalContext);

	const inputRef = React.useRef<HTMLInputElement>(null);

	const data = isDev
		? {
				id: "69",
				firstname: "Carlos",
				lastname: "Rodriguez",
			}
		: context.data;

	const handleValidate = () => {
		postAsync("WipeConfirmResponse", { value: true });
		playOnClickSound();
	};

	const handleCancel = () => {
		postAsync("WipeConfirmResponse", { value: false });
		playOnClickSound();
	};

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<div className="WipeConfirm">
			<h1>Wipe un joueur</h1>
			<p className="text">Êtes-vous sûr de vouloir supprimer les données du joueur suivant?</p>
			<p className="data">
				{data?.id} - {data?.firstname} {data?.lastname}
			</p>
			<p className="warning">Attention, cette action est irréversible!</p>
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

export default WipeConfirm;
