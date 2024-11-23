import React from "react";
import "../tablette.scss";

interface Props {
	onChange: React.Dispatch<
		React.SetStateAction<
			"tablette" | "tools" | "drugs" | "choose" | "preloader" | "reset" | "time" | "time2" | "time3" | "mins" | "hours"
		>
	>;
}

const Choose: React.FC<Props> = ({ onChange }) => {
	return (
		<div className="body">
			<canvas id="Matrix" style={{ position: "absolute" }}></canvas>
			<div className="main">
				<h1 className="h1">Que voulez vous acheter?</h1>
				<div className="btn">
					<button className="button" onClick={() => onChange("drugs")}>
						Drogues.
					</button>
				</div>
				<div className="btn">
					<button className="button" onClick={() => onChange("tools")}>
						Outils.
					</button>
				</div>
			</div>
		</div>
	);
};

export default Choose;
