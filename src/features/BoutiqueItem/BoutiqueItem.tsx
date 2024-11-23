import "./style.scss";

import React, { useContext, useState } from "react";
import { playBoutiqueLeave, playOnClickSound, playOnHoverSound } from "../../utils/sounds";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { BoutiqueHeader } from "../../components/UI/BoutiqueHeader/BoutiqueHeader";
import { GlobalContext } from "../../app";
import { SERVER } from "../../config";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useBackspaceKey } from "../../hooks/useBackspaceKey";
import { useEnterKey } from "../../hooks/useEnterKey";
import { useKey } from "../../hooks/useKey";

const BoutiqueItem: React.FC = () => {
	const context = useContext(GlobalContext);

	const [selectedVariation, setSelectedVariation] = useState(context.data?.selectedVariation || 0);
	const [selectedVariation2, setSelectedVariation2] = useState(0);
	const [selectedCategory, setSelectedCategory] = useState(context.data?.selectedCategory || 0);
	const [selectedItem, setSelectedItem] = useState(context.data?.selectedItem || 0);
	const [activeCategory, setActiveCategory] = useState(context.data?.activeCategory || 0);
	const [isInSubCategory, setIsInSubCategory] = useState(false);

	const data = isDev
		? {
				type: "custom",
				unique_id: "69",
				premium: true,
				credit: 1000,
				isLiveries: false,
				isVeh: true,
				selectedCategory: 0,
				selectedVariation: 0,
				selectedItem: 0,
				activeCategory: 0,
				categories: [
					{
						image: "https://cdn.discordapp.com/attachments/1152017797707218994/1152035281562779689/Rectangle_336.webp",
						title: "Vêtements",
						subtitle: "Custom",
						items: [
							{
								price: 3000,
								reduction: 2500,
								image: "https://cdn.discordapp.com/attachments/1148290034252910672/1152083131835359302/image_14_3.webp",
								variations: [
									{
										Nom: "",
										color: "#FFBA00",
										color2: "#FFC731",
										Numéro: "",
										label: "Yellow",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274123467665509/image_13_2.webp?ex=6519a5b1&is=65185431&hm=11565c9cfa0d3d80bfef94a9fc5f9d692dbc377ee1d186875785820fea771e64&=&width=574&height=676",
										name: "Los Angelers Lakers",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274123799011411/LAKERS_JAUNE_DOS_7.webp?ex=6519a5b1&is=65185431&hm=115b0582967aa272281ad53c7426ae71d0a8d69dadf096ce54c8acf9dcab4800&=&width=574&height=676",
									},
									{
										color: "#434692",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274230736986222/image_18_1.webp?ex=6519a5cb&is=6518544b&hm=263bd144bef4f93b28acb4b9a3fa9c76e6841474cf7b30480b1e039cb2c65c85&=&width=574&height=676",
										label: "Purple",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274230346911744/image_17_1.webp?ex=6519a5cb&is=6518544b&hm=5a7b89ab121673c663b1babc0be61346ee285b9f2103202f60701453feb4de5a&=&width=574&height=676",
										color2: "#9373FF",
										name: "Los Angeles Lakers",
									},
									{
										color: "#434692",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274322214764584/image_26_1.webp?ex=6519a5e0&is=65185460&hm=a5fb9dfcf22ec0647694a67bc731d09a6f2221417b47d627a87d39c2c2238454&=&width=574&height=676",
										label: "Purple",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274321854046300/image_25_1.webp?ex=6519a5e0&is=65185460&hm=78a0e35c0786b9c4f96018e0fbee9689db2c50ddd17e052cc97db09c7965a50a&=&width=574&height=676",
										color2: "#9373FF",
										name: "Los Angeles Lakers",
									},
									{
										color: "#15B2D5",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274516297785465/image_42.webp?ex=6519a60f&is=6518548f&hm=176c9f0cc58f5a49b45a4369306d8eaa03551c7f23beb2620f5371dc074cdb21&=&width=574&height=676",
										label: "Cyan",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274515924500551/image_43_1.webp?ex=6519a60f&is=6518548f&hm=6829021b7d23e86237c4769ab9abe4981bddc0334658b63e6231b7e85eb895fb&=&width=574&height=676",
										color2: "#B9EDFE",
										name: "Memhpis Grizzlies",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274065737256970/LAKERS_JAUNE_DOS_5.webp?ex=6519a5a3&is=65185423&hm=b59420530102b00f8ac9c004e8b1c693495b2ccd774065a322aace0fd1c17267&=&width=574&height=676",
										label: "White",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274065330421911/LAKERS_JAUNE_1.webp?ex=6519a5a3&is=65185423&hm=79a3eb82e7cb859e719c53085ee0e41fa91ee52ac05df196903b91ea99ea6304&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Memphis Grizzlies",
									},
									{
										color: "#000000",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274413126287453/image_34_1.webp?ex=6519a5f6&is=65185476&hm=209b59bb7e702039d5f33c6733ff7a6e15093ce2cfa18731054de14a04c8d33d&=&width=574&height=676",
										label: "Black",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274412622975127/image_35_1.webp?ex=6519a5f6&is=65185476&hm=79c8d12792c0369ad37561f1d2a0ea389d17ee6353eba84663d2a7063616d72c&=&width=574&height=676",
										color2: "#7D7D7D",
										name: "Memphis Grizzlies",
									},
									{
										color: "#7A2929",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274536652738672/LAKERS_JAUNE_DOS_16.webp?ex=6519a614&is=65185494&hm=a4eeac201a07b96178b39598a3df2868b975eebe97b6a347ca0c6d7fd4108690&=&width=574&height=676",
										label: "Red",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274536170401843/image_13_7.webp?ex=6519a613&is=65185493&hm=7885f53d827573b12139c7ffe0e20d5ce276956bb2ccc28dc17e6ed4089edc5c&=&width=574&height=676",
										color2: "#D70909",
										name: "Philadelphie 76ers",
									},
									{
										color: "#051A66",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156273919699976344/image_44.webp?ex=6519a580&is=65185400&hm=988be1ad440382bb83f677d2fbaa3dad585e244e34f7c88a3d32479d54ff1a3b&=&width=574&height=676",
										label: "Blue",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156273919326703617/image_45.webp?ex=6519a580&is=65185400&hm=887ef60b33ead554ebb1ae41db86ee147c920d5e20ffd89c1827701555f3fc58&=&width=574&height=676",
										color2: "#0362F1",
										name: "Philadelphie 76ers",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274482852405298/LAKERS_JAUNE_DOS_15.webp?ex=6519a607&is=65185487&hm=9b15d3f3a313eb420004faf7e41626d535025450ced1fab18e746ae562da84fb&=&width=574&height=676",
										label: "White",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274482479124612/ROLEX1_7.webp?ex=6519a607&is=65185487&hm=1e3e7fccee43c5d2d46e0464f5568d5f0a26dbaef118212cc2edc105ad4cbdc2&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Miami Heat",
									},
									{
										color: "#000000",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156273888909594656/LAKERS_JAUNE_DOS.webp?ex=6519a579&is=651853f9&hm=7460c296b4c0ece601d9fbc21fc77fcda7431171a625f6296c25db878cee33af&=&width=574&height=676",
										label: "Black",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156273888595038208/LAKERS_JAUNE.webp?ex=6519a579&is=651853f9&hm=38f7eeb9d4cecde1a76133816aaaa10fc36470c7d2dfd7090094a08fb0b34e1e&=&width=574&height=676",
										color2: "#7D7D7D",
										name: "Miami Heat",
									},
									{
										color: "#051A66",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274365386719232/image_31_1.webp?ex=6519a5eb&is=6518546b&hm=47492b7e83af7d0ac2804fa3cc409ee1446da2738426bd549d94b3f7f321686b&=&width=574&height=676",
										label: "Blue",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274364942139442/image_29_1.webp?ex=6519a5eb&is=6518546b&hm=2ef02d680a8fb00c380ebccfb13e42a10810cc3a3a44ee046dc75c27ba032bfc&=&width=574&height=676",
										color2: "#0362F1",
										name: "Dallas Maverick",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274458617724979/image_38.webp?ex=6519a601&is=65185481&hm=74e1a6c1c40de0ef28d2eb47930503f6af9d9db87392a1fe9e3723959626e503&=&width=574&height=676",
										label: "White",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274457845960824/image_39_1.webp?ex=6519a601&is=65185481&hm=66c44642abcd322de92641205f8ff9948cb3b1a46fa26b60ba8773d9202eb469&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Dallas Maverick",
									},
									{
										color: "#585353",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274427043000390/LAKERS_JAUNE_DOS_14.webp?ex=6519a5f9&is=65185479&hm=ff5a7086d907c3d50a6cd47c01b741af00c4a935819fadc897a55866febc9107&=&width=574&height=676",
										label: "Grey",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274426732609637/image_13_6.webp?ex=6519a5f9&is=65185479&hm=7cb5c16eb76c3cddeb044e2b07482caadb34863ea047981d77e3ff0be258e718&=&width=574&height=676",
										color2: "#A5A5A5",
										name: "San Antonio Spurs",
									},
									{
										color: "#000000",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274394767839252/LAKERS_JAUNE_DOS_13.webp?ex=6519a5f2&is=65185472&hm=0c74184b3b562a98d4a2f5b7bd76dbbfbd3637a6718e694dffa6ba183a5caedd&=&width=574&height=676",
										label: "Black",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274394323222579/LAKERS_JAUNE_2.webp?ex=6519a5f2&is=65185472&hm=7b015c7635420a6ddf6ca5705356882e874b1d8d885c25d1e0afaaccaa1f5a9e&=&width=574&height=676",
										color2: "#7D7D7D",
										name: "San Antonio Spurs",
									},
									{
										color: "#434692",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274211082469446/LAKERS_JAUNE_DOS_9.webp?ex=6519a5c6&is=65185446&hm=75a1568c3a53044e9826f5e0ece22ac7c17c6199a59ab7a044b42b12daf61098&=&width=574&height=676",
										label: "Purple",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274210658852934/ROLEX1_5.webp?ex=6519a5c6&is=65185446&hm=13c87844b67e34f9f38435a881bd8f520b719ea4dead980b71a9a0eea1db759b&=&width=574&height=676",
										color2: "#9373FF",
										name: "Milwaukee Bucks",
									},
									{
										color: "#0E551D",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274298420478072/LAKERS_JAUNE_DOS_11.webp?ex=6519a5db&is=6518545b&hm=7b84f0b6951ccf4b151298433995dff3e70143be7c380f15dcff391cadec9c87&=&width=574&height=676",
										label: "Green",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274298118471731/ROLEX1_6.webp?ex=6519a5db&is=6518545b&hm=c1b36987343743adca52ecc36383992edf8680ee8b3e271b9b74520817f83a5d&=&width=574&height=676",
										color2: "#00C92C",
										name: "Milwaukee Bucks",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274191184711710/image_14_1.webp?ex=6519a5c1&is=65185441&hm=52e671f4865c79ae5dac458116251bb1736e25e808492202f888b22918a1221d&=&width=574&height=676",
										label: "White",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274190798823465/image_30_1.webp?ex=6519a5c1&is=65185441&hm=772cb134c3fc73ababfb4ae29c385d1c41afe652fbb1e01fd019ddc092546932&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Denver Nuggets",
									},
									{
										color: "#051A66",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274261372174416/image_22_1.webp?ex=6519a5d2&is=65185452&hm=f160ef01e42ee2d128a46c63fb891c97650addf04c413ac44e8dc10e9ad2293e&=&width=574&height=676",
										label: "Blue",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274260919205961/image_21_1.webp?ex=6519a5d2&is=65185452&hm=76d9985f2ffa229dc6dda3131042dee70db6e1fe89ab95796a9341356e9221aa&=&width=574&height=676",
										color2: "#0362F1",
										name: "Denver Nuggets",
									},
									{
										color: "#0E551D",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274144535662723/LAKERS_JAUNE_DOS_8.webp?ex=6519a5b6&is=65185436&hm=d7ff570d999d59d048e70a2273787994b4b60a943ef7fe4f7433b1b4e64a8811&=&width=574&height=676",
										label: "Green",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274144183332894/image_13_3.webp?ex=6519a5b6&is=65185436&hm=440185599e3a7d55d8acd7cefac61f1d2992005ff459dbef2c3770e25d451a3b&=&width=574&height=676",
										color2: "#00C92C",
										name: "Boston Celtics",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274032417701918/LAKERS_JAUNE_DOS_4.webp?ex=6519a59b&is=6518541b&hm=a7b5caba87da7b36f601aad85e06a428347ff59f0cc3e53a05b527c1e7dc9ab5&=&width=574&height=676",
										label: "White",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274031989887068/image_13_1.webp?ex=6519a59b&is=6518541b&hm=7d12750171983af1387726c5a855fb890fcf00151285ea872d9b92148d5dfae3&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Boston Celtics",
									},
									{
										color: "#051A66",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156273951480217610/LAKERS_JAUNE_DOS_1.webp?ex=6519a588&is=65185408&hm=5d0f7e118390bca2ab8abe42007395fd1c3b44e0c3226add5299113656c7a345&=&width=574&height=676",
										label: "Blue",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156273951203414136/ROLEX1_2.webp?ex=6519a588&is=65185408&hm=f62669ffccc3622699f31a169798db6bf0da10251bf2b1a2663ee5d2da1b20bc&=&width=574&height=676",
										color2: "#0362F1",
										name: "Charlotte Hornets",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274006052315206/LAKERS_JAUNE_DOS_3.webp?ex=6519a595&is=65185415&hm=afbed230c8506df0c22b9ad67d7e27bea386e87a6b56001a8434aa22db60d1ad&=&width=574&height=676",
										label: "White",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274005695795210/image_13.webp?ex=6519a595&is=65185415&hm=c7ff995ead38a54107b8a8b130055366917a0860fe46ef349862b556166ebd1e&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Charlotte Hornets",
									},
									{
										color: "#000000",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156274087572816024/LAKERS_JAUNE_DOS_6.webp?ex=6519a5a9&is=65185429&hm=339c9904f851b01a38329f207777db1d820deb9c46fdc8835cea58628d3b6502&=&width=574&height=676",
										label: "Black",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156274087098863677/ROLEX1_4.webp?ex=6519a5a8&is=65185428&hm=3a6f47dfa3ef7bbbb9dcce958189c7da00b51a1f4d558b729a6a2b2bce67bb4b&=&width=574&height=676",
										color2: "#7D7D7D",
										name: "Chicago Bulls",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1156273985663795220/LAKERS_JAUNE_DOS_2.webp?ex=6519a590&is=65185410&hm=87818dffb7d0a82340c75b263921611294f7c0e6bc054c7345ade2994faf661c&=&width=574&height=676",
										label: "White",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1156273984573284444/ROLEX1_3.webp?ex=6519a590&is=65185410&hm=c43a5041bd4452fda85beb1ccb83ff257e91bcc1240bc381ab5268b52d913f3a&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Chicago Bulls",
									},
									{
										color: "#000000",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158730165959008297/LAKERS_JAUNE_DOS_17.webp?ex=651d4f0f&is=651bfd8f&hm=d94539b0d36d49947be48e27a6637812e824b306da120cb9881f33ce59415544&=&width=574&height=676",
										label: "Black",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158730165669605446/LAKERS_JAUNE_3.webp?ex=651d4f0f&is=651bfd8f&hm=c6a43aa6f4ece2c0554521ef7ee1c2fbd6bc6b821c18275d12b95bc73aee2405&=&width=574&height=676",
										color2: "#7D7D7D",
										name: "Cleveland Cavaliers",
									},
									{
										color: "#000000",
										icon2: "",
										label: "Black",
										icon: "",
										color2: "#7D7D7D",
										name: "Cleveland Cavaliers",
									},
									{
										color: "#434692",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158730766897926214/image_49.webp?ex=651d4f9f&is=651bfe1f&hm=ba04b26b3ebcd3fd1efc39b377375ebdbb4c15a2f7610f2289dcedeb521ac06a&=&width=574&height=676",
										label: "Purple",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158730766558175242/image_14_3.webp?ex=651d4f9e&is=651bfe1e&hm=3d73707e4f1b0cb1edd4b34f565ec9efd73e5774c51ec230fd22de54d10d980d&=&width=574&height=676",
										color2: "#9373FF",
										name: "Phoenix Suns",
									},
									{
										color: "#000000",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158733341223309322/LAKERS_JAUNE_DOS_30.webp?ex=651d5204&is=651c0084&hm=a931e1a63fc0bf52b31204198c5da34d786a68fdbf659a882f362a389196ed73&=&width=574&height=676",
										label: "Black",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158733340875173968/image_13_45.webp?ex=651d5204&is=651c0084&hm=a7831779c8daab5c9b65424d013ecaa2263ad229c7492f523af41ba08c2d514e&=&width=574&height=676",
										color2: "#7D7D7D",
										name: "Phoenix Suns",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158730840264691823/image_13_9.webp?ex=651d4fb0&is=651bfe30&hm=a1539a8666608b91f4f087a2b8721fe3352b85f92329a38c5ed50c4c2dcac812&=&width=574&height=676",
										label: "White",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158730839845249094/image_13_8.webp?ex=651d4fb0&is=651bfe30&hm=8e6d2b228bb665f4d4c2887b7c54d58cc3629d9141f52a3e15401e6ba203c490&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Golden State Warriors",
									},
									{
										color: "#051A66",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158733592185286766/image_13_48.webp?ex=651d5240&is=651c00c0&hm=4370cbf7efbaefbc8c2fd4d4a6be94d0cc2e1d4861dbd37dbd4d449fee833bc9&=&width=574&height=676",
										label: "Blue",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158733591585505300/image_13_47.webp?ex=651d5240&is=651c00c0&hm=2a85b0aab04162dff6d03c3cf822777af66e4c993a0310a882d4468156d82e38&=&width=574&height=676",
										color2: "#0362F1",
										name: "Golden State Warriors",
									},
									{
										color: "#585353",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158730888633397279/image_13_11.webp?ex=651d4fbc&is=651bfe3c&hm=dbc21422081a7ba9673fb41e54c0fe8b3b67caed860c1b72685c5acab8515851&=&width=574&height=676",
										label: "Grey",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158730888218165308/image_13_10.webp?ex=651d4fbb&is=651bfe3b&hm=c7083d04a05e25f553bed6f520c9356612ac89dee7ae01110a7442374b912ee5&=&width=574&height=676",
										color2: "#A5A5A5",
										name: "Atlanta Hawks",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158732186611093564/image_13_26.webp?ex=651d50f1&is=651bff71&hm=ce3bed121342df03717c5d55df8ad14bcf847e8c1392e2358d6bd968e69a5993&=&width=574&height=676",
										label: "White",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158732186258780160/image_13_25.webp?ex=651d50f1&is=651bff71&hm=1985e5233fb3464f7c5a472c88d7a81603837660d4eb81b6e42d91f109ddf7ee&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Atlanta Hawks",
									},
									{
										color: "#000000",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158730953192128522/image_13_13.webp?ex=651d4fcb&is=651bfe4b&hm=8bf13e8222066bf217f86cd9ab56d9e259fcbb65576f41a6a3f4cc1aa2f03dec&=&width=574&height=676",
										label: "Black",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158730952755904603/image_13_12.webp?ex=651d4fcb&is=651bfe4b&hm=04a1b19992da020f4913faf0b235efb46dd8fbc3780d1e2468de26c961cc2a00&=&width=574&height=676",
										color2: "#7D7D7D",
										name: "Los Angeles Clippers",
									},
									{
										color: "#075D70",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158731735798906961/image_13_21.webp?ex=651d5086&is=651bff06&hm=b3f5a2a62a0fad1cae02d0744b25737a8de7794f4e673718e333caf82478273f&=&width=574&height=676",
										label: "Cyan",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158731735400460348/image_13_20.webp?ex=651d5085&is=651bff05&hm=857257404a4d8cce8ec5669134b250e8157c091abbc97fc469a7c7af2c7f886a&=&width=574&height=676",
										color2: "#07B7EF",
										name: "Los Angeles Clippers",
									},
									{
										color: "#9E1190",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158731622565281873/image_13_17.webp?ex=651d506b&is=651bfeeb&hm=e6251b172424c49ffe39270310ed921709a478bbc2d27363293cd89bd0375891&=&width=574&height=676",
										label: "Pink",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158731622196187216/image_13_16.webp?ex=651d506a&is=651bfeea&hm=925da22a2f382a7ca5ac7f6dc4a9688f0b0864087123bc46b5ac7cbeffb94459&=&width=574&height=676",
										color2: "#FF6AF9",
										name: "Washington Wizard",
									},
									{
										color: "",
										label: "Blue",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158820665823072346/image_21_2.webp?ex=651da358&is=651c51d8&hm=986c1f05946036b7cc083c04370ec2b0482bba206fc7bc8e5e99257263c56e2e&=&width=574&height=676",
										name: "Washington Wizards",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158820665441386566/image_20_1.webp?ex=651da358&is=651c51d8&hm=b6819475862f14ec3b3ba8a0943751f8ba78b86015d028786c65e3c895b51c4d&=&width=574&height=676",
									},
									{
										color: "#585353",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158732235453759569/image_13_28.webp?ex=651d50fd&is=651bff7d&hm=dda99ad60ea1317ddf16fd30902de4eb5badded53033e8bf5376371d5dc511c7&=&width=574&height=676",
										label: "Grey",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158732234900127784/image_13_27.webp?ex=651d50fd&is=651bff7d&hm=176021cf881a5779d46787fd4daf48d5958113da92721b4d8bfd7b6153669277&=&width=574&height=676",
										color2: "#A5A5A5",
										name: "Sacramento Kings",
									},
									{
										color: "#434692",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158731702227714090/image_13_19.webp?ex=651d507e&is=651bfefe&hm=d415eb712d8a19791691a105e21ab52f3a0576fab01160519313edf194d73f81&=&width=574&height=676",
										label: "Purple",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158731701720191056/image_13_18.webp?ex=651d507d&is=651bfefd&hm=a5e5ee1aebf3725069f22d5589ab75a775ac94f554d8389fdbb76af36681cfe8&=&width=574&height=676",
										color2: "#9373FF",
										name: "Sacramento Kings",
									},
									{
										color: "#585353",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158732266739089408/image_13_30.webp?ex=651d5104&is=651bff84&hm=be4d894d901ada6e784c544f86477dbe3fb54f5d26e539b678de440c4d5590a5&=&width=574&height=676",
										label: "Grey",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158732266177048576/image_13_29.webp?ex=651d5104&is=651bff84&hm=034d31d3809728683ad99de2711f696e37c7ef6d3dda77c501684596c0b7ffa7&=&width=574&height=676",
										color2: "#A5A5A5",
										name: "Brooklyn Nets",
									},
									{
										color: "",
										label: "Black",
										icon2: "",
										name: "Brooklyn Nets",
										icon: "",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158732750069710910/image_13_36.webp?ex=651d5177&is=651bfff7&hm=8e9ef23e54706659df376a347651beeffaeae31eace21b4235ef53e354472045&=&width=574&height=676",
										label: "White",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158732749658656848/image_13_35.webp?ex=651d5177&is=651bfff7&hm=2ea624b8eb35f525b765c6b4a8411b9150c1cb9c49206dec2a133ed4c4c0ca0d&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "New York Knicks",
									},
									{
										color: "#585353",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158732705220005930/image_13_34.webp?ex=651d516d&is=651bffed&hm=cc7790c4324bd0e33c0220f9eb3d42d24c3241749b0952d3bba513af844a0032&=&width=574&height=676",
										label: "Grey",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158732704880275537/image_13_33.webp?ex=651d516d&is=651bffed&hm=7ce87a26099349c81d650e29b7c74dc1e67aa2b69b80e840d18e6a0f24c24b42&=&width=574&height=676",
										color2: "#A5A5A5",
										name: "New York Knicks",
									},
									{
										color: "#434692",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158733200693153843/image_13_42.webp?ex=651d51e3&is=651c0063&hm=70b1b55d5653534d5e72322c45a43e0d91f69902de0281b50b0b0dd60074d158&=&width=574&height=676",
										label: "Purple",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158733200147886100/image_13_41.webp?ex=651d51e3&is=651c0063&hm=2e317a6601a4d58a9b83c199708a6b8b76d133b3c832c39231f33dd6f97f5610&=&width=574&height=676",
										color2: "#9373FF",
										name: "Minnesota Timberwolves",
									},
									{
										color: "#585353",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158732801999372298/image_13_38.webp?ex=651d5184&is=651c0004&hm=a28de32591dc952f967295b42011288e79272876f36e12afd119bb7a84a86721&=&width=574&height=676",
										label: "Grey",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158732801533825066/image_13_37.webp?ex=651d5184&is=651c0004&hm=b420c977ccc17273fb95725a1703e81502eb5f7000c0193c4e0244a83f4fcfe1&=&width=574&height=676",
										color2: "#A5A5A5",
										name: "Minnesota Timberwolves",
									},
									{
										color: "#7A2929",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158733217210302494/image_13_44.webp?ex=651d51e7&is=651c0067&hm=0fecdae2bc7a99348c06d9383c0462e292537e9cc79e71cec2d2fcd797713905&=&width=574&height=676",
										label: "Red",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158733216677630023/image_13_43.webp?ex=651d51e7&is=651c0067&hm=d55a843adea6e0fa8008d0d5afe878fa2f4a95e7f815a08f4a4d6f43d3b84ba0&=&width=574&height=676",
										color2: "#D70909",
										name: "Houston Rockets",
									},
									{
										color: "#000000",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158733130098815069/image_15.webp?ex=651d51d2&is=651c0052&hm=6424ae90d9005f06dbd1c17a2767ad87205db2a4992560cfd46c8c1a62d39495&=&width=574&height=676",
										label: "Black",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158733129746497638/image_13_40.webp?ex=651d51d2&is=651c0052&hm=f845d5d01d7b6493d59891aa368ccb871cc3ecf8c7ea64afec46b44afce0212a&=&width=574&height=676",
										color2: "#7D7D7D",
										name: "Houston Rockets",
									},
									{
										color: "#7A2929",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158733419002466354/image_23.webp?ex=651d5217&is=651c0097&hm=4e4eca362a977ca64a6ec99f43ff64713a25cb5b4683f9113d258b9ad1611e02&=&width=574&height=676",
										label: "Red",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158733418662723655/image_22_4.webp?ex=651d5217&is=651c0097&hm=2583c200d86ba834ca94942c6d5ba437fe220149292665d99954e905206673af&=&width=574&height=676",
										color2: "#D70909",
										name: "Portland Trail Blazers",
									},
									{
										color: "#585353",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158733394637750293/image_14_6.webp?ex=651d5211&is=651c0091&hm=1341cf4be710b005e1e7d5a8e92a2b4c30559368291099d7b63cebe50a817321&=&width=574&height=676",
										label: "Grey",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158733394272854087/image_13_46.webp?ex=651d5211&is=651c0091&hm=559586e3eb0cb7236e479b899f967e70ae35836679eb10cff1a0e426dcfebce2&=&width=574&height=676",
										color2: "#A5A5A5",
										name: "Portland Trail Blazers",
									},
									{
										color: "#DC5C16",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158733438157856878/image_25_4.webp?ex=651d521b&is=651c009b&hm=fa075170b3e7dd7318e2433220ed9fc602f87408cee4a3f4d344657f2b55c933&=&width=574&height=676",
										label: "Orange",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158733437763588148/image_24.webp?ex=651d521b&is=651c009b&hm=d6a2c007ab0483b1b45b16ec92588b58d851653e95c64a654ca3d2ad0afb122a&=&width=574&height=676",
										color2: "#FF906D",
										name: "Oklahoma City",
									},
									{
										color: "#051A66",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158733605837746236/image_19.webp?ex=651d5243&is=651c00c3&hm=6bf7a7ad2a606aa38e8a4e3d6cb8da64f66fc4e4cd47b7e1128211ed903e6164&=&width=574&height=676",
										label: "Blue",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158733605481222195/image_18_4.webp?ex=651d5243&is=651c00c3&hm=b3a387649441ad178dbd91789ab42c6cd71455cac1e78f7bf662c5d22d5b41f3&=&width=574&height=676",
										color2: "#0362F1",
										name: "Oklahoma City",
									},
									{
										color: "#7A2929",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158733629988544532/image_27.webp?ex=651d5249&is=651c00c9&hm=6e9f2e8f974aecda763c1ce4f4894ba90872fb32689aeb2476dfbab947fbe1db&=&width=574&height=676",
										label: "Red",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158733629636235264/image_26_4.webp?ex=651d5249&is=651c00c9&hm=7ff9bbae55e204df7d3713bf1c64f17e36fd79fcc6fda165be04e0a208f9b9a5&=&width=574&height=676",
										color2: "#D70909",
										name: "New Orleans Pelicans",
									},
									{
										color: "#051A66",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1158820665823072346/image_21_2.webp?ex=651da358&is=651c51d8&hm=986c1f05946036b7cc083c04370ec2b0482bba206fc7bc8e5e99257263c56e2e&=&width=574&height=676",
										label: "Blue",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1158820665441386566/image_20_1.webp?ex=651da358&is=651c51d8&hm=b6819475862f14ec3b3ba8a0943751f8ba78b86015d028786c65e3c895b51c4d&=&width=574&height=676",
										color2: "#0362F1",
										name: "New Orleans Pelicans",
									},
								],
								customFields: ["Numéro", "Nom"],
								name: "Basketball",
								image2: "https://cdn.discordapp.com/attachments/1148290034252910672/1152083359816745071/image_13_2.webp",
							},
							{
								price: 2500,
								image: "https://media.discordapp.net/attachments/1156267374975143987/1165620334800678912/image_13-11.webp?ex=65478387&is=65350e87&hm=c7d0d8ccdb6b3dcb45877b74f8b9fd65013a80c249d8d6b9484c3fc52352a501&=&width=574&height=676",
								variations: [
									{
										color: "#051A66",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165621410165690438/image_13-24.webp?ex=65478488&is=65350f88&hm=6675f13c70bed9b9fcd3075c86d7521ac3f7bf4e1e5b7dc5926beb47e68c752c&=&width=574&height=676",
										label: "blue",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165621409658187846/image_13-25.webp?ex=65478488&is=65350f88&hm=473d79e4eb56515cf21749e32440383a9c03a43db98137a75a3d9c7ad8a377d3&=&width=574&height=676",
										color2: "#0362F1",
										name: "France",
									},
									{
										color: "#075D70",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165620696601341982/image_13-20.webp?ex=654783de&is=65350ede&hm=1534101d7a96bc1295bfa04b64cc21cb9858166fc49633ff9702db3cb5653e6c&=&width=574&height=676",
										label: "cyan",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165620696102228029/image_13-21.webp?ex=654783de&is=65350ede&hm=bba76902ea6faa22c453c2dceacfaa26cd591bce01d66dbd5940ef6525c6c4c3&=&width=574&height=676",
										color2: "#07B7EF",
										name: "Italie",
									},
									{
										color: "#7A2929",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165621098214330459/image_25.webp?ex=6547843e&is=65350f3e&hm=5166770bc9ac5ea120c714cac6b4d6e994a2776a2e76dec000445e68d3172023&=&width=574&height=676",
										label: "red",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165621097706823780/image_24.webp?ex=6547843d&is=65350f3d&hm=542191b085ba983afa0360ccd9569e47c9ccc5ababc5491f0f35304fe4de6f0c&=&width=574&height=676",
										color2: "#D70909",
										name: "Portugal",
									},
									{
										color: "#7A2929",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165621192883982396/image_27.webp?ex=65478454&is=65350f54&hm=23cb25d867083bf213a0ec5be2911443044f49877953bb4d3ed1734d2be089c4&=&width=574&height=676",
										label: "red",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165621192414203904/image_26.webp?ex=65478454&is=65350f54&hm=8cec3958e1741dddeccf18f13f8170e4361828754893a9a223906ca513c614de&=&width=574&height=676",
										color2: "#D70909",
										name: "Belgique",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165624503943057559/image_13-3.webp?ex=65478769&is=65351269&hm=a55cbac756545645aac1504e13a2723f10d5df768e2de8178d42400c4f2f36c4&=&width=574&height=676",
										label: "white",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165624503381004328/image_13-2.webp?ex=65478769&is=65351269&hm=f7f3aeee0d1697d0d26a19e6c4203f6598687fb4e07f839893d6231e44136f21&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Allemagne",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165621311092039700/image_13-30.webp?ex=65478470&is=65350f70&hm=77fb257a4344c983d55fb4f34900bc1cac8a5d410133c52acef13196f78fd5f7&=&width=574&height=676",
										label: "white",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165621310592913409/image_13-31.webp?ex=65478470&is=65350f70&hm=4ccdb5b45d8fedfc28da7459b2f394d170cb777ba922ba230e7bcaa61b5a63ab&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Angleterre",
									},
									{
										color: "#7A2929",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165624580833026078/image_13-7.webp?ex=6547877c&is=6535127c&hm=b73afcc9f90f02422a7b40f03c11de1b8c1d23ee7f3e27ce4fc28eb67ba6c462&=&width=574&height=676",
										label: "red",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165624579801235566/image_13-6.webp?ex=6547877c&is=6535127c&hm=d94f1214967e056967a83d2cca334c0c43442f999771dc449ad4a5f330dcc105&=&width=574&height=676",
										color2: "#D70909",
										name: "Espagne",
									},
									{
										color: "#7A2929",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165624543705055273/image_13-4.webp?ex=65478773&is=65351273&hm=9d53d07c0349e7944f7460e72c835a1c13c7d23507ccb7bc56b88b5c1baccd01&=&width=574&height=676",
										label: "red",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165624543231090789/image_13-5.webp?ex=65478773&is=65351273&hm=9a819a232e1f75cd283e85c7d230356beb5b4b46805f814f65777b8ad3265ddd&=&width=574&height=676",
										color2: "#D70909",
										name: "Suisse",
									},
									{
										color: "#075D70",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165620872388817027/image_13-39.webp?ex=65478408&is=65350f08&hm=dc5056d1042b66f46d70a45ff048750f2f00c438d9322acccfd9e0b835bc3830&=&width=574&height=676",
										label: "cyan",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165620871801610250/image_13-38.webp?ex=65478408&is=65350f08&hm=6f22cd4b8959ba993476ce75e2e49cabba488c40443c6e9f3c34fe262785b254&=&width=574&height=676",
										color2: "#07B7EF",
										name: "Argentine",
									},
									{
										name: "Brésil",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165621348391977040/image_13-28.webp?ex=65478479&is=65350f79&hm=df39713462ecd72a82deb11887c7d6a67699cb586dc9e00d139ec6726d2a9578&=&width=574&height=676",
										image: "",
										label: "yellow",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165621348878524497/image_13-29.webp?ex=65478479&is=65350f79&hm=9889eee895a4c7d6ffb01e36b2b2a8b4a8f72721c419f6035f03e7761d07f919&=&width=574&height=676",
										color2: "#FFC731",
										color: "#FFBA00",
									},
									{
										color: "#FFBA00",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165619972228272208/image_13-2.webp?ex=65478331&is=65350e31&hm=2d3fca0da944b0321bfaf0dd8322d2d4eb1442d11020a2943a8ac7b50e14c79f&=&width=574&height=676",
										label: "yellow",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165619971573948486/image_13-3.webp?ex=65478331&is=65350e31&hm=22dee15ad6befea686bf02b64b0fd06f05cc7a4bc9e773f9fa562efb50e95bcd&=&width=574&height=676",
										color2: "#FFC731",
										name: "Colombie",
									},
									{
										color: "#075D70",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165620236385533972/image_13-8.webp?ex=65478370&is=65350e70&hm=8c31a3235adf4506db707c2ca18688cf7104719c64d047e3fa48e5fd55a8c291&=&width=574&height=676",
										label: "cyan",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165620235928338442/image_13-9.webp?ex=65478370&is=65350e70&hm=56455ef05ca3c63b3093fab0c6afc53b4abd45f4d2510d4b5fe9536181f91c8f&=&width=574&height=676",
										color2: "#07B7EF",
										name: "Uruguay",
									},
									{
										color: "#0E551D",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165620462710169656/image_13-14.webp?ex=654783a6&is=65350ea6&hm=af8e29047587b1704a68dca3969e0e9efaf0221fb2677659e0e5214f10f7b0ae&=&width=574&height=676",
										label: "green",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165620461976158318/image_13-15.webp?ex=654783a6&is=65350ea6&hm=17e90b437dc4e16182f2f25031d3df00438e394388bdbf632ec94c547a8307eb&=&width=574&height=676",
										color2: "#00C92C",
										name: "Mexique",
									},
									{
										color: "#7A2929",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165622078511259709/image_15.webp?ex=65478527&is=65351027&hm=8075cd90321b06585f7b9a3530231fdeb9c5cea99da6e475b697709e7f64000a&=&width=574&height=676",
										label: "red",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165622078033100810/image_13-17.webp?ex=65478527&is=65351027&hm=c63cbd87a1e5ce8659ee26a39e37afcbc9b4bc30fc9abc65438cced0df1ab5b2&=&width=574&height=676",
										color2: "#D70909",
										name: "Chili",
									},
									{
										color: "#7A2929",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165622238045806762/image_14.webp?ex=6547854d&is=6535104d&hm=bea37dea84b641116a8eda0caef90cfe845db444f2385e5919a39a3e119ca365&=&width=574&height=676",
										label: "red",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165622237374726154/image_13-17.webp?ex=6547854d&is=6535104d&hm=f300d7e90133c269d6a92f049bb564975d59cd232952c0aff67ec2621ae8293b&=&width=574&height=676",
										color2: "#D70909",
										name: "Costa Rica",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165621711870378085/image_19.webp?ex=654784d0&is=65350fd0&hm=f3b10b69dc1d5b7ecd23959b8774e00bb01822f8436d3b9eb1d9390c0bbcbe89&=&width=574&height=676",
										label: "white",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165621711341887498/image_18.webp?ex=654784d0&is=65350fd0&hm=2234f79ed7e1ce8128a6aa37cbc8d5caaf34415237fbc8902e9aaea5698878c3&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Honduras",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165624440957173830/image_13.webp?ex=6547875a&is=6535125a&hm=71193b53e52d72edfd2f4759e7936e4e4874b4af5c0b84d2f398e9d5e84f762e&=&width=574&height=676",
										label: "white",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165624440332230796/image_13-1.webp?ex=6547875a&is=6535125a&hm=17414a8256a2d3a7b07d97a7041e3352f424bd6c4f3a9b92854be605cc8f0f55&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Etats-Unis",
									},
									{
										color: "#7A2929",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165620041467826206/image_13-4.webp?ex=65478342&is=65350e42&hm=8384522306da768440b6ea83a0d50bd0dbcc293888ddcd8ce00f26b911369f85&=&width=574&height=676",
										label: "red",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165620040947744879/image_13-5.webp?ex=65478341&is=65350e41&hm=0d0ea3f5d4d724aaaacc254cc743aab4c2c3477f77252f3436bec344bd2215d6&=&width=574&height=676",
										color2: "#D70909",
										name: "Canada",
									},
									{
										color: "#0E551D",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165620335287226368/image_13-10.webp?ex=65478388&is=65350e88&hm=58a80fd5c4f39d31d3e884e596b08f26c87f3ac6a95d8b154536c2060df17537&=&width=574&height=676",
										label: "green",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165620334800678912/image_13-11.webp?ex=65478387&is=65350e87&hm=c7d0d8ccdb6b3dcb45877b74f8b9fd65013a80c249d8d6b9484c3fc52352a501&=&width=574&height=676",
										color2: "#00C92C",
										name: "Algérie",
									},
									{
										color: "#7A2929",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165621449827024936/image_13-22.webp?ex=65478491&is=65350f91&hm=094eb20c318a2714a13d09dff25d0ba30e916860aab3bbb172e1957368dc23ad&=&width=574&height=676",
										label: "red",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165621448929456259/image_13-23.webp?ex=65478491&is=65350f91&hm=a3a39531c281eda5e9de0d1d6bbbb87bb786caf7043df355de520ad84212df82&=&width=574&height=676",
										color2: "#D70909",
										name: "Tunisie",
									},
									{
										color: "#7A2929",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165620614149722233/image_13-18.webp?ex=654783ca&is=65350eca&hm=68bb99e9a9179d5c6754e362a05427f11df946981ed3c5e4d89049025d92911c&=&width=574&height=676",
										label: "red",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165620613575098408/image_13-19.webp?ex=654783ca&is=65350eca&hm=3bac02202a0c6c3b100c897ff8a69e3db5ba83576bd559366fe20757f69f58ad&=&width=574&height=676",
										color2: "#D70909",
										name: "Maroc",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165621047790419988/image_23.webp?ex=65478431&is=65350f31&hm=431ac74ed0f9b304e2d78efd3f48494ffea684ee27fa57449b7c3396c23e9d10&=&width=574&height=676",
										label: "white",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165621047236767775/image_22.webp?ex=65478431&is=65350f31&hm=1b6b66027069e581bebc114746d7f821dc583aeff143f5c0fb8495fca48513ec&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Turquie",
									},
									{
										color: "#FFBA00",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165620989183410257/image_21.webp?ex=65478424&is=65350f24&hm=8340f2877487b654b2ac52b9d90470f09b0ae30008927d20fb9abbc3c6434216&=&width=574&height=676",
										label: "yellow",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165620988709441536/image_20.webp?ex=65478423&is=65350f23&hm=7fe4ef5a05887569f91b4fb6a0bce3f2a50bf35f8cee4941a0e7e493266be896&=&width=574&height=676",
										color2: "#FFC731",
										name: "Jamaique",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165621911007531120/image_13.webp?ex=654784ff&is=65350fff&hm=82fe98557ecf5b6611fd100dc746e26879545fa43ad05e5f4e3a430e892e6886&=&width=574&height=676",
										label: "white",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165621909870874735/image_13-1.webp?ex=654784ff&is=65350fff&hm=7d6fc5d8dfeb8358e5e35abc57bd6b7af364c38fa1a6afa16227fd94538ec8fc&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Japon",
									},
									{
										color: "#AFC0B6",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165620120140398683/image_13-6.webp?ex=65478354&is=65350e54&hm=67ae879d702a5ae73b71c7eca38315ac115b82191bcd9074085ad20fc2002d62&=&width=574&height=676",
										label: "white",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165620119662231582/image_13-7.webp?ex=65478354&is=65350e54&hm=11ce1a7d5a7be2072b58ae6a150f88610e453b6b85e9b095761cd834ad6f6bb7&=&width=574&height=676",
										color2: "#FFFFFF",
										name: "Los Angeles Galaxies",
									},
									{
										color: "#000000",
										icon2: "https://media.discordapp.net/attachments/1156267374975143987/1165620412672118794/image_13-12.webp?ex=6547839a&is=65350e9a&hm=dd65c1d0955ea49c869a5a8943794f3367fce82fda4729bb6acd173c8225c0d1&=&width=574&height=676",
										label: "black",
										icon: "https://media.discordapp.net/attachments/1156267374975143987/1165620412143640616/image_13-13.webp?ex=6547839a&is=65350e9a&hm=770d0a55d51648d3fe7188d2e42bc3a819ff9353e447766b451ea8804f864ffc&=&width=574&height=676",
										color2: "#7D7D7D",
										name: "Inter Miami",
									},
								],
								customFields: ["NOM", "Numéro"],
								name: "FOOTBALL",
								image2: "https://media.discordapp.net/attachments/1156267374975143987/1165620335287226368/image_13-10.webp?ex=65478388&is=65350e88&hm=58a80fd5c4f39d31d3e884e596b08f26c87f3ac6a95d8b154536c2060df17537&=&width=574&height=676",
							},
							{
								price: 2500,
								image: "https://media.discordapp.net/attachments/1156267374975143987/1166459273849602079/image_13_14.webp?ex=654a90da&is=65381bda&hm=16c24a786b82f1a716a8d1d9d06eb3b06bf86c20fac2f1e0a9555ccd47f12290&=&width=570&height=671",
								variations: [
									{
										color: "#AFC0B6",
										icon2: "https://cdn.discordapp.com/attachments/1156267374975143987/1166459273849602079/image_13_14.webp?ex=654a90da&is=65381bda&hm=16c24a786b82f1a716a8d1d9d06eb3b06bf86c20fac2f1e0a9555ccd47f12290&",
										label: "white",
										icon: "https://cdn.discordapp.com/attachments/1156267374975143987/1166459273291776050/image_13_15.webp?ex=654a90da&is=65381bda&hm=66750238b2417745f878c6db940e8ca27b31c8690b9763d85e86749c76ded36d&",
										color2: "#FFFFFF",
										name: "Cuir",
									},
									{
										color: "#7A2929",
										icon2: "https://cdn.discordapp.com/attachments/1156267374975143987/1166459677454913688/image_13_19.webp?ex=654a913a&is=65381c3a&hm=4f8a58938305a2cbbbfedbd1254815c15feb0bd71a4a87e5ec9455beb1fcbb21&",
										label: "red",
										icon: "https://cdn.discordapp.com/attachments/1156267374975143987/1166459276110336060/image_13_16.webp?ex=654a90db&is=65381bdb&hm=33f77d1122af1c7f0ea2b86ce70dcc95bb5cef3e52f398c678536ccfcd75a8c4&",
										color2: "#D70909",
										name: "Cuir",
									},
									{
										color: "#FFBA00",
										icon2: "https://cdn.discordapp.com/attachments/1156267374975143987/1166459275065966673/image_13_13.webp?ex=654a90da&is=65381bda&hm=6bcf253bf959bb14db413cecf1d0caafee5eba736f41c91cf84370cd7a91c02f&",
										label: "yellow",
										icon: "https://cdn.discordapp.com/attachments/1156267374975143987/1166459274487140392/image_13_12.webp?ex=654a90da&is=65381bda&hm=6870d96bc478a21f183f97657dce1a9edb8c051178f2a5c1dede3e9342cbf191&",
										color2: "#FFC731",
										name: "Cuir",
									},
									{
										color: "#AFC0B6",
										icon2: "https://cdn.discordapp.com/attachments/1156267374975143987/1166459277079220266/image_13_18.webp?ex=654a90db&is=65381bdb&hm=ec1570bb41df6c24fed44beb1dbce31c52c6b47c591e6a5c9fd20bcf5e8ec59f&",
										label: "white",
										icon: "https://cdn.discordapp.com/attachments/1156267374975143987/1166459276575916052/image_13_17.webp?ex=654a90db&is=65381bdb&hm=11c7f261230fc3ac29fec9d0ad27719fc938978fae93a50ed8ecd7a1cf8ae3cb&",
										color2: "#FFFFFF",
										name: "Cuir",
									},
								],
								name: "Cuir",
								customFields: ["Logo", "Texte"],
							},
						],
						new: true,
					},
				],
			}
		: context.data;

	const back = () => {
		if (isInSubCategory) {
			setIsInSubCategory(false);
			setSelectedCategory(0);
			setSelectedItem(0);
		} else {
			postAsync("backToBoutique", { custom: data.type });
		}
		playBoutiqueLeave();
	};

	useKey("Escape", back);

	useKey("ArrowDown", () => {
		if (activeCategory < data.categories.length - 1) {
			if (activeCategory + 1 == selectedCategory) {
				if (activeCategory <= data.categories.length - 3) setActiveCategory(activeCategory + 2);
			} else setActiveCategory(activeCategory + 1);
		}
	});

	useKey("ArrowUp", () => {
		if (activeCategory > 0) {
			if (activeCategory - 1 == selectedCategory) {
				if (activeCategory >= 2) setActiveCategory(activeCategory - 2);
			} else setActiveCategory(activeCategory - 1);
		}
	});

	useKey("ArrowLeft", () => {
		if (selectedItem > 0) {
			setSelectedItem(selectedItem - 1);
		} else {
			setSelectedItem(data.categories[selectedCategory].items.length - 1);
		}
	});

	useKey("ArrowRight", () => {
		if (selectedItem < data.categories[selectedCategory].items.length - 1) {
			setSelectedItem(selectedItem + 1);
		} else {
			setSelectedItem(0);
		}
	});

	useBackspaceKey(() => {
		// if any text input is focused, don't go back
		if (document.activeElement?.tagName === "INPUT") return;

		back();
	});

	useEnterKey(() => {
		setSelectedCategory(activeCategory);
	});

	const arrowUp = () => {
		// If items.length === 1
		if (data.categories[selectedCategory].items.length === 1) {
			// Up the variation
			if (selectedVariation < data.categories[selectedCategory].items[selectedItem].variations.length - 1) {
				setSelectedVariation(selectedVariation + 1);
			} else {
				setSelectedVariation(0);
			}
		} else {
			// Up the item
			if (selectedItem < data.categories[selectedCategory].items.length - 1) {
				setSelectedItem(selectedItem + 1);
			} else {
				setSelectedItem(0);
			}
		}
	};

	const arrowDown = () => {
		// If items.length === 1
		if (data.categories[selectedCategory].items.length === 1) {
			// Down the variation
			if (selectedVariation > 0) {
				setSelectedVariation(selectedVariation - 1);
			} else {
				setSelectedVariation(data.categories[selectedCategory].items[selectedItem].variations.length - 1);
			}
		} else {
			// Down the item
			if (selectedItem > 0) {
				setSelectedItem(selectedItem - 1);
			} else {
				setSelectedItem(data.categories[selectedCategory].items.length - 1);
			}
		}
	};

	const getImage = (use2: boolean) => {
		if (use2) {
			if (data.categories[selectedCategory]?.items[selectedItem]?.variations[selectedVariation]?.icon2) {
				return data.categories[selectedCategory]?.items[selectedItem]?.variations[selectedVariation]?.icon2.split("?")[0];
			} else {
				return data.categories[selectedCategory]?.items[selectedItem]?.image2.split("?")[0];
			}
		} else {
			if (data.categories[selectedCategory]?.items[selectedItem]?.variations[selectedVariation]?.icon) {
				return data.categories[selectedCategory]?.items[selectedItem]?.variations[selectedVariation]?.icon.split("?")[0];
			} else {
				return data.categories[selectedCategory]?.items[selectedItem]?.image.split("?")[0];
			}
		}
	};

	return (
		<>
			<BoutiqueHeader data={data} server={SERVER} />
			{data.isLiveries ? (
				<section className="BoutiqueItem">
					<div className="Left">
						<h1>{data.categories[selectedCategory]?.title}</h1>
						<p>{data.categories[selectedCategory]?.subtitle}</p>
						<div className="Variations">
							<h3>Couleurs</h3>
							<div className={data.type == "custom" ? "custom scrollable" : "scrollable"}>
								{(data.categories[selectedCategory]?.items[selectedItem]?.variations.length === 0
									? [
											{
												color: "#AFC0B6",
												color2: "#FFFFFF",
												icon: "",
												label: "White",
											},
											{
												color: "#051A66",
												color2: "#0362F1",
												icon: "",
												label: "Blue",
											},
											{
												color: "#0E551D",
												icon: "",
												label: "Green",
												color2: "#00C92C",
											},
											{
												color: "#7A2929",
												color2: "#D70909",
												icon: "",
												label: "Red",
											},
											{
												color: "#000000",
												color2: "#7D7D7D",
												icon: "",
												label: "Black",
											},
										]
									: data.categories[selectedCategory]?.items[selectedItem]?.variations
								).map((variation: any, index: number) => (
									<div
										key={index}
										className={`Variation ${index == selectedVariation ? "Selected" : ""}`}
										// linear-gradient(270deg, #C432E9 7.03%, #6E0988 94.89%);
										style={{
											background: `linear-gradient(0deg, ${variation.color} 7.03%, ${
												variation.color2 || variation.color
											} 94.89%)`,
										}}
										onClick={() => {
											setSelectedVariation(index);
											playOnHoverSound();
										}}>
										{data.type == "custom" && <img src={variation.image} />}
									</div>
								))}
							</div>
						</div>
						<div className="Variations">
							<h3>
								{data.categories[selectedCategory]?.items[selectedItem]?.customFields.length > 0
									? data.categories[selectedCategory]?.items[selectedItem]?.customFields[0]
									: "Ecriture"}
							</h3>
							<input type="text" />
						</div>
						<div className="Variations">
							<h3>Couleur du texte</h3>
							<div className={data.type == "custom" ? "custom" : ""}>
								{(data.categories[selectedCategory]?.items[selectedItem]?.variations.length === 0
									? [
											{
												color: "#AFC0B6",
												color2: "#FFFFFF",
												icon: "",
												label: "White",
											},
											{
												color: "#051A66",
												color2: "#0362F1",
												icon: "",
												label: "Blue",
											},
											{
												color: "#0E551D",
												icon: "",
												label: "Green",
												color2: "#00C92C",
											},
											{
												color: "#7A2929",
												color2: "#D70909",
												icon: "",
												label: "Red",
											},
											{
												color: "#000000",
												color2: "#7D7D7D",
												icon: "",
												label: "Black",
											},
										]
									: data.categories[selectedCategory]?.items[selectedItem]?.variations
								).map((variation: any, index: number) => (
									<div
										key={index}
										className={`Variation ${index == selectedVariation2 ? "Selected" : ""}`}
										style={{
											background: `linear-gradient(0deg, ${variation.color} 7.03%, ${
												variation.color2 || variation.color
											} 94.89%)`,
										}}
										onClick={() => {
											setSelectedVariation2(index);
											playOnHoverSound();
										}}>
										<img src={variation.image} />
									</div>
								))}
							</div>
						</div>
						<div className="Variations">
							<h3>
								{data.categories[selectedCategory]?.items[selectedItem]?.customFields.length > 0
									? data.categories[selectedCategory]?.items[selectedItem]?.customFields[1]
									: "Logo"}
							</h3>
							<input type="text" />
						</div>
						<button className="BackToBoutique" onClick={back}>
							Retour
						</button>
					</div>
					<div className="Center">
						<h3
							className={
								data.categories[selectedCategory]?.items[selectedItem]?.image2
									? "doubleImage"
									: data.isLiveries
										? "livery"
										: ""
							}>
							{data.categories[selectedCategory]?.items[selectedItem]?.variations[selectedVariation]?.name ||
								data.categories[selectedCategory]?.items[selectedItem]?.name}{" "}
							<span>{data.categories[selectedCategory]?.items[selectedItem]?.variations[selectedVariation]?.label}</span>
						</h3>
						<div
							className={`CurrentItem ${
								data.categories[selectedCategory]?.items[selectedItem]?.image2
									? "doubleImage"
									: data.isLiveries
										? "livery"
										: ""
							}`}>
							<span
								style={{ transform: "rotate(0deg)" }}
								className="StylizedArrow"
								onClick={() => {
									arrowDown();
									playOnHoverSound();
								}}>
								<ArrowBackIosRoundedIcon />
							</span>
							<div>
								<img
									className={
										data.categories[selectedCategory]?.items[selectedItem]?.image2
											? "doubleImage"
											: data.isLiveries
												? "livery"
												: ""
									}
									src={getImage(false)}
								/>
								{data.categories[selectedCategory]?.items[selectedItem]?.image2 && (
									<img className="doubleImage" src={getImage(true)} />
								)}
							</div>
							<span
								style={{ transform: "rotate(0deg)" }}
								className="StylizedArrow Rotate"
								onClick={() => {
									arrowUp();
									playOnHoverSound();
								}}>
								<ArrowBackIosRoundedIcon />
							</span>
						</div>
						<div className="bottom">
							<small>Livraison en 48h: Valider la création de votre liveries via discord</small>
							<div className="BuyItem">
								<button
									onClick={() => {
										// if there is a selected item
										if (data.categories[selectedCategory]?.items[selectedItem]) {
											postAsync("confirmBuyItem", {
												category: selectedCategory,
												item: data.categories[selectedCategory]?.items[selectedItem],
												selectedItem: selectedItem,
												variation: selectedVariation,
												variation2: selectedVariation2,
												customFields: data.categories[selectedCategory]?.items[selectedItem]?.customFields?.map(
													(field: string, index: number) => ({
														name: field,
														value: document.querySelectorAll<HTMLInputElement>(".Variations input")[index]
															.value,
													}),
												),
											});
										} else {
											postAsync("confirmBuyItem", {
												category: selectedCategory,
												item: data.categories[selectedCategory]?.items[0],
												selectedItem: 0,
												variation: 0,
												variation2: 0,
												customFields: data.categories[selectedCategory]?.items[0]?.customFields?.map(
													(field: string, index: number) => ({
														name: field,
														value: document.querySelectorAll<HTMLInputElement>(".Variations input")[index]
															.value,
													}),
												),
											});
										}

										playOnClickSound();
									}}>
									Acheter
								</button>
								<p>{data.categories[selectedCategory]?.items[selectedItem]?.price || 2500}</p>
							</div>
						</div>
					</div>
					<div className="Right">
						<div className="CollectionType">
							<p>Collection</p>
							<p className={data.type == "custom" ? "Custom" : "Premium"}>{data.type || "Premium"}</p>
						</div>
						<div className="LiveriesCategories">
							{isInSubCategory
								? data.categories[selectedCategory].items.map(
										(item: any, index: number) =>
											index !== selectedItem && (
												<div
													key={index}
													className={`Category ${item.new ? "new" : ""} ${
														index == activeCategory ? "active" : ""
													}`}
													style={{ backgroundImage: `url(${item.image})` }}
													onClick={() => {
														setSelectedItem(index);
														playOnHoverSound();
													}}>
													<h4>{item.name}</h4>
												</div>
											),
									)
								: data.categories.map(
										(category: any, index: number) =>
											index !== selectedCategory && (
												<div
													key={index}
													className={`Category ${category.new ? "new" : ""} ${
														index == activeCategory ? "active" : ""
													}`}
													style={{ backgroundImage: `url(${category.image})` }}
													onClick={() => {
														setSelectedCategory(index);
														setIsInSubCategory(true);
														playOnHoverSound();
													}}>
													<h4>{category.subtitle}</h4>
												</div>
											),
									)}
						</div>
					</div>
				</section>
			) : (
				<section className="BoutiqueItem">
					<div className="Left">
						<h1>{data.categories[selectedCategory]?.title}</h1>
						<p>{data.categories[selectedCategory]?.subtitle}</p>
						<div className="Variations">
							<h3>Couleurs</h3>
							<div className={data.type == "custom" ? "custom scrollable" : "scrollable"}>
								{data.categories[selectedCategory].items[selectedItem]?.variations.map((variation: any, index: number) => (
									<div
										key={index}
										className={`Variation ${index == selectedVariation ? "Selected" : ""}`}
										// linear-gradient(270deg, #C432E9 7.03%, #6E0988 94.89%);
										style={{
											background: `linear-gradient(0deg, ${variation.color} 7.03%, ${
												variation.color2 || variation.color
											} 94.89%)`,
										}}
										onClick={() => {
											setSelectedVariation(index);
											playOnHoverSound();
										}}>
										<img src={variation.image} />
									</div>
								))}
							</div>
						</div>
						{data.isLiveries && (
							<>
								<div className="Variations">
									<h3>
										{data.categories[selectedCategory]?.items[selectedItem]?.customFields
											? data.categories[selectedCategory]?.items[selectedItem]?.customFields[0]
											: "Ecriture"}
									</h3>
									<input type="text" />
								</div>
								<div className="Variations">
									<h3>Couleur du texte</h3>
									<div className={data.type == "custom" ? "custom" : ""}>
										{data.categories[selectedCategory].items[selectedItem]?.variations.map(
											(variation: any, index: number) => (
												<div
													key={index}
													className={`Variation ${index == selectedVariation2 ? "Selected" : ""}`}
													style={{
														background: `linear-gradient(0deg, ${variation.color} 7.03%, ${
															variation.color2 || variation.color
														} 94.89%)`,
													}}
													onClick={() => {
														setSelectedVariation2(index);
														playOnHoverSound();
													}}>
													<img src={variation.image} />
												</div>
											),
										)}
									</div>
								</div>
								<div className="Variations">
									<h3>
										{data.categories[selectedCategory]?.items[selectedItem]?.customFields
											? data.categories[selectedCategory]?.items[selectedItem]?.customFields[1]
											: "Logo"}
									</h3>
									<input type="text" />
								</div>
							</>
						)}
						<button className="BackToBoutique" onClick={back}>
							Retour
						</button>
					</div>
					<div className="Center">
						<h3
							className={
								data.categories[selectedCategory].items[selectedItem]?.image2 ||
								data.categories[selectedCategory].items[selectedItem]?.icon2
									? "doubleImage"
									: data.isLiveries
										? "livery"
										: ""
							}>
							{data.categories[selectedCategory].items[selectedItem]?.variations[selectedVariation]?.name ||
								data.categories[selectedCategory].items[selectedItem]?.name}{" "}
							<span>{data.categories[selectedCategory].items[selectedItem]?.variations[selectedVariation]?.label}</span>
						</h3>
						<div
							className={`CurrentItem ${
								data.categories[selectedCategory].items[selectedItem]?.image2 ||
								data.categories[selectedCategory].items[selectedItem]?.icon2
									? "doubleImage"
									: data.isLiveries
										? "livery"
										: ""
							}`}>
							<span
								style={{ transform: "rotate(0deg)" }}
								className="StylizedArrow"
								onClick={() => {
									arrowDown();
									playOnHoverSound();
								}}>
								<ArrowBackIosRoundedIcon />
							</span>
							<div>
								<img
									className={
										data.categories[selectedCategory].items[selectedItem]?.variations[selectedVariation]?.image2 ||
										data.categories[selectedCategory].items[selectedItem]?.variations[selectedVariation]?.icon2
											? "doubleImage"
											: data.isLiveries
												? "livery"
												: ""
									}
									src={
										data.categories[selectedCategory].items[selectedItem]?.variations[selectedVariation]?.icon ||
										data.categories[selectedCategory].items[selectedItem]?.image
									}
								/>
								{(data.categories[selectedCategory].items[selectedItem]?.variations[selectedVariation]?.image2 ||
									data.categories[selectedCategory].items[selectedItem]?.variations[selectedVariation]?.icon2) && (
									<img
										className="doubleImage"
										src={
											data.categories[selectedCategory].items[selectedItem]?.variations[selectedVariation]?.icon2 ||
											data.categories[selectedCategory].items[selectedItem]?.variations[selectedVariation]?.image2
										}
									/>
								)}
							</div>
							<span
								style={{ transform: "rotate(0deg)" }}
								className="StylizedArrow Rotate"
								onClick={() => {
									arrowUp();
									playOnHoverSound();
								}}>
								<ArrowBackIosRoundedIcon />
							</span>
						</div>
						{!data.isLiveries && data.categories[selectedCategory].items[selectedItem]?.customFields && (
							<div className="CustomFields">
								{data.categories[selectedCategory].items[selectedItem]?.customFields.map((field: string, index: number) => (
									<fieldset key={index}>
										<label>{field}</label>
										<input
											type={field === "Numéro" ? "number" : "texte"}
											defaultValue={
												data.categories[selectedCategory].items[selectedItem]?.variations[selectedVariation]
													? data.categories[selectedCategory].items[selectedItem]?.variations[selectedVariation][
															field
														] || ""
													: ""
											}
										/>
									</fieldset>
								))}
							</div>
						)}
						{data.isLiveries ? (
							<div className="bottom">
								<small>Livraison en 48h: Valider la création de votre liveries via discord</small>
								<div className="BuyItem">
									<button
										onClick={() => {
											postAsync("confirmBuyItem", {
												category: selectedCategory,
												item: data.categories[selectedCategory].items[selectedItem],
												selectedItem: selectedItem,
												variation: selectedVariation,
												variation2: selectedVariation2,
												customFields: data.categories[selectedCategory].items[selectedItem]?.customFields?.map(
													(field: string, index: number) => ({
														name: field,
														value: document.querySelectorAll<HTMLInputElement>(".Variations input")[index]
															.value,
													}),
												),
											});
											playOnClickSound();
										}}>
										Acheter
									</button>
									<p>{data.categories[selectedCategory].items[selectedItem]?.price || 2500}</p>
								</div>
							</div>
						) : (
							<small>
								{data.type == "custom"
									? "Livraison en 48h dans votre inventaire"
									: data.isVeh
										? "Rendez vous au concessionnaire pour découvrir le véhicule"
										: "Rendez-vous en magasin pour essayer le vetement gratuitement"}
							</small>
						)}
					</div>
					<div className="Right">
						<div className="CollectionType">
							<p>Collection</p>
							<p className={data.type == "custom" ? "Custom" : "Premium"}>{data.type || "Premium"}</p>
						</div>
						{data.type == "custom" ? (
							<>
								<div className="CustomCategories">
									{data.categories.map(
										(category: any, index: number) =>
											index !== selectedCategory && (
												<div
													key={index}
													className={`Category ${category.new ? "new" : ""} ${
														index == activeCategory ? "active" : ""
													}`}
													style={{ backgroundImage: `url(${category.image})` }}
													onClick={() => {
														setSelectedCategory(index);
														playOnHoverSound();
													}}>
													<h4>{category.title}</h4>
													<p>{category.subtitle}</p>
												</div>
											),
									)}
								</div>
								<div className="BuyItem">
									<button
										onClick={() =>
											postAsync("confirmBuyItem", {
												category: selectedCategory,
												item: data.categories[selectedCategory].items[selectedItem],
												selectedItem: selectedItem,
												variation: selectedVariation,
												customFields: data.categories[selectedCategory].items[selectedItem]?.customFields.map(
													(field: string, index: number) => ({
														name: field,
														value: document.querySelectorAll<HTMLInputElement>(".CustomFields input")[index]
															.value,
													}),
												),
											})
										}>
										Acheter
									</button>

									{data.categories[selectedCategory].items[selectedItem]?.reduction ? (
										<>
											<div className="reduction">
												<p className="price">
													&nbsp;{+data.categories[selectedCategory].items[selectedItem]?.price || 2500}&nbsp;
												</p>
												<p className="price2">{data.categories[selectedCategory].items[selectedItem]?.reduction}</p>
											</div>
										</>
									) : (
										<p>{data.categories[selectedCategory].items[selectedItem]?.price || 2500}</p>
									)}
								</div>
							</>
						) : data.isVeh ? (
							<div className="LiveriesCategories">
								{data.categories.map(
									(category: any, index: number) =>
										index !== selectedCategory && (
											<div
												key={index}
												className={`Category ${category.new ? "new" : ""} ${
													index == activeCategory ? "active" : ""
												}`}
												style={{ backgroundImage: `url(${category.image})`, backgroundSize: "80%" }}
												onClick={() => {
													setSelectedCategory(index);
													setIsInSubCategory(true);
													playOnHoverSound();
												}}>
												<h4>{category.subtitle}</h4>
											</div>
										),
								)}
							</div>
						) : (
							<div className="Categories">
								{data.categories.map(
									(category: any, index: number) =>
										index !== selectedCategory && (
											<div
												key={index}
												className={`Category ${category.new ? "new" : ""} ${
													index == activeCategory ? "active" : ""
												}`}
												onClick={() => {
													setSelectedCategory(index);
													playOnHoverSound();
												}}>
												<img src={category.image} />
												<span>
													<h4>{category.title}</h4>
													<p>{category.subtitle}</p>
												</span>
											</div>
										),
								)}
							</div>
						)}
					</div>
				</section>
			)}
		</>
	);
};

export default BoutiqueItem;
