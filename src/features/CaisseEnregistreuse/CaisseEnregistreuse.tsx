// Style
import "./index.scss";

import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../app";
// Temp img import
import { isDev } from "../../utils/isDev";
import loop from "./loop.webp";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

// Types
type Society = {
	name: string;
	id: string;
	image: string;
};

type Product = {
	id: string;
	name: string;
	image: string;
	price: number;
	quantity: number;
};

type Context = {
	source: number;
	firstname: string;
	lastname: string;
	permission: number;
	society: Society;
	products: Product[];
};

// Export
const CaisseEnregistreuse: React.FC = () => {
	useExitKeys();
	const context = useContext(GlobalContext);
	context ? console.log("context found") : console.log("context not found");
	const data: any | null = isDev
		? {
				source: 69,
				firstname: "Carlos",
				lastname: "Rodriguez",
				permission: 0,
				society: {
					name: "Zizi Café",
					id: "uwu",
					image: "",
				},
				products: [
					{
						id: "pepsi",
						name: "Pepsi",
						image: "https://media.discordapp.net/attachments/1208060961404092507/1225850114468479006/Hamburger_2.webp?ex=6622a0e2&is=66102be2&hm=a9475dbd96269af754dd054dadb5fc367d795dbd10032b9b7d9ac295002bceb3&=&format=webp&quality=lossless",
						price: 2.5,
						quantity: 1,
					},
					{
						id: "coca",
						name: "Coca Cola",
						image: "https://media.discordapp.net/attachments/1208060961404092507/1225850114468479006/Hamburger_2.webp?ex=6622a0e2&is=66102be2&hm=a9475dbd96269af754dd054dadb5fc367d795dbd10032b9b7d9ac295002bceb3&=&format=webp&quality=lossless",
						price: 3.5,
						quantity: 1,
					},
					{
						id: "doubleburger",
						name: "Double Hamburguer",
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1225850042770919665/Hamburger_1.webp?ex=6622a0d1&is=66102bd1&hm=7ef2de0ded43e3bd5538a906ee3e5fec1ba8c0e36b0efb373e6ecce40796536b&",
						price: 6.0,
						quantity: 1,
					},
					{
						id: "burger",
						name: "Burger",
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1225850042770919665/Hamburger_1.webp?ex=6622a0d1&is=66102bd1&hm=7ef2de0ded43e3bd5538a906ee3e5fec1ba8c0e36b0efb373e6ecce40796536b&",
						price: 5.0,
						quantity: 1,
					},
					{
						id: "fries",
						name: "Frites",
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1225849956657533011/Hamburger.webp?ex=6622a0bc&is=66102bbc&hm=ca2e9600809a41cf2687e6d1d37ac57e6e4e72b38e5522e294bfbac4f7e003e5&",
						price: 4.0,
						quantity: 1,
					},
					{
						id: "pepsi1",
						name: "Pepsi",
						image: "https://media.discordapp.net/attachments/1208060961404092507/1225850114468479006/Hamburger_2.webp?ex=6622a0e2&is=66102be2&hm=a9475dbd96269af754dd054dadb5fc367d795dbd10032b9b7d9ac295002bceb3&=&format=webp&quality=lossless",
						price: 2.5,
						quantity: 1,
					},
					{
						id: "coca1",
						name: "Coca Cola",
						image: "https://media.discordapp.net/attachments/1208060961404092507/1225850114468479006/Hamburger_2.webp?ex=6622a0e2&is=66102be2&hm=a9475dbd96269af754dd054dadb5fc367d795dbd10032b9b7d9ac295002bceb3&=&format=webp&quality=lossless",
						price: 3.5,
						quantity: 1,
					},
					{
						id: "doubleburger1",
						name: "Double Hamburguer",
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1225850042770919665/Hamburger_1.webp?ex=6622a0d1&is=66102bd1&hm=7ef2de0ded43e3bd5538a906ee3e5fec1ba8c0e36b0efb373e6ecce40796536b&",
						price: 6.0,
						quantity: 1,
					},
					{
						id: "burger1",
						name: "Burger",
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1225850042770919665/Hamburger_1.webp?ex=6622a0d1&is=66102bd1&hm=7ef2de0ded43e3bd5538a906ee3e5fec1ba8c0e36b0efb373e6ecce40796536b&",
						price: 5.0,
						quantity: 1,
					},
					{
						id: "fries1",
						name: "Frites",
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1225849956657533011/Hamburger.webp?ex=6622a0bc&is=66102bbc&hm=ca2e9600809a41cf2687e6d1d37ac57e6e4e72b38e5522e294bfbac4f7e003e5&",
						price: 4.0,
						quantity: 1,
					},
					{
						id: "pepsi2",
						name: "Pepsi",
						image: "https://media.discordapp.net/attachments/1208060961404092507/1225850114468479006/Hamburger_2.webp?ex=6622a0e2&is=66102be2&hm=a9475dbd96269af754dd054dadb5fc367d795dbd10032b9b7d9ac295002bceb3&=&format=webp&quality=lossless",
						price: 2.5,
						quantity: 1,
					},
					{
						id: "coca2",
						name: "Coca Cola",
						image: "https://media.discordapp.net/attachments/1208060961404092507/1225850114468479006/Hamburger_2.webp?ex=6622a0e2&is=66102be2&hm=a9475dbd96269af754dd054dadb5fc367d795dbd10032b9b7d9ac295002bceb3&=&format=webp&quality=lossless",
						price: 3.5,
						quantity: 1,
					},
					{
						id: "doubleburger2",
						name: "Double Hamburguer",
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1225850042770919665/Hamburger_1.webp?ex=6622a0d1&is=66102bd1&hm=7ef2de0ded43e3bd5538a906ee3e5fec1ba8c0e36b0efb373e6ecce40796536b&",
						price: 6.0,
						quantity: 1,
					},
					{
						id: "burger2",
						name: "Burger",
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1225850042770919665/Hamburger_1.webp?ex=6622a0d1&is=66102bd1&hm=7ef2de0ded43e3bd5538a906ee3e5fec1ba8c0e36b0efb373e6ecce40796536b&",
						price: 5.0,
						quantity: 1,
					},
					{
						id: "fries2",
						name: "Frites",
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1225849956657533011/Hamburger.webp?ex=6622a0bc&is=66102bbc&hm=ca2e9600809a41cf2687e6d1d37ac57e6e4e72b38e5522e294bfbac4f7e003e5&",
						price: 4.0,
						quantity: 1,
					},
					{
						id: "coca3",
						name: "Coca Cola",
						image: "https://media.discordapp.net/attachments/1208060961404092507/1225850114468479006/Hamburger_2.webp?ex=6622a0e2&is=66102be2&hm=a9475dbd96269af754dd054dadb5fc367d795dbd10032b9b7d9ac295002bceb3&=&format=webp&quality=lossless",
						price: 3.5,
						quantity: 1,
					},
					{
						id: "doubleburger3",
						name: "Double Hamburguer",
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1225850042770919665/Hamburger_1.webp?ex=6622a0d1&is=66102bd1&hm=7ef2de0ded43e3bd5538a906ee3e5fec1ba8c0e36b0efb373e6ecce40796536b&",
						price: 6.0,
						quantity: 1,
					},
					{
						id: "burger3",
						name: "Burger",
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1225850042770919665/Hamburger_1.webp?ex=6622a0d1&is=66102bd1&hm=7ef2de0ded43e3bd5538a906ee3e5fec1ba8c0e36b0efb373e6ecce40796536b&",
						price: 5.0,
						quantity: 1,
					},
					{
						id: "fries3",
						name: "Frites",
						image: "https://cdn.discordapp.com/attachments/1208060961404092507/1225849956657533011/Hamburger.webp?ex=6622a0bc&is=66102bbc&hm=ca2e9600809a41cf2687e6d1d37ac57e6e4e72b38e5522e294bfbac4f7e003e5&",
						price: 4.0,
						quantity: 1,
					},
				],
			}
		: context.data;

	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

	const [reduction, setReduction] = useState<number>(0);

	const [search, setSearch] = useState<string>("");

	const handleProductAdd = (product: Product) => {
		const productIndex = selectedProducts.findIndex(p => p.id === product.id);
		if (productIndex === -1) {
			setSelectedProducts([...selectedProducts, product]);
		} else {
			const newSelectedProducts = [...selectedProducts];
			newSelectedProducts[productIndex].quantity += 1;
			setSelectedProducts(newSelectedProducts);
		}
	};

	const handleFacturation = () => {
		if (selectedProducts.length === 0) return;

		postAsync("caisseFacturer", {
			selectedProducts,
			reduction,
			total: calcTotal(),
		});
	};

	const calcReduction = (value: number) => {
		console.log("VALUE", value);

		if (isNaN(value)) {
			return setReduction(0);
		}

		if (value < 0) {
			setReduction(0);
		} else if (value > 100) {
			setReduction(100);
		} else {
			setReduction(value);
		}
	};

	const calcTotal = () => {
		if (selectedProducts.length === 0) return 0;

		if (reduction === 0) {
			return selectedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
		} else {
			return (selectedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0) * (1 - reduction / 100)).toFixed(
				2,
			);
		}
	};

	useEffect(() => {
		const onKeyPressed = (e: KeyboardEvent) => {
			if (e.key === "e") {
				handleFacturation();
			}
		};
		document.addEventListener("keydown", onKeyPressed);
		return () => document.removeEventListener("keydown", onKeyPressed);
	});

	return (
		<div className="CaisseEnregistreuse">
			<div className="Header">
				<img src={data.society.image} alt={data.society.id} />
				<div className="Header-Info">
					<h1>{data.society.name}</h1>
					<h2>
						Employé: {data.firstname} {data.lastname}
					</h2>
				</div>
			</div>
			<div className="Content">
				<div className="Order">
					<h1>Commande en cours</h1>
					<div className="Order-Products">
						{selectedProducts.map(product => (
							<div key={product.id} className="Order-Product">
								<input
									type="number"
									value={product.quantity}
									min={1}
									onChange={e => {
										const newQuantity = parseInt(e.target.value);

										if (newQuantity < 1) {
											return;
										}

										setSelectedProducts(
											selectedProducts.map(p => (p.id === product.id ? { ...p, quantity: newQuantity } : p)),
										);
									}}
								/>
								<div>
									<span className="Order-Product-Name">{product.name}</span>
									<span className="Order-Product-Price">${product.price * product.quantity}</span>
								</div>
								<span
									className="Order-Product-Remove"
									onClick={() => setSelectedProducts(selectedProducts.filter(p => p.id !== product.id))}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-x"
										viewBox="0 0 16 16">
										<path
											fillRule="evenodd"
											d="M8 9.414l4.95 4.95-1.414 1.414L6.586 10 1.636 14.95.222 13.536 5.172 8 0 2.828 1.414 1.414 6.586 6.586 11.95 1.222 13.364 2.636 8 8.002 12.95 13.364 11.536 11.95 6.586 6.586 1.414 1.414z"
										/>
									</svg>
								</span>
							</div>
						))}
					</div>
				</div>
				<div className="Products">
					<h1>Produits</h1>
					<div className="Products-input">
						<div className="Products-input-imgbox">
							<img src={loop} alt="" className="Products-input-imgbox-img" />
						</div>
						<input value={search} type="text" className="Products-input-text" onChange={e => setSearch(e.target.value)} />
					</div>
					<div className="Products-List">
						{data.products
							.filter(item => {
								console.log(item.name.toLowerCase(), search.toLowerCase());
								return item.name.toLowerCase().includes(search.toLowerCase());
							})
							.map(product => (
								<div
									key={product.id}
									className="Product"
									style={{ backgroundImage: `url(${product.image})` }}
									onClick={() => handleProductAdd(product)}>
									<h2>{product.name}</h2>
									<h3>${product.price}</h3>
								</div>
							))}
					</div>
				</div>
			</div>
			<div className="Footer">
				<div className="Left">
					<div className="Footer-Reduction">
						<h1>Remise</h1>
						<div className="Footer-Reduction-Input">
							<input
								type="number"
								min={0}
								max={100}
								value={reduction}
								onChange={e => calcReduction(parseInt(e.target.value))}
							/>
							<span>%</span>
						</div>
					</div>
					<div className="Footer-Total">
						<h1 className="Title">Total</h1>
						<h1 className="Amount">${calcTotal()}</h1>
					</div>
					<button onClick={() => handleFacturation()} className="Footer-Validate-Command">
						<h1>E</h1>
						<span>FACTURER</span>
					</button>
				</div>
				<div className="Right"></div>
			</div>
		</div>
	);
};

export default CaisseEnregistreuse;
