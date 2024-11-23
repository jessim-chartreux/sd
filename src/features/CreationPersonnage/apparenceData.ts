export const VisageMenuData = [
	{
		name: "PILOSITÉ",
		items: [
			{
				name: "cheveux",
				id: "hair",
				choices: ["items", "color1", "color2"],
			},
			{
				name: "barbe",
				id: "beard",
				choices: ["items", "color1", "opacity"],
				hideOnWoman: true,
			},
			{
				name: "sourcils",
				id: "sourcils",
				choices: ["items", "color1", "color2", "opacity"],
			},
			{
				name: "pilosité",
				id: "pilosite",
				choices: ["items", "color1", "opacity"],
				hideOnWoman: true,
			},
		],
	},
	{
		name: "yeux",
		items: [
			{
				name: "couleurs",
				id: "eyes",
				choices: ["color1"],
			},
		],
	},
	{
		name: "maquillage",
		items: [
			{
				name: "maquillage pour les yeux",
				id: "eyesmaquillage",
				choices: ["items", "color1", "color2", "opacity"],
			},
			{
				name: "fard à joues",
				id: "fard",
				choices: ["items", "color1", "opacity"],
			},
			{
				name: "rouge à lèvres",
				id: "rougealevre",
				choices: ["items", "color1", "opacity"],
			},
		],
	},
	{
		name: "détails",
		items: [
			{
				name: "tâches cutanées",
				id: "taches",
				choices: ["items", "opacity"],
			},
			{
				name: "marques de la peau",
				id: "marques",
				choices: ["items", "opacity"],
			},
			{
				name: "acné",
				id: "acne",
				choices: ["items", "opacity"],
			},
			{
				name: "cicatrice",
				id: "cicatrice",
				choices: ["items", "opacity"],
			},
			{
				name: "teint",
				id: "teint",
				choices: ["items", "opacity"],
			},
			{
				name: "tâches de rousseur",
				id: "rousseur",
				choices: ["items", "opacity"],
			},
		],
	},
];
