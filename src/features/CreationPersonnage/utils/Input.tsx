import React from "react";

const Input: React.FC<any> = ({ label, value, setValue, onBlur }) => {
	return (
		<div style={{ display: " flex", flexDirection: "column" }} className="input__wrapper">
			{label && <label>{label}</label>}
			<input value={value} onChange={e => setValue(e.currentTarget.value)} onBlur={onBlur} type="text" />
		</div>
	);
};

export default Input;
