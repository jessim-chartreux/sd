import React, { useState } from "react";

const Button: React.FC<any> = ({ typesNames = ["", "", "", ""], value, setValue }) => {
	const [selected, setSelected] = useState(false);

	const onMouseUp = (_event: any) => {
		setSelected(false);
	};

	React.useEffect(() => {
		window.addEventListener("mouseup", onMouseUp);
		return () => window.removeEventListener("mouseup", onMouseUp);
	}, []);

	return (
		<div className="squares">
			{typesNames.map((typeName, index) => (
				<React.Fragment key={"square" + index}>
					{typeName && (
						<span className={(index === 0 ? "top" : index === 1 ? "right" : index === 2 ? "bottom" : "left") + " label"}>
							{typeName.toUpperCase()}
						</span>
					)}
				</React.Fragment>
			))}

			<div
				className="squares__wrapper"
				onMouseDown={() => setSelected(true)}
				onMouseMove={event => {
					if (selected) {
						let localX = event.clientX - event.currentTarget.getBoundingClientRect().left - 0.578125 + 1;
						let localY = event.clientY - event.currentTarget.getBoundingClientRect().top;

						if (localX < 0) localX = 0;
						if (localX > 140) localX = 140;
						if (localY < 0) localY = 0;
						if (localY > 140) localY = 140;
						setValue({ x: localX / 70 - 1, y: localY / 70 - 1 });
					}
				}}>
				<div className="quadrillage">
					<div className="bar" style={{ left: "25%" }}></div>
					<div className="bar" style={{ left: "50%" }}></div>
					<div className="bar" style={{ left: "75%" }}></div>
					<div className="line" style={{ top: "25%" }}></div>
					<div className="line" style={{ top: "50%" }}></div>
					<div className="line" style={{ top: "75%" }}></div>
				</div>
				{
					<div
						className="Cursor"
						style={{
							left: value.x * 70 + 70 - 3 + "px",
							top: value.y * 70 + 70 - 3 + "px",
						}}
					/>
				}
			</div>
		</div>
	);
};

export default Button;
