import React from "react";

export default React.createContext<any>({
	current: 0,
	data: {},
	setData: a => {},
	canContinue: false,
	setCanContinue: a => {},
	hidden: false,
	hidden2: false,
	setHidden: a => {},
	setCurrent: a => {},
	setHidden2: a => {},
	catalogue: [],
	dataButtons: [],
	peds: [],
	pedsVariantes: [],
	hideItemList: [],
	premium: false,
});
