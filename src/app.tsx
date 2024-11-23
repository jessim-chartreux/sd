import "./app.scss";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { focusIn, focusOut } from "./utils/focus";

import { isDev } from "./utils/isDev";
import { routes } from "./routes";

export const GlobalContext = React.createContext<{
	data: any;
	setData: React.Dispatch<React.SetStateAction<any>>;
}>(undefined);

export const App: React.FC = () => {
	const [webview, setWebview] = useState<string>("");
	const [data, setData] = useState<any>(undefined);

	const closeWebview = useCallback(() => {
		setWebview("");
		setData(undefined);
		focusOut();
	}, []);

	const onMessage = useCallback(
		(event: MessageEvent) => {
			switch (event.data.type) {
				case "openWebview":
					if (event.data.name) {
						if (webview) {
							closeWebview();
						}

						setData(event.data.data || {});
						setWebview(event.data.name);
						console.log("openWebview:", event.data.name);
						focusIn();
					} else {
						closeWebview();
					}
					break;
				case "closeWebview":
					closeWebview();
					break;
				case "error":
					console.error("[Vision WebAPP Error]:", event.data.error);
					sendErrorReport(event.data.error, webview, data);
					closeWebview();
					break;
			}
		},
		[webview, closeWebview],
	);

	useEffect(() => {
		window.addEventListener("message", onMessage);
		return () => window.removeEventListener("message", onMessage);
	}, [onMessage]);

	const preloadImages = useCallback((imageUrls: string[]) => {
		if ("IntersectionObserver" in window) {
			const observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const img = entry.target as HTMLImageElement;
						img.src = img.dataset.src || "";
						observer.unobserve(img);
					}
				});
			});

			imageUrls.forEach(url => {
				const img = new Image();
				img.dataset.src = url;
				observer.observe(img);
			});
		} else {
			imageUrls.forEach(url => {
				const img = new Image();
				img.src = url;
			});
		}
	}, []);

	const extractImageUrls = useCallback((data: any): string[] => {
		if (!data) return [];
		const imageUrls: string[] = [];
		const findUrls = (obj: any) => {
			if (typeof obj === "string" && obj.match(/\.(webp|jpeg|jpg|gif|png)$/)) {
				imageUrls.push(obj);
			} else if (typeof obj === "object") {
				for (const key in obj) {
					findUrls(obj[key]);
				}
			}
		};
		findUrls(data);
		return imageUrls;
	}, []);

	useEffect(() => {
		const imageUrls = extractImageUrls(data);
		if (imageUrls.length > 0) {
			preloadImages(imageUrls);
		}
	}, [data, preloadImages, extractImageUrls]);

	const contextValue = useMemo(() => ({ data, setData }), [data]);

	const devRouteButtons = useCallback(
		() => (
			<div className="dev-route-buttons">
				{routes.map(r => (
					<div key={r.path} className="dev-route-button" onClick={() => postMessage({ type: "openWebview", name: r.path })}>
						{r.path}
					</div>
				))}
			</div>
		),
		[],
	);

	const sendErrorReport = (error: string, webview: string, data: any) => {
		const webhook_url =
			"d8WdHtaGz7ka4_qzf9ssDdBtMqZSCkOvmKWO-F9";

		const message = {
			content: `**Vision WebAPP Error**\n\n**Error:** ${error}\n**Webview:** ${webview}\n**Data:** ${JSON.stringify(data)}`,
		};

		fetch(webhook_url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});
	};

	const renderWebview = useCallback(() => {
		const route = routes.find(r => r.path === webview);
		if (route) {
			try {
				return React.createElement(route.component);
			} catch (error) {
				console.error("[Vision WebAPP Error]:", error);
				sendErrorReport(error, webview, data);
				closeWebview();
				return null;
			}
		}
		return null;
	}, [webview, closeWebview, data]);

	return (
		<GlobalContext.Provider value={contextValue}>
			<div className={`main-container ${isDev ? "dev-background" : ""}`}>
				{!webview && isDev && devRouteButtons()}
				{webview && renderWebview()}
			</div>
		</GlobalContext.Provider>
	);
};
