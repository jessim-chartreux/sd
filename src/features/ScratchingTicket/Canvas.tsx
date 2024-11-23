import React, { useEffect, useMemo, useRef } from "react";

import sound from "../../scratching.mp3";

const Canvas: React.FC = (props: any) => {
	const audio = useMemo(() => new Audio(sound), []);
	audio.volume = 0.15;

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const isDragging = useRef(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		// Set the canvas background color only once
		ctx.fillStyle = "#807c79";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		const scratch = (x: number, y: number) => {
			ctx.globalCompositeOperation = "destination-out";
			ctx.beginPath();
			ctx.arc(x, y, 10, 0, Math.PI * 2);
			ctx.fill();
			ctx.globalCompositeOperation = "source-over"; // Reset to default
		};

		const handleMouseDown = (e: MouseEvent) => {
			isDragging.current = true;
			scratch(e.offsetX, e.offsetY);
			audio.play();
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (isDragging.current) {
				scratch(e.offsetX, e.offsetY);
				audio.play();
			}
		};

		const handleMouseUp = () => {
			isDragging.current = false;
			audio.pause();
		};

		const handleMouseLeave = () => {
			isDragging.current = false;
			audio.pause();
		};

		// Attach event listeners
		canvas.addEventListener("mousedown", handleMouseDown);
		canvas.addEventListener("mousemove", handleMouseMove);
		canvas.addEventListener("mouseup", handleMouseUp);
		canvas.addEventListener("mouseleave", handleMouseLeave);

		// Cleanup event listeners on component unmount
		return () => {
			canvas.removeEventListener("mousedown", handleMouseDown);
			canvas.removeEventListener("mousemove", handleMouseMove);
			canvas.removeEventListener("mouseup", handleMouseUp);
			canvas.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [audio]); // Empty dependency array to run only once

	return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
