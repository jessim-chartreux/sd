import React from "react";

import "../tablette.scss";

interface Props {
	onChange: React.Dispatch<
		React.SetStateAction<
			"tablette" | "tools" | "drugs" | "choose" | "preloader" | "reset" | "time" | "time2" | "time3" | "mins" | "hours"
		>
	>;
}

const Mins: React.FC<Props> = ({ onChange }) => {
	return (
		<div className="body">
			<header>
				<div className="header">
					<h2 className="h2">Livraison</h2>
					<div className="header-spacing">
						<h3 className="h3 connected">
							Vagos
							<a onClick={() => onChange("tablette")}>
								<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M10 18.7334C14.9658 18.7334 19.0791 14.6289 19.0791 9.6543C19.0791 4.68848 14.9658 0.575195 9.99121 0.575195C5.02539 0.575195 0.920898 4.68848 0.920898 9.6543C0.920898 14.6289 5.03418 18.7334 10 18.7334ZM10.0088 9.90918C9.60449 9.90918 9.32324 9.61914 9.32324 9.20605V5.36523C9.32324 4.95215 9.60449 4.66211 10.0088 4.66211C10.4131 4.66211 10.6943 4.95215 10.6943 5.36523V9.20605C10.6943 9.61914 10.4131 9.90918 10.0088 9.90918ZM10.0088 14.3916C7.41602 14.3916 5.27148 12.2383 5.27148 9.6543C5.27148 8.37109 5.81641 7.10547 6.75684 6.24414C7.43359 5.57617 8.3916 6.52539 7.70605 7.21094C7.0293 7.85254 6.65137 8.71387 6.65137 9.6543C6.65137 11.5264 8.14551 13.0205 10.0088 13.0205C11.8721 13.0205 13.3662 11.5264 13.3662 9.6543C13.3662 8.71387 12.9795 7.85254 12.3115 7.21973C11.626 6.53418 12.5752 5.58496 13.2607 6.24414C14.2012 7.11426 14.7461 8.37988 14.7461 9.6543C14.7461 12.2383 12.6016 14.3916 10.0088 14.3916Z"
										fill="#FF0000"
									/>
								</svg>
							</a>
						</h3>
					</div>
				</div>
			</header>
			<div className="main">
				<div className="btn-container">
					<div className="btn-tools-drugs">
						<button className="button" onClick={() => onChange("drugs")}>
							Drogues.
						</button>
					</div>
					<div className="btn-tools-drugs">
						<button className="button-selected">Outils.</button>
					</div>
				</div>
				<div className="time-container">
					<div className="time">
						<div className="row">
							<div className="btn-time-container">
								<button className="btn-hour">10 mins</button>
							</div>
							<div className="btn-time-container">
								<button className="btn-hour">20 mins</button>
							</div>
						</div>
						<div className="row">
							<div className="btn-time-container">
								<button className="btn-hour" onClick={() => onChange("time3")}>
									30 mins
								</button>
							</div>
							<div className="btn-time-container">
								<button className="btn-hour">40 mins</button>
							</div>
						</div>
						<div className="row">
							<div className="btn-time-container">
								<button className="btn-hour">50 mins</button>
							</div>
							<div className="btn-time-container">
								<button className="btn-hour">60 mins</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Mins;
