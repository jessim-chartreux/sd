import "swiper/swiper-bundle.css";
import "./wallet.scss";

import { EffectCoverflow, Navigation } from "swiper/modules";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const AtmWallet: React.FC<{ data: any; onManage: (id: number) => void }> = props => {
	const [activeIndex, setActiveIndex] = useState(1);

	const next = () => {
		if (props.data.accounts.length == 1) {
			//history.push("/atm/manage/" + props.data.accounts[activeIndex - 1].id);
			props.onManage(props.data.accounts[activeIndex - 1].id);
		} else {
			//history.push("/atm/manage/" + props.data.accounts[activeIndex].id);
			props.onManage(props.data.accounts[activeIndex].id);
		}
	};

	if (!props.data) return <React.Fragment />;

	return (
		<div className="atm_wallet_wallet">
			<div className="atm_wallet_container">
				<div className="atm_wallet_title d-flex justify-content-center align-items-center">
					<h1>
						Choisissez l'une de vos <b>cartes de crédit</b> pour continuer
					</h1>
				</div>
				<Swiper
					modules={[Navigation, EffectCoverflow]}
					effect="coverflow"
					grabCursor={true}
					centeredSlides={true}
					slidesPerView="auto"
					coverflowEffect={{
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: false,
					}}
					initialSlide={1}
					className="atm_swiper"
					onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}>
					{props?.data.accounts?.map((item, index) => (
						<SwiperSlide key={index} style={{ height: "170px" }}>
							<div>
								{item.common == 1 && (
									<div className="atm_wallet_card green d-flex flex-column justify-content-between" id={item.id}>
										<div className="d-flex flex-column">
											<div className="d-flex flex-column">
												<span className="atm_wallet_card_text_little">FLEECA BANK</span>
												<span className="atm_wallet_card_text_bigger">
													<b>{props.data?.player?.lastname?.toUpperCase()}</b>
													{props.data?.player?.firstname?.toUpperCase()}
												</span>
											</div>
											<span className="atm_wallet_card_text_bigger mt-2">
												<b>**** **** **** ****</b>
											</span>
										</div>
										<div className="d-flex justify-content-between">
											<div className="d-flex flex-column justify-content-between">
												<div className="d-flex justify-content-between">
													<div className="d-flex flex-column">
														<span className="atm_wallet_card_text_thin">EXP</span>
														<span className="atm_wallet_card_text_normal">07/2035</span>
													</div>
													<div className="d-flex flex-column">
														<span className="atm_wallet_card_text_thin">AGE</span>
														<span className="atm_wallet_card_text_normal">0903</span>
													</div>
													<div className="d-flex flex-column">
														<span className="atm_wallet_card_text_thin">CVC</span>
														<span className="atm_wallet_card_text_normal">901</span>
													</div>
												</div>
												<span className="atm_wallet_card_text_normal">COMPTE N°{item?.account_number}</span>
											</div>
											<div className="d-flex flex-column align-items-center">
												<img
													className="atm_wallet_card_nfc"
													src="https://cdn.sacul.cloud/v2/vision-cdn/atm/nfc.webp"
													alt="NFC icon"
												/>
												<img
													className="atm_wallet_card_puce"
													src="https://cdn.sacul.cloud/v2/vision-cdn/atm/puce.webp"
													alt="NFC icon"
												/>
											</div>
										</div>
									</div>
								)}
							</div>
							<div>
								{item.common == 0 && item.id != null && (
									<div className="atm_wallet_card red d-flex flex-column justify-content-between" id={item.id}>
										<div className="d-flex flex-column">
											<div className="d-flex flex-column">
												<span className="atm_wallet_card_text_little">FLEECA BANK</span>
												<span className="atm_wallet_card_text_bigger">
													<b>{props.data?.player?.job?.toUpperCase()}</b>
												</span>
											</div>
											<span className="atm_wallet_card_text_bigger mt-2">
												<b>**** **** **** ****</b>
											</span>
										</div>
										<div className="d-flex justify-content-between">
											<div className="d-flex flex-column justify-content-between">
												<div className="d-flex justify-content-between">
													<div className="d-flex flex-column">
														<span className="atm_wallet_card_text_thin">EXP</span>
														<span className="atm_wallet_card_text_normal">07/2035</span>
													</div>
													<div className="d-flex flex-column">
														<span className="atm_wallet_card_text_thin">AGE</span>
														<span className="atm_wallet_card_text_normal">0903</span>
													</div>
													<div className="d-flex flex-column">
														<span className="atm_wallet_card_text_thin">CVC</span>
														<span className="atm_wallet_card_text_normal">901</span>
													</div>
												</div>
												<span className="atm_wallet_card_text_normal">COMPTE N°{item?.account_number}</span>
											</div>
											<div className="d-flex flex-column align-items-center">
												<img
													className="atm_wallet_card_nfc"
													src="https://cdn.sacul.cloud/v2/vision-cdn/atm/nfc.webp"
													alt="NFC icon"
												/>
												<img
													className="atm_wallet_card_puce"
													src="https://cdn.sacul.cloud/v2/vision-cdn/atm/puce.webp"
													alt="NFC icon"
												/>
											</div>
										</div>
									</div>
								)}
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<div className="atm_wallet_next d-flex justify-content-center align-items-center">
					<button className="btn" onClick={next}>
						<span>Choisir</span>
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/atm/arrow.webp" alt="Arrow icon" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default AtmWallet;
