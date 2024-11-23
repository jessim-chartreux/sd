import "./bagInHead.scss";

import React, { useContext } from "react";

import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";

interface IBagInHead {
	opacity?: number;
}

const BagInHead: React.FC = () => {
	const context = useContext(GlobalContext);

	const data: IBagInHead | null = isDev
		? {
				opacity: 1,
			}
		: (context.data as IBagInHead);

	return (
		<html>
			<head>
				<meta />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title></title>
				<link href="styles.css" rel="stylesheet" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700&display=swap" rel="stylesheet"></link>
			</head>
			<body>
				<div className="head_bag_background" style={{ opacity: data.opacity }}>
					<div className="head_bag_text">Vous avez un sac sur la tête ...</div>
				</div>
			</body>
		</html>
	);
};

export default BagInHead;
