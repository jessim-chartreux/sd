import { useEffect } from "react";
import { postAsync } from "../utils/postAsync";

export const useMouseWheel = () => {
	useEffect(() => {
		// listen for mouse wheel event, and send it to the server using postAsync
		// mouseUp and mouseDown are the only events that are sent to the server

		const onMouseWheel = (event: WheelEvent) => {
			if (event.deltaY > 0) {
				console.log("mouseDown");
				postAsync("mouseDown");
			} else {
				console.log("mouseUp");
				postAsync("mouseUp");
			}
		};
		document.addEventListener("wheel", onMouseWheel);
		return () => document.removeEventListener("wheel", onMouseWheel);
	});
};
