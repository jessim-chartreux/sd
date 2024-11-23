import React, { useState } from "react";
import { drugNext, showConnect, showDrugs, showThanku, showTime, showTimeDrugs, showTools } from "../script/script";

interface Props {
	onChange: React.Dispatch<
		React.SetStateAction<
			"tablette" | "tools" | "drugs" | "choose" | "preloader" | "reset" | "time" | "time2" | "time3" | "mins" | "hours"
		>
	>;
}

const TabletteMain: React.FC<Props> = ({ onChange }) => {
	const [username, setUsername] = useState("******");
	const [password, setPassword] = useState("******");

	const [show, setShow] = useState(true);

	return (
		<div className="body">
			<canvas id="Matrix" style={{ position: "absolute" }}></canvas>
			<div className="main">
				{show && (
					<>
						<h1 className="h1 shown front">Connectez vous.</h1>
						<div className="login shown front">
							<div className="label shown">
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
						<div className="login shown">
							<div className="label shown front">
								<label htmlFor="motdepasse front">
									<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M3.67383 16.8809H14.3174C16.2246 16.8809 17.209 15.8965 17.209 14.0156V3.31934C17.209 1.43848 16.2246 0.454102 14.3174 0.454102H3.67383C1.77539 0.454102 0.782227 1.42969 0.782227 3.31934V14.0156C0.782227 15.8965 1.77539 16.8809 3.67383 16.8809ZM5.74805 12.0996V8.54883C5.74805 7.91602 6.00293 7.59961 6.5127 7.54688V6.52734C6.5127 4.83984 7.53223 3.71484 9.01758 3.71484C10.5205 3.71484 11.5312 4.83984 11.5312 6.52734V7.54688C12.041 7.59961 12.2959 7.91602 12.2959 8.54883V12.0996C12.2959 12.7939 11.9795 13.1191 11.3379 13.1191H6.70605C6.06445 13.1191 5.74805 12.7939 5.74805 12.0996ZM7.60254 7.5293H10.4414V6.43066C10.4414 5.42871 9.87891 4.76953 9.01758 4.76953C8.16504 4.76953 7.60254 5.42871 7.60254 6.43066V7.5293Z"
											fill="#138900"
										/>
									</svg>
									Saisissez votre mot de passe :
								</label>
							</div>
							<input
								className="input shown front"
								name="motdepasse"
								id="motdepasse"
								type="password"
								value={password}
								onChange={event => setPassword(event.target.value)}
							/>
							<div className="label shown front">
								<label className="mdp front" htmlFor="motdepasse">
									<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M9.99121 18.7598C14.9746 18.7598 19.0879 14.6465 19.0879 9.66309C19.0879 4.68848 14.9658 0.575195 9.98242 0.575195C5.00781 0.575195 0.90332 4.68848 0.90332 9.66309C0.90332 14.6465 5.0166 18.7598 9.99121 18.7598ZM3.90918 5.35645C4.375 4.65332 4.97266 4.04688 5.67578 3.56348L7.44238 5.33008C6.71289 5.76074 6.08887 6.38477 5.66699 7.11426L3.90918 5.35645ZM16.082 5.36523L14.3242 7.12305C13.8936 6.39355 13.2695 5.76953 12.54 5.33887L14.3066 3.57227C15.0098 4.05566 15.6074 4.66211 16.082 5.36523ZM10 12.8096C8.25098 12.8096 6.84473 11.4033 6.84473 9.6543C6.84473 7.90527 8.25098 6.49023 10 6.49023C11.749 6.49023 13.1553 7.90527 13.1553 9.6543C13.1553 11.4033 11.749 12.8096 10 12.8096ZM16.0908 13.9258C15.6074 14.6289 15.0098 15.2354 14.3154 15.7188L12.5488 13.9521C13.2783 13.5215 13.9023 12.8975 14.3242 12.168L16.0908 13.9258ZM3.90918 13.9346L5.66699 12.1768C6.08887 12.915 6.72168 13.5303 7.44238 13.9609L5.68457 15.7275C4.98145 15.2529 4.38379 14.6377 3.90918 13.9346Z"
											fill="#138900"
										/>
									</svg>
									<a className="front" onClick={() => onChange("reset")}>
										reinitialiser votre mot de passe
									</a>
								</label>
							</div>
							<div className="btn shown front">
								<button type="submit" onClick={() => setShow(false)} className="button">
									Login
								</button>
							</div>
						</div>
					</>
				)}
				{!show && (
					<>
						<h1 className="h1 hidden choose front">Que voulez vous acheter?</h1>
						<div className="btn hidden choose front">
							<button className="button hidden choose" onClick={() => showDrugs()}>
								Drogues
							</button>
						</div>
						<div className="btn hidden choose front">
							<button className="button hidden choose" onClick={() => showTools()}>
								Outils
							</button>
						</div>
						<header className="hidden header-hidden front" style={{ width: "95%", paddingTop: "25px" }}>
							<div className="header hidden drug">
								<h2>
									<a onClick={() => setShow(true)}>Marche noir</a>{" "}
									<span id="url">http://c6n6h22re8guhvmax.onion/drogues</span>
								</h2>
								<div className="header-spacing">
									<h3 className="connected">
										Vagos
										<a onClick={() => showConnect()}>
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
						<div className="page hidden drug" style={{ display: "flex !important" }}>
							<div className="left-content hidden drug">
								<div className="btn-tools-drugs front">
									<button className="button-selected hidden drug front">Drogues</button>
								</div>
								<div className="item-n-desc hidden drug">
									<div className="item-n-btn">
										<div className="item-container front">
											<i className="arrow right hidden drug" onClick={() => drugNext()}></i>
											<div className="item">
												<img
													id="drug-weed"
													className="img-item hidden drug front"
													src="img/weed1.webp"
													title="Paquet de weed 10g"
													alt="Paquet de weed 10g"></img>
											</div>
											<i className="arrow left hidden drug"></i>
										</div>
										<div className="btn-tools-drugs-buy hidden drug">
											<button className="button" onClick={() => showTimeDrugs()}>
												Acheter
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="right-content hidden drug front">
								<div className="btn-tools-drugs hidden drug">
									<button className="button" onClick={() => showTools()}>
										Outils
									</button>
								</div>
								<div className="desc-qnt-spacer">
									<div className="desc-container hidden drug">
										<div className="desc hidden drug">
											<h5>Paquet de weed 10 g</h5>
											<h4>Prix - 25 $</h4>
											<h4>Quantite - 10 g</h4>
											<h4>Cannabis 96% THC - FROM LA</h4>
										</div>
									</div>
									<div className="qnt-container hidden drug">
										<div className="qnt hidden drug">Quantite : 1</div>
									</div>
								</div>
							</div>
						</div>
						<div className="page-tools hidden tools">
							<div className="btn-container front tools hidden">
								<div className="btn-tools-drugs front tools">
									<button id="button-drugs" className="button" onClick={() => showDrugs()}>
										Drogues
									</button>
								</div>
								<div className="btn-tools-drugs hidden tools">
									<button className="button-selected hidden tools">Outils</button>
								</div>
							</div>
							<div className="item-n-desc front tools">
								<div className="item-n-btn">
									<div className="item-container hidden tools front">
										<i className="arrow right hidden tools"></i>
										<div className="item">
											<img
												className="img-item hidden tools front"
												src="img/lockpick.webp"
												title="Outil de crochetage"
												alt="Outil de crochetage"></img>
										</div>
										<i className="arrow left hidden tools"></i>
									</div>
									<div className="btn-tools-drugs hidden tools" style={{ paddingTop: "48px" }}>
										<button className="button" onClick={() => showTime()}>
											Acheter
										</button>
									</div>
								</div>
								<div className="desc-qnt-spacer hidden tools">
									<div className="desc-n-qnt">
										<div className="desc-container-tools hidden tools">
											<div className="desc">
												<h5>Outil de crochetage</h5>
												<h4>Quantite - 1</h4>
												<h4>Peut vous servir pour ouvrir une voiture.</h4>
											</div>
										</div>
										<div className="qnt-container-tools">
											<div className="qnt">Quantite : 1</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="btn-container front time-select hidden">
							<div className="btn-tools-drugs front time-select">
								<button id="button-drugs" className="button" onClick={() => showDrugs()}>
									Drogues
								</button>
							</div>
							<div className="btn-tools-drugs hidden time-select">
								<button id="button-tools" className="button hidden time-select" onClick={() => showTools()}>
									Outils
								</button>
							</div>
						</div>
						<div className="thanku hidden front thanks">
							<h1 className="h1 thanku front">Merci de votre achat.</h1>
							<p className="p thanku front" style={{ color: "white" }}>
								Vous obtiendrez plus de renseignements sur la livraison depuis votre telephone.
							</p>
							<p className="p thanku front">Votre commande est disponible dans un des vehicules ci-dessous. </p>
							<br />
							<ul className="thanku front">
								<li className="li">Bravdo Bison</li>
								<li className="li">Vapid Speedo</li>
								<li className="li">Declasse Granger</li>
							</ul>
							<div className="btn-ty">
								<button className="button thanku front">Fermer</button>
							</div>
						</div>
						<div className="time-container time-select hidden front">
							<div className="time" style={{ paddingTop: "50px" }}>
								<div className="time-col">
									<input className="time-selector" type="time" id="appt" name="appt" min="19:00" max="02:00" required />
									<div className="btn-time-container">
										<button className="btn-time time-select" onClick={() => showThanku()}>
											Commander
										</button>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default TabletteMain;
