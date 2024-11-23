import "./style.scss";
import "react-circular-progressbar/dist/styles.css";

import React, { useContext, useState } from "react";

import Button from "../../components/UI/Button/Buttton";
import { GlobalContext } from "../../app";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

const MenuPostOp: React.FC = () => {
	const [tab, setTab] = useState("commandes");
	const context = useContext(GlobalContext);
	const [opened, setOpened] = useState(null);
	useExitKeys();

	const data: any = isDev
		? {
				headerImage: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/header.webp",
				orders: [
					{
						id: 1,
						state: "awaiting",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Burger du bled",
								quantity: 30,
							},
							{
								id: 1,
								name: "Burger du bled",
								quantity: 30,
							},
							{
								id: 1,
								name: "Burger du bled",
								quantity: 30,
							},
							{
								id: 1,
								name: "Burger du bled",
								quantity: 30,
							},
							{
								id: 1,
								name: "Burger du bled",
								quantity: 30,
							},
							{
								id: 1,
								name: "Burger du bled",
								quantity: 30,
							},
							{
								id: 1,
								name: "Burger du bled",
								quantity: 30,
							},
							{
								id: 1,
								name: "Burger du bled",
								quantity: 30,
							},
							{
								id: 2,
								name: "Wrap Marine",
								quantity: 30,
							},
							{
								id: 3,
								name: "Wrap Marine",
								quantity: 30,
							},
							{
								id: 4,
								name: "Wrap Marine",
								quantity: 30,
							},
							{
								id: 5,
								name: "Wrap Marine",
								quantity: 30,
							},
							{
								id: 6,
								name: "Wrap Marine",
								quantity: 30,
							},
							{
								id: 7,
								name: "Wrap Marine",
								quantity: 30,
							},
							{
								id: 8,
								name: "Wrap Marine",
								quantity: 30,
							},
							{
								id: 9,
								name: "Wrap Marine",
								quantity: 30,
							},
							{
								id: 10,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
					{
						id: 2,
						state: "awaiting",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
					{
						id: 3,
						state: "awaiting",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
					{
						id: 4,
						state: "awaiting",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
					{
						id: 5,
						state: "awaiting",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
					{
						id: 6,
						state: "awaiting",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
					{
						id: 7,
						state: "awaiting",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
					{
						id: 8,
						state: "awaiting",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
					{
						id: 9,
						state: "awaiting",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
					{
						id: 10,
						state: "awaiting",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
					{
						id: 11,
						state: "awaiting",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
					{
						id: 12,
						state: "awaiting",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
					{
						id: 13,
						state: "awaiting",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
					{
						id: 14,
						state: "canceled",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
					{
						id: 15,
						state: "delivered",
						from: "BURGER SHOT",
						phone: "555-4592",
						icon: "https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/food.webp",
						content: [
							{
								id: 1,
								name: "Wrap Marine",
								quantity: 30,
							},
						],
					},
				],
			}
		: context.data;

	const getColor = (state: string) => {
		switch (state) {
			case "awaiting":
				return "yellow";
			case "delivered":
				return "green";
			case "canceled":
				return "darkred";
			default:
				return "blue";
		}
	};

	const getState = (state: string) => {
		switch (state) {
			case "awaiting":
				return "EN COURS";
			case "delivered":
				return "LIVRÉ";
			case "canceled":
				return "ANNULÉ";
			default:
				return "INCONNU";
		}
	};

	return (
		<div className="MenuPostOp">
			<div className="Header">
				<img src={data.headerImage} />
				<div className="Title">GESTION DE STOCK</div>
				<div className="SubTitle">POST OP</div>
			</div>
			<div className="TabSelection">
				<div
					className={"Tab" + (tab === "commandes" ? " selected" : "")}
					onClick={() => setTab("commandes")}
					style={{
						width: 100 / 3 + "%",
					}}>
					Commandes
				</div>
				<div
					className={"Tab" + (tab === "gestion" ? " selected" : "")}
					onClick={() => setTab("gestion")}
					style={{
						width: 100 / 3 + "%",
					}}>
					Gestion
				</div>
				<div
					className={"Tab" + (tab === "historique" ? " selected" : "")}
					onClick={() => setTab("historique")}
					style={{
						width: 100 / 3 + "%",
					}}>
					Historique
				</div>
			</div>
			{tab === "commandes" && (
				<div className="TabContent">
					{data.orders
						.filter((order: any) => order.state === "awaiting")
						.map((order: any) => {
							const _open = order.id === opened;
							return (
								<div
									className="Container"
									key={"Line" + order.id}
									style={
										_open
											? {
													minHeight: 140,
													height: 140,
													background: "rgba(94, 108, 182, 0.5)",
												}
											: {}
									}>
									<div className="OrderLine">
										{!_open && (
											<>
												<img src={order.icon} className="Icon" />
												<div className="Name">{order.from}</div>
											</>
										)}
										<div className="Buttons" style={_open ? { marginLeft: 10, marginTop: 4 } : {}}>
											<img
												src="https://cdn.sacul.cloud/v2/vision-cdn/MenuPostOp/arrow.webp"
												className="Arrow"
												style={
													_open
														? {
																right: 240,
																transform: "rotate(-90deg)",
															}
														: {}
												}
											/>
											<Button
												color="green"
												fontWeight={700}
												fontSize={10}
												label={
													_open
														? `DÉTAILS DE LA COMMANDE\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0`
														: `DÉTAILS\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0`
												}
												width={_open ? 180 : 85}
												height={20}
												callback={() => {
													setOpened(_open ? null : order.id);
												}}
											/>
										</div>
									</div>
									{_open && (
										<>
											<div
												className="Infos A-FadeIn"
												style={{
													animationDelay: "0.3s",
												}}>
												<div className="Big">{order.from}</div>
												<div className="Phone">{order.phone}</div>
												<div className="TotalTitle">Total :</div>
												<div className="Total">{order.totalprice}$</div>
											</div>
											<div
												className="OrderContent A-FadeIn"
												style={{
													animationDelay: "0.3s",
												}}>
												{order.content.map((content: any, index: number) => (
													<div className="Content" key={order.id + "-" + index}>
														<div className="Span">{content.quantity}</div> {content.name.toUpperCase()}
													</div>
												))}
											</div>
										</>
									)}
								</div>
							);
						})}
				</div>
			)}
			{tab === "gestion" && (
				<div className="TabContent">
					{data.orders
						.filter((order: any) => order.state === "awaiting")
						.map((order: any) => (
							<div className="Container" key={"Line" + order.id}>
								<div className="OrderLine" key={"Line" + order.id}>
									<img src={order.icon} className="Icon" />
									<div className="Name">{order.from}</div>

									<div className="Buttons">
										<Button
											color="green"
											fontWeight={700}
											fontSize={12}
											label="LIVRÉ"
											width={85}
											height={20}
											callback={() => postAsync("PostOp", { type: "orderDelivered", order })}
										/>
										<Button
											color="darkred"
											fontWeight={700}
											fontSize={12}
											label="ANNULÉ"
											width={85}
											height={20}
											callback={() => postAsync("PostOp", { type: "orderCanceled", order })}
										/>
									</div>
								</div>
							</div>
						))}
				</div>
			)}
			{tab === "historique" && (
				<div className="TabContent">
					{data.orders.map((order: any) => (
						<div className="Container" key={"Line" + order.id}>
							<div className="OrderLine" key={"Line" + order.id}>
								<img src={order.icon} className="Icon" />
								<div className="Name">{order.from}</div>
								<div className="Buttons">
									<Button
										color={getColor(order.state)}
										fontWeight={700}
										fontSize={12}
										label={getState(order.state)}
										width={85}
										height={20}
										readOnly={true}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MenuPostOp;
