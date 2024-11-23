import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "./",
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
			},
		},
	},
	build: {
		chunkSizeWarningLimit: 2000,
		outDir: "./dist",
		assetsDir: ".",
		rollupOptions: {
			output: {
				manualChunks: {
					react: ["react", "react-dom", "react-error-boundary"],
					jsoneditor: ["jsoneditor"],
					bootstrap: ["bootstrap", "react-bootstrap"],
					mui: ["@mui/material", "@mui/icons-material", "@mui/styled-engine-sc"],
				},
			},
			//external: ["styled-components"],
		},
	},
	optimizeDeps: {
		include: ["react", "react-dom", "jsoneditor"],
	},
});
