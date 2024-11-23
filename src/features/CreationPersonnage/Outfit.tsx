import React, { useContext, useEffect, useState } from "react";

import CreationContexte from "./CreationContexte";
import MenuBuilder from "../../components/MenuBuilder/MenuBuilder";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useEnterKey } from "../../hooks/useEnterKey";

const Outfit: React.FC = () => {
	const [show, setShow] = useState("main");
	const [selections, setSelections] = useState<any[]>([]);
	const [selected, setSelected] = useState(null);
	const [a, setA] = useState(null);
	const [localData, sLocalData] = useState({});
	const { setData, data, setCanContinue, setHidden, hidden, catalogue, dataButtons, hideItemList } = useContext(CreationContexte);
	const [offset1, setOffset1] = useState(0);

	useEffect(() => {
		postAsync("CreationPersonnage", {
			onglet: "vetements",
		});
	}, []);

	useEnterKey(() => {
		if (selected) {
			setSelections([...selections, selected]);
			setSelected(null);
		}
	});

	useBackspaceKey(() => {
		setSelected(null);
		if (selections.length === 0) {
			setA(null);
			setShow("main");
			postAsync("CreationPersonnageBackToMain");
		} else {
			const _a = [...selections];
			while (_a[_a.length - 1]?.default === true) {
				_a.pop();
			}
			_a.pop();
			setSelections(_a);
			if (show === "finalSubmit") {
				setShow(a);
			}
		}
	});

	useEffect(() => {
		if (selections.length > 0 && show !== "main") {
			const _data: any = { ...data };
			if (!_data.vetements) _data.vetements = {};
			_data.vetements[show] = selections;
			setData(_data);
		}
		if (
			catalogue.filter(
				e =>
					e.category === show &&
					e.subCategory === buttons.find(_e => _e?.name === show)?.progressBar[selections.length]?.name &&
					(selections[selections.length - 1]?.idVariation === undefined
						? true
						: e?.targetId === selections[selections.length - 1]?.idVariation),
			).length === 0 &&
			show !== "main" &&
			show !== "finalSubmit"
		) {
			setSelections([...selections, { default: true }]);
		}
		if (selections.length === buttons.find(_e => _e.name === show)?.progressBar.length && selections.length > 0) {
			postAsync("CreationPersonnageBackToMain");
			setShow("main");
			setA(null);
		}
	}, [selections]);

	const buttons = (dataButtons ?? [])?.map(e => {
		e.onClickCallback = () => {
			setShow(e.name);
			setA(e.name);
			setSelections([]), postAsync("CreationPersonnageClickBouton", e.name);
		};
		return e;
	});

	useEffect(() => {
		setHidden(a && a !== "eyes" ? true : false);
	}, [a]);

	const getTab = () => {
		if (show === "main") {
			return [
				{
					name: "",
					type: "buttons",
					elements: [...buttons],
				},
			] as any;
		}
		return [
			{
				name: "",
				type: "elements",
				...(hideItemList?.includes(buttons.find(_e => _e?.name === show)?.progressBar[selections.length]?.name)
					? { variation: "no-image" }
					: {}),
				elements: (
					catalogue?.filter(
						e =>
							e.category === show &&
							e.subCategory === buttons.find(_e => _e?.name === show)?.progressBar[selections.length]?.name &&
							(selections[selections.length - 1]?.idVariation === undefined
								? true
								: e?.targetId === selections[selections.length - 1]?.idVariation),
					) ?? []
				).map((_e: any) => {
					_e.onClickCallback = () => {
						postAsync("CreationPersonnageClickHabit", _e);
						setSelected(_e);
					};
					return _e;
				}),
			},
		] as any;
	};

	return (
		<>
			<div className="Outfit">
				{hidden && (
					<div className="header">
						<div
							className="back"
							onClick={() => {
								setA(null);
								setShow("main");
								postAsync("CreationPersonnageBackToMain");
							}}>
							<img src="https://cdn.sacul.cloud/v2/vision-cdn/icons/left.webp" />
						</div>

						<div className="current">
							{/* <img src="https://cdn.sacul.cloud/v2/vision-cdn/CreationPersonnage/eye.svg" />
            <div className="span">COIFFURE</div> */}
						</div>
					</div>
				)}
				<div className="MenuBinco">
					{show !== "finalSubmit" && (
						<MenuBuilder
							showTurnAroundButtons={false}
							style={{
								overrideClassName: {
									main: show === "main" ? "overrideBinco" : "",
								},
							}}
							headerIcon=""
							headerIconName=""
							headerImage=""
							selected={selected}
							tabs={getTab()}
							progressBar={
								show !== "main"
									? {
											current: selections.length,
											elements: buttons.find(e => e.name === show)?.progressBar ?? [],
										}
									: undefined
							}
						/>
					)}
				</div>
			</div>

			{hidden && (
				<div className="Hints">
					<div className="hint">
						<span className="title">Étape Suivante</span>
						<span className="key">ENTRER</span>
					</div>
					<div className="hint">
						<span className="title">Retour</span>
						<span className="key">SUPPR</span>
					</div>
				</div>
			)}
		</>
	);
};

export default Outfit;
