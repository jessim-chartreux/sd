import clsx from "clsx";
import React from "react";

const MenuField: React.FC<any> = ({ fieldName, className, children }) => {
	const _classx = clsx("field__content", className);

	return (
		<div className="menu__field">
			<span className="field__name">{fieldName}</span>
			<div className={_classx}>{children}</div>
		</div>
	);
};

export default MenuField;
