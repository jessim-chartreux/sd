import { useEffect } from "react";
import { focusOut } from "../utils/focus";

export const useExitKeys = () => {
	useEffect(() => {
		const onKeyPressed = (event: KeyboardEvent) => {
			console.log("key pressed", event.key);
			if (event.key === "Escape") {
				window.postMessage({ type: "closeWebview" }, "*");
				focusOut();
			}
		};
		document.addEventListener("keyup", onKeyPressed);
		return () => document.removeEventListener("keyup", onKeyPressed);
	});
};

export const close = () => {
	window.postMessage({ type: "closeWebview" }, "*");
	focusOut();
};
