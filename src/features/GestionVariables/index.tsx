import "./index.scss";
import "jsoneditor/dist/jsoneditor.css";
import "./jsoneditor.scss";

import JSONEditor, { JSONEditorOptions } from "jsoneditor";
import React, { useContext, useEffect, useRef } from "react";
import { close, useExitKeys } from "../../hooks/useExitKeys";

import Ajv from "ajv";
import Error from "./Error";
import { ErrorBoundary } from "react-error-boundary";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import test_data from "./test-data.json";

const ajv = new Ajv({ allErrors: false, verbose: true });

const GestionVariables: React.FC = () => {
	const context = useContext(GlobalContext);

	const data = isDev
		? {
				firstname: "Scott J.",
				lastname: "MILLER",
				source: 1,
				permission: 5,
				variables: test_data,
			}
		: context.data;

	const containerRef = useRef<HTMLDivElement | null>(null);
	const jsonEditorRef = useRef<JSONEditor | null>(null);
	const defaultData = data.variables;

	useExitKeys();

	useEffect(() => {
		const options: JSONEditorOptions = {
			ajv: ajv,
		};

		if (containerRef.current) {
			jsonEditorRef.current = new JSONEditor(containerRef.current, options);
			jsonEditorRef.current.set(data.variables);
		}

		return () => {
			if (jsonEditorRef.current) {
				jsonEditorRef.current.destroy();
			}
		};
	}, [data.variables]);

	return (
		<div className="GestionVariables">
			<div className="header">
				<div className="left">
					<div className="title">Gestion des variables</div>
					<div className="subtitle">
						Gérer les variables du serveur peut tout péter. Casser = PD. Utiliser à vos risques et périls
					</div>
				</div>
				<div className="right">
					<div className="user">
						<div className="name">
							{data.firstname} {data.lastname.toUpperCase()}
						</div>
						<div className="infos">
							<div className="source">
								ID : {data.source} - Permissions : {data.permission}
							</div>
						</div>
					</div>
					<div className="actions">
						<button
							className="button sync-btn"
							onClick={() => {
								jsonEditorRef.current?.set(defaultData);
							}}>
							<img src="https://cdn.sacul.cloud/v2/vision-cdn/svg/reset.svg" alt="reset" />
						</button>
						<button className="button close-btn">
							<img src="https://cdn.sacul.cloud/v2/vision-cdn/svg/close-x.svg" alt="close" onClick={close} />
						</button>
					</div>
				</div>
			</div>

			<ErrorBoundary fallback={<Error />}>
				<div className="body">
					<div className="json" ref={containerRef} />
					<div className="side">
						<div className="header">
							<span>Actions</span>
						</div>
						<div className="content">
							<div className="list">
								<button
									className="button close-btn"
									style={{ width: "auto", fontSize: "1rem", textTransform: "uppercase" }}
									onClick={() => {
										const variables = jsonEditorRef.current?.get();
										console.log(variables);

										postAsync("core:getPedCoords", {});
									}}>
									vector3 (position)
								</button>

								<button
									className="button close-btn"
									style={{ width: "auto", fontSize: "1rem", textTransform: "uppercase" }}
									onClick={() => {
										const variables = jsonEditorRef.current?.get();
										console.log(variables);

										postAsync("core:getPedCoordsH", {});
									}}>
									vector4 (pos + rotation)
								</button>
							</div>
							<div className="bottom">
								<div id="result">{JSON.stringify({ x: 123.3, y: 456.6, z: 789.9 })}</div>
							</div>
						</div>
					</div>
				</div>
				<div className="footer">
					<button
						className="button close-btn"
						style={{ width: "auto", fontSize: "1rem", textTransform: "uppercase" }}
						onClick={() => {
							const variables = jsonEditorRef.current?.get();
							console.log(variables);

							postAsync("core:updateAllVariables", { data: variables });
						}}>
						Sauvegarder les modifications
					</button>
				</div>
			</ErrorBoundary>
		</div>
	);
};

export default GestionVariables;
