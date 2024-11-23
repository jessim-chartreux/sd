import { isDev } from "./isDev";

export const postAsync = async (endpoint: string, data?: any) => {
	if (isDev) {
		return;
	}

	try {
		const result = await fetch("https://core/" + endpoint, {
			method: "POST",
			body: JSON.stringify(data),
		});

		return await result.json();
	} catch (error) {
		console.error(error);
	}
};
