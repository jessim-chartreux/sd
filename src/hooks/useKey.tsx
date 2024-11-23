import { useEffect } from "react";

export const useKey = (keyName, callback) => {
	useEffect(() => {
		const onKeyPressed = (event: KeyboardEvent) => {
			if (event.key === keyName) {
				callback();
			}
		};
		document.addEventListener("keyup", onKeyPressed);
		return () => document.removeEventListener("keyup", onKeyPressed);
	});
};
