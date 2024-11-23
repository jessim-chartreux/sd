// useChangesWebview.tsx

export const changeWebview = (name: string, data?: any) => {
	window.postMessage({ type: "openWebview", name, data }, "*");
};
