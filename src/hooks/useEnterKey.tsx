import { useEffect } from "react";

export const useEnterKey = callback => {
	useEffect(() => {
		const onKeyPressed = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				callback();
			}
		};
		document.addEventListener("keyup", onKeyPressed);
		return () => document.removeEventListener("keyup", onKeyPressed);
	});
};
