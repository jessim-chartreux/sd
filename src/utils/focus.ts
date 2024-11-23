import { postAsync } from "./postAsync";

export function focusOut() {
	postAsync(`focusOut`);
}

export function focusIn() {
	postAsync(`focusIn`);
}
