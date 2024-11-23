import React, { useState } from "react";

import "../tablette.scss";

interface Props {
	onChange: React.Dispatch<
		React.SetStateAction<
			"tablette" | "tools" | "drugs" | "choose" | "preloader" | "reset" | "time" | "time2" | "time3" | "mins" | "hours"
		>
	>;
}

const Reset: React.FC<Props> = ({ onChange }) => {
	const [username, setUsername] = useState("pseudonyme");

	return (
		<div className="body">
			<canvas id="Matrix" style={{ position: "absolute" }}></canvas>
			<div className="main">
				<h1 className="h1">Mot de passe oublie.</h1>
				<div className="login">
					<div className="label">
						<label htmlFor="pseudonyme">
							<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M8.00879 8.5752C9.9248 8.5752 11.5508 6.87012 11.5508 4.66406C11.5508 2.51074 9.91602 0.858398 8.00879 0.858398C6.09277 0.858398 4.44922 2.53711 4.45801 4.68164C4.45801 6.87012 6.08398 8.5752 8.00879 8.5752ZM2.52441 16.749H13.4756C14.9258 16.749 15.4268 16.3096 15.4268 15.501C15.4268 13.2422 12.5615 10.1309 8 10.1309C3.44727 10.1309 0.573242 13.2422 0.573242 15.501C0.573242 16.3096 1.07422 16.749 2.52441 16.749Z"
									fill="#138900"
								/>
							</svg>
							Saisissez votre pseudonyme :
						</label>
					</div>
					<input
						className="input"
						id="pseudonyme"
						type="text"
						name="username"
						value={username}
						onChange={event => setUsername(event.target.value)}
					/>
				</div>
				<div className="login"></div>
				<div className="btn">
					<button onClick={() => onChange("tablette")} className="button">
						Reset.
					</button>
				</div>
			</div>
		</div>
	);
};

export default Reset;
