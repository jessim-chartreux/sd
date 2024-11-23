import React from "react";

import "../tablette.scss";

const Thanku: React.FC = () => {
	return (
		<div className="body">
			<div className="main">
				<h1 className="h1">Merci de votre achat.</h1>
				<p className="p" style={{ color: "white" }}>
					Vous obtiendrez plus de renseignements sur la livraison depuis votre telephone.
				</p>
				<p className="p">Votre commande est disponible dans un des vehicules ci-dessous. </p>
				<br />
				<ul>
					<li className="li">Bravdo Bison</li>
					<li className="li">Vapid Speedo</li>
					<li className="li">Declasse Granger</li>
				</ul>
				<div className="btn-ty">
					<button className="button">Fermer.</button>
				</div>
			</div>
		</div>
	);
};

export default Thanku;
