import React from "react";

import "../tablette.scss";

const Preloader: React.FC = () => {
	return (
		<div className="body">
			<div className="preloader-1 preloader">
				<div className="preloader-text">Chargement...</div>
				<br />
				<span className="line line-1"></span>
				<span className="line line-2"></span>
				<span className="line line-3"></span>
				<span className="line line-4"></span>
				<span className="line line-5"></span>
				<span className="line line-6"></span>
				<span className="line line-7"></span>
				<span className="line line-8"></span>
				<span className="line line-9"></span>
				<span className="line line-10"></span>
				<span className="line line-11"></span>
				<span className="line line-12"></span>
				<span className="line line-13"></span>
			</div>
		</div>
	);
};

export default Preloader;
