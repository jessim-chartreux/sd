import React, { useState } from "react";
import "./BoutiqueVehicules.scss";
import "./ColorPalette.scss";

import { Vehicules } from "./Components/Vehicules";
import { Nautic } from "./Components/Nautic";
import { Air } from "./Components/Air";

const BoutiqueVehicules: React.FC = () => {
	const [type, setType] = useState<"vehicules" | "nautic" | "air">("vehicules");

	const handleTypeChange = (type: "vehicules" | "nautic" | "air") => {
		setType(type);
	};

	return (
		<>
			{type === "vehicules" && <Vehicules onTypeChange={handleTypeChange} />}
			{type === "nautic" && <Nautic onTypeChange={handleTypeChange} />}
			{type === "air" && <Air onTypeChange={handleTypeChange} />}
		</>
	);
};

export default BoutiqueVehicules;
