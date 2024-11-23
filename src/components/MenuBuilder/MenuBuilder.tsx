import "./style.scss";

import React, { useContext, useEffect, useState } from "react";

import Button from "../UI/Button/Buttton";
import { GlobalContext } from "../../app";
import { ReactSVG } from "react-svg";
import canap from "./canap.webp";
import frame from "./frame.webp";
import plant from "./plant.webp";
import { playOnHoverSound } from "../../utils/sounds";
import { postAsync } from "../../utils/postAsync";
import search from "./search.webp";
import { setArrayLength } from "../../utils/utils";
import { useEnterKey } from "../../hooks/useEnterKey";

export interface IMenuBuilderListElement {
	name?: string;
	id?: number;
	image?: string;
	price?: number;
	onClickCallback?: Function;
	isPlaceholder?: boolean;
	isNew?: boolean;
}

export interface IMenuBuilderCategoryElement {
	name?: string;
	elements?: IMenuBuilderListElement[];
	minimumElements?: number;
	onClickCallback?: Function;
}

export interface IMenuBuilderButtonElement {
	name?: string;
	subName?: string;
	image?: string;
	width?: "full" | "half";
	onClickCallback?: Function;
	hoverStyle?: string;
	type?: string;
}

export interface IMenuBuilderProps {
	tabs?: Array<{
		name?: string;
		elements: IMenuBuilderListElement[] | IMenuBuilderCategoryElement[] | IMenuBuilderButtonElement[];
		minimumElements?: number;
		onClickCallback?: Function;
		type: "categories" | "elements" | "buttons" | "shop";
		variation?: string;
	}>;
	headerImageCallback?: Function;
	headerImage: string;
	headerIcon: string;
	headerIconName: string;
	finalSubmit?: {
		onCancel: Function;
		onSubmit: Function;
		cancelLabel: string;
		submitLabel: string;
		item: {
			label: string;
			image: string;
		};
	};
	forceBoutiqueHeader?: boolean;
	stockage?: {
		[key: string]: {
			set: Function;
			get: any;
		};
	};
	selected?: any;
	selectedParent?: any;
	submitButton?: {
		onClickCallback: Function;
		label: string;
		color?: string;
		input?: {
			isInput?: boolean;
			onChange?: Function;
			onSubmit?: Function;
			placeholder?: string;
			onBlur?: Function;
			value?: string;
		};
		customVisu?: any;
		icon?: string;
		disabled?: boolean;
		disabledType?: string;
	};
	progressBar?: {
		current: number;
		elements: Array<{
			name: string;
		}>;
	};
	style?: {
		height?: number;
		width?: number;
		overrideClassName?: {
			submitButton?: string;
			header?: string;
			main?: string;
		};
	};
	showTurnAroundButtons?: boolean;
	onTabChange?: Function;
	buttonAditionnalColor?: string;
	showValidationButtons?: boolean;
	isBoutique?: boolean;
	origin?: string;
}

const getCurrency = item => {
	if (!item.price && item?.price !== 0) return;
	return <div className="VisionMenu-currency">$</div>;
};

