import React, { useState } from "react";
import { useExitKeys } from "../../hooks/useExitKeys";

import Tools from "./web/tools";
import Drugs from "./web/drugs";
import Choose from "./web/choose";
import Preloader from "./web/preloader";
import Reset from "./web/reset";
import Time from "./web/time";
import Time2 from "./web/time2";
import Time3 from "./web/time3";
import Mins from "./web/mins";
import Hours from "./web/hours";
import TabletteMain from "./web/tablette";
import Thanku from "./web/thanku";

const Tablette: React.FC = () => {
	useExitKeys();

	const [state, setState] = useState<
		"tablette" | "tools" | "drugs" | "choose" | "preloader" | "reset" | "time" | "time2" | "time3" | "mins" | "hours" | "thanku"
	>("tablette");

	return (
		<>
			{state === "tablette" && <TabletteMain onChange={setState} />}
			{state === "tools" && <Tools onChange={setState} />}
			{state === "drugs" && <Drugs onChange={setState} />}
			{state === "choose" && <Choose onChange={setState} />}
			{state === "preloader" && <Preloader />}
			{state === "reset" && <Reset onChange={setState} />}
			{state === "time" && <Time onChange={setState} />}
			{state === "time2" && <Time2 onChange={setState} />}
			{state === "time3" && <Time3 onChange={setState} />}
			{state === "mins" && <Mins onChange={setState} />}
			{state === "hours" && <Hours onChange={setState} />}
			{state === "thanku" && <Thanku />}
		</>
	);
};

export default Tablette;
