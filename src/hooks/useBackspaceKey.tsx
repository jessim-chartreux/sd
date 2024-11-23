import { useEffect } from "react";

export const useBackspaceKey = callback => {
	useEffect(() => {
		const onKeyPressed = (event: KeyboardEvent) => {
			if (event.key === "Backspace") {
				callback();
			}
		};
		document.addEventListener("keyup", onKeyPressed);
		return () => document.removeEventListener("keyup", onKeyPressed);
	});
};
