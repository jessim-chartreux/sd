import React, { useContext } from "react";

import { GlobalContext } from "../../app";
import LoadingBar from "../../components/loadingBar";
import { isDev } from "../../utils/isDev";

const MedicalBed: React.FC = () => {
	const context = useContext(GlobalContext);

	const data = isDev
		? {
				firstname: "Chris",
				lastname: "Coleman",
				time: "10",
				icon: "heart",
				color: "#33963C",
				// color: "#334A96",
				// color: "#963333",
				// color: "#ffffff",
				postAsync: {
					url: "core:medicalBed:heal",
					data: {},
				},
			}
		: context.data;

	return (
		<LoadingBar
			time={data.time}
			icon={data.icon}
			color={data.color}
			postAsync={data.postAsync ? data.postAsync : undefined}
			placement="center">
			{data.firstname} <span>{data.lastname}</span>
		</LoadingBar>
	);
};

export default MedicalBed;