const MenuBuilder: React.FC<IMenuBuilderProps> = ({
	tabs,
	headerImage,
	headerIcon,
	headerIconName,
	submitButton,
	style,
	progressBar,
	finalSubmit,
	selected,
	headerImageCallback,
	showTurnAroundButtons,
	stockage,
	onTabChange,
	buttonAditionnalColor,
	showValidationButtons,
	isBoutique,
	selectedParent,
	forceBoutiqueHeader,
	origin,
}) => {
	const [currentTab, setCurrentTab] = useState(tabs?.[0] ?? null);
	const [spawnItem, setspawnItem] = useState("");
	const context = useContext(GlobalContext);
	useEffect(() => {
		document
			.querySelectorAll(".VisionMenu-buttonElement span")
			?.forEach(e => e.setAttribute("style", `color: ${buttonAditionnalColor ?? "white"}`));
	});

	useEffect(() => {
		setCurrentTab(tabs?.[0] ?? null);
	}, [tabs]);

	const openInNewTab = url => {
		window.open(url, "_blank", "noreferrer");
	};

	const processItems = (_items: IMenuBuilderListElement[], minimumElements: number) => {
		const items = [..._items];
		let a = items.length;
		if (currentTab.variation !== "no-image") {
			while (a % 3 !== 0) {
				items.push({ isPlaceholder: true });
				a = items.length;
			}
		} else {
			minimumElements = 0;
		}

		return (
			<div className={"VisionMenu-itemList " + currentTab.variation}>
				{(items.length >= minimumElements ? items : setArrayLength(items, minimumElements)).map((item, index) => (
					<div
						key={"key" + item?.id + index + item?.category + item?.subCategory}
						className={
							item?.isPlaceholder
								? "VisionMenu-placeholder"
								: "VisionMenu-item " +
									((
										Array.isArray(selected)
											? selected.filter(_e => {
													const a = JSON.stringify(_e) === JSON.stringify(item);
													return a;
												}).length > 0
											: JSON.stringify(selected) === JSON.stringify(item)
									)
										? "selected"
										: "") +
									(item?.isPremium ? " premium" : "") +
									(item?.owned ? " owned" : "") +
									(item?.isNew ? " new" : "")
						}
						onClick={() => {
							if (item.onClickCallback) {
								item.onClickCallback();
							}
							if (!item?.isPlaceholder) playOnHoverSound();
						}}>
						{currentTab.variation === "no-image" && (
							<div className="VisionMenu-index">{item.price ? item.price + "$" : item?.id}</div>
						)}
						{!item?.isPlaceholder && (
							<>
								<img src={item.image} />
								{item.label && item.price ? (
									<React.Fragment>
										<div className={"VisionMenu-name "}>{item.label}</div>
										<div className={"price2 A-ScaleUp"} style={{ display: "none" }}>
											{item.price}
											{getCurrency(item)}
										</div>
									</React.Fragment>
								) : (
									<div className={"VisionMenu-name "}>
										{item.label ?? item.price}
										{getCurrency(item)}
									</div>
								)}
							</>
						)}

						{item?.isPlaceholder && (
							<>
								<div className={"VisionMenu-placeholder "}></div>
							</>
						)}
					</div>
				))}
			</div>
		);
	};

	useEnterKey(() => {
		if (origin === "decoration" && spawnItem != "") {
			console.log("Enter key");
			postAsync("spawnItemDecoration", spawnItem);
			setspawnItem("");
		}
	});

	const processShop = (items: IMenuBuilderListElement[], minimumElements: number) => {
		let a = items.length;
		while (a % 3 !== 0) {
			items.push({ isPlaceholder: true });
			a = items.length;
		}
		return (
			<div className="VisionMenu-itemList Shop">
				{(items.length >= minimumElements ? items : setArrayLength(items, minimumElements)).map((item, index) => (
					<div className="VisionMenu-shopItem">
						<div
							key={"key" + item?.id + index + item?.category + item?.subCategory}
							className={
								item?.isPlaceholder
									? "VisionMenu-placeholder"
									: "VisionMenu-item " + (JSON.stringify(selected) === JSON.stringify(item) ? "selected" : "")
							}
							onClick={() => {
								if (item.onClickCallback) {
									item.onClickCallback();
								}
							}}>
							{!item?.isPlaceholder && (
								<>
									<img src={item.image} />
									<div className={"VisionMenu-name "}>
										{item.label ?? item.price}
										{getCurrency(item)}
									</div>
								</>
							)}
							{item?.isPlaceholder && (
								<>
									<div className={"VisionMenu-placeholder "}></div>
								</>
							)}
						</div>
						{!item?.isPlaceholder && (
							<div className="Item" key={"ShopItem" + item.id}>
								<div className={"Input " + "Tab-" + currentTab.name}>
									<div className="Price">{item.secondaryLabel}</div>
									<div
										className="Button"
										onClick={() => {
											if (stockage[currentTab.name].get[item.id] > 0) {
												const _stockage = { ...stockage[currentTab.name].get };
												_stockage[item.id] -= 1;
												stockage[currentTab.name].set(_stockage);
											}
										}}>
										–
									</div>
									<input
										type="number"
										pattern="[0-9]*"
										value={stockage[currentTab.name].get[item.id]}
										onChange={ev => {
											const _stockage = { ...stockage[currentTab.name].get };
											_stockage[item.id] = Number(ev.currentTarget.value);
											stockage[currentTab.name].set(_stockage);
										}}
									/>
									<div
										className="Button"
										style={{
											fontSize: 18,
										}}
										onClick={() => {
											const _stockage = { ...stockage[currentTab.name].get };
											_stockage[item.id] += 1;
											stockage[currentTab.name].set(_stockage);
										}}>
										+
									</div>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		);
	};

	return (
		<>
			{showValidationButtons && (
				<div className="TurnAroundButton Validate">
					<div>
						ÉTAPE SUIVANTE<div className="Button">ENTRER</div>
					</div>
					<div>
						RETOUR<div className="Button">SUPPR</div>
					</div>
				</div>
			)}
			{!showValidationButtons && showTurnAroundButtons && (
				<div className="TurnAroundButton">
					<div>
						TOURNER VERS LA GAUCHE<div className="Button">A</div>
					</div>
					<div>
						TOURNER VERS LA DROITE<div className="Button">E</div>
					</div>
				</div>
			)}
			<div
				className="VisionMenu"
				style={{
					width: style?.width ?? 490,
					height: style?.height ?? "fit-content",
				}}>
				<div className={"VisionMenu-header " + style?.overrideClassName?.header}>
					<img
						className="VisionMenu-headerImage"
						src={headerImage}
						onClick={() => {
							if (headerImageCallback) headerImageCallback();
						}}
					/>
					<div className="VisionMenu-boutique">
						<img src={headerIcon} />
						<span dangerouslySetInnerHTML={{ __html: headerIconName }}></span>
					</div>
					{(isBoutique || forceBoutiqueHeader) && (
						<span className="VisionMenu-premium">
							<span>BOUTIQUE</span> VISION
						</span>
					)}
				</div>
				{(tabs?.length ?? 0) > 1 && (
					<div className="VisionMenu-tabSelection">
						{tabs?.map(tab => {
							return (
								<div
									className={"VisionMenu-tab" + (JSON.stringify(tab) === JSON.stringify(currentTab) ? " selected" : "")}
									onClick={() => {
										setCurrentTab(tab);
										onTabChange(tab);
									}}
									style={{
										width: 100 / tabs.length + "%",
									}}>
									{tab.name ?? ""}
								</div>
							);
						})}
					</div>
				)}
				{tabs && (
					<div
						className={"VisionMenu-listContainer"}
						style={{
							maxHeight: 350 + (!submitButton ? 85 : 0) + (tabs?.length > 1 ? 0 : 45) - (origin === "decoration" ? 50 : 0),
							minHeight: 350 + (!submitButton ? 85 : 0) + (tabs?.length > 1 ? 0 : 45) - (origin === "decoration" ? 50 : 0),
						}}>
						<>
							{currentTab?.type === "categories" &&
								currentTab.elements.map((cat: IMenuBuilderCategoryElement, index) => {
									return (
										<>
											<div className={"VisionMenu-categoryName"} style={index > 0 ? { paddingTop: 20 } : {}}>
												{cat.name}
											</div>
											{processItems(cat?.elements ?? [], cat?.minimumElements ?? 1)}
										</>
									);
								})}
							{currentTab?.type === "elements" && processItems(currentTab.elements, 9)}
							{currentTab?.type === "shop" && processShop(currentTab.elements, 0)}
							{currentTab?.type === "buttons" && (
								<div className="VisionMenu-buttonElementContainer">
									{currentTab.elements.map((button: IMenuBuilderButtonElement, index) => {
										return (
											<React.Fragment key={"button" + index}>
												<div
													className={"VisionMenu-buttonElement " + button.width + " " + (button?.type ?? "")}
													onClick={async () => {
														playOnHoverSound();
														if (button.onClickCallback) button.onClickCallback();
													}}
													style={
														button?.type === "coverBackground"
															? {
																	backgroundImage: "url(" + button.image + ")",
																}
															: {}
													}>
													{button.type !== "coverBackground" && (
														<ReactSVG
															className={"VisionMenu-svgContainer " + button.hoverStyle}
															src={button.image ?? ""}
														/>
													)}
													{/* @ts-ignore */}
													<div style={{ color: button.isPremium ? "#FBBC04" : "" }}>
														{button.name.toUpperCase()}
													</div>
													{button.subName && <span className="VisionMenu-buttonSubtitle">{button.subName}</span>}
												</div>
											</React.Fragment>
										);
									})}
								</div>
							)}
						</>
					</div>
				)}
				{finalSubmit && (
					<div className="VisionMenu-finalSubmit">
						<div className="VisionMenu-item">
							<img src={finalSubmit.item.image} />
							<span className="VisionMenu-name">{finalSubmit.item.label}</span>
						</div>
						<Button
							margin={"43px 0 13px"}
							callback={finalSubmit.onSubmit}
							color={"green"}
							width={224}
							height={26}
							fontSize={10}
							fontWeight={700}
							label={finalSubmit.submitLabel}
							selected={false}
							submitSound={true}
						/>
						<Button
							margin={0}
							callback={finalSubmit.onCancel}
							color={"red"}
							width={165}
							height={25}
							fontSize={10}
							fontWeight={700}
							label={finalSubmit.cancelLabel}
							selected={false}
						/>
					</div>
				)}
				{origin === "decoration" && currentTab?.type === "buttons" ? (
					<div className="decoMenu">
						<div className="decoMenu-child1">
							<p>SPAWN PAR MODÈLE</p>
							<div className="decoMenu-child1-1">
								<div>
									<img
										src={search}
										alt=""
										onClick={() => {
											postAsync("spawnItemDecoration", spawnItem);
											setspawnItem("");
										}}
									/>
								</div>
								<input type="text" name="spawn" id="spawn" value={spawnItem} onChange={e => setspawnItem(e.target.value)} />
							</div>
						</div>
						<div className="decoMenu-child2">
							<p>LISTING PROPS</p>
							<div className="decoMenu-child2-1" onClick={() => openInNewTab("https://gtahash.ru/")}>
								<img src={canap} alt="" />
								<img src={plant} alt="" />
								<img src={frame} alt="" />
							</div>
						</div>
					</div>
				) : undefined}
				{submitButton && !submitButton?.input?.isInput && (
					<div style={{ width: "fit-content", margin: "auto", position: "relative" }}>
						<Button
							label={submitButton.label}
							callback={submitButton.onClickCallback}
							width={266}
							height={30}
							margin={"10px auto 2px"}
							submitSound={true}
							disabled={submitButton.disabled}
							disabledType={submitButton.disabledType}
							color={submitButton?.color ?? "green"}
							fontSize={"12px"}
							customVisu={submitButton?.customVisu}
						/>
						{submitButton?.icon && (
							<img style={{ position: "absolute", zIndex: 3, top: 15, left: 30 }} src={submitButton.icon} />
						)}
					</div>
				)}
				{submitButton && submitButton?.input?.isInput && (
					<input
						className={"VisionMenu-submit VisionMenu-submitInput " + style?.overrideClassName?.submitButton}
						value={submitButton.input.value}
						onBlur={e => submitButton.input.onBlur(e.currentTarget.value)}
						onChange={e => submitButton.input.onChange(e.currentTarget.value)}
						placeholder={submitButton.input.placeholder}
					/>
				)}
				{progressBar && (
					<div className="VisionMenu-progressBar">
						{progressBar.elements.map((el, index) => {
							if (index < progressBar.current)
								return (
									<React.Fragment key={"progress" + index}>
										<div className="VisionMenu-progressBarElement">
											<div
												style={{
													background:
														"linear-gradient(180deg, rgba(30, 180, 90, 0.6) 0%, rgba(0, 255, 102, 0.6) 100%)",
												}}></div>
										</div>
									</React.Fragment>
								);
							if (index === progressBar.current)
								return (
									<React.Fragment key={"progress" + index}>
										<div className="VisionMenu-progressBarElement">
											<div
												style={{
													background: "linear-gradient(90deg, rgba(94, 108, 182, 0.62) 0%, #5E6CB6 100%)",
												}}></div>
										</div>
									</React.Fragment>
								);
							if (index > progressBar.current)
								return (
									<React.Fragment key={"progress" + index}>
										<div className="VisionMenu-progressBarElement">
											<div
												style={{
													background:
														"linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)",
												}}></div>
										</div>
									</React.Fragment>
								);
						})}
					</div>
				)}
				{selectedParent && selectedParent?.isPremium && !selectedParent?.owned && (
					<div className="VisionMenu-toBoutique">
						<svg xmlns="http://www.w3.org/2000/svg" width="97" height="29" viewBox="0 0 97 19" fill="none">
							<path
								d="M2.69175 2.51651C2.9287 1.06549 4.18229 0 5.65253 0H93.5002C95.3399 0 96.7462 1.64061 96.4649 3.45866L94.4538 16.4587C94.2275 17.921 92.9688 19 91.489 19H3.52964C1.6798 19 0.270724 17.3422 0.568853 15.5165L2.69175 2.51651Z"
								fill="url(#paint0_linear_2135_369)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_2135_369"
									x1="47.0303"
									y1="5.69214e-09"
									x2="47.0303"
									y2="19"
									gradientUnits="userSpaceOnUse">
									<stop stopColor="#F98F02" />
									<stop offset="1" stopColor="#FE5301" />
								</linearGradient>
							</defs>
						</svg>
						<div
							className="VisionMenu-toBoutiquePrice"
							onClick={() => {
								postAsync("buyItem", selectedParent);
							}}>
							{selectedParent.price}
							{getCurrency({ isPremium: true, price: 0 })}
						</div>
					</div>
				)}
				{selectedParent && selectedParent?.isPremium && !selectedParent?.owned && (
					<div className="VisionMenu-number">DÉBLOQUEZ +{currentTab.elements.length} MODÈLES</div>
				)}
			</div>
		</>
	);
};

export default MenuBuilder;
