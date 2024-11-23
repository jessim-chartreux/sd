import "swiper/swiper-bundle.css";
import "./autoecole.scss";

import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

import { GlobalContext } from "../../app";
import { close } from "../../hooks/useExitKeys";
import exampleQuestion from "./data.json";
import { isDev } from "../../utils/isDev";
import { postAsync } from "../../utils/postAsync";
import { useExitKeys } from "../../hooks/useExitKeys";

interface IAnswer {
	name: string;
	letter: string;
	selected: boolean;
}

interface IAutoEcoleData {
	name: string;
	picture: string;
	answer: IAnswer[];
}

const time_test = 30; // 10 secondes

const AutoEcole: React.FC = () => {
	useExitKeys();

	const [volume, setVolume] = useState("50");
	const [time, setTime] = useState(time_test); // 120
	const [questionSelected, setQuestionSelected] = useState(0);
	const [questions, setQuestions] = useState(null);
	const [status, setStatus] = useState(0); // default 1
	const [note, setNote] = useState(0); // 0
	const intervalQuestion = useRef(null);

	const context = useContext(GlobalContext);

	const handleClick = async (questionindex: number, answerindex: number) => {
		const questions_ = { ...questions };
		questions_.answer[answerindex].selected = !questions_.answer[answerindex].selected;

		setQuestions(questions_);
	};

	const data: IAutoEcoleData[] | null = isDev ? exampleQuestion : (context.data as IAutoEcoleData[]);

	const nextQuestion = useCallback(async () => {
		const sendQuestions = () => {
			if (!isDev) {
				postAsync("autoecole__callback", {
					action: "sendQuestions",
					questions: questions,
					time: time,
				});
			}
		};

		if (status == 1) {
			sendQuestions();
			const progressbar = Array.from(
				document.getElementsByClassName("autoecole_container_progress_inner") as HTMLCollectionOf<HTMLElement>,
			);
			if (typeof progressbar[0] != "undefined") {
				progressbar[0].style.transition = null;
				progressbar[0].style.width = "100%";
			}
			clearInterval(intervalQuestion.current);
			if (questionSelected >= data.length - 1) {
				takeNote();
			} else {
				setQuestionSelected(questionSelected => (questionSelected = questionSelected + 1));
			}
		}
	}, [data.length, questionSelected, questions, status, time]);

	const takeNote = async () => {
		if (!isDev) {
			const result = await postAsync("autoecole__callback", {
				action: "takeNote",
			});
			setNote(parseInt(result.note));

			setStatus(2);
		} else {
			setNote(18);
			setStatus(2);
		}
	};

	useEffect(() => {
		if (status === 1) {
			setQuestions(data[questionSelected]);
			setTime(time_test);
			const progressbar = Array.from(
				document.getElementsByClassName("autoecole_container_progress_inner") as HTMLCollectionOf<HTMLElement>,
			);

			const interval_2 = setInterval(() => {
				if (status === 1) {
					progressbar[0].style.transition = "width " + time_test + "s ease-in-out";
				}
				clearInterval(interval_2);
			}, 100);

			const interval_ = setInterval(() => {
				if (status === 1) {
					progressbar[0].style.width = "0px";
				}
				clearInterval(interval_);
			}, 100);
			const intervalChangeQuestion = setInterval(() => {
				if (status === 1) {
					nextQuestion();
				}
				clearInterval(intervalChangeQuestion);
			}, time_test * 1000);
			intervalQuestion.current = intervalChangeQuestion;
		}
	}, [data, nextQuestion, questionSelected, status]);

	return (
		<div
			style={{
				background: "transparent url('https://cdn.sacul.cloud/v2/vision-cdn/autoecole/tablette.webp') 0% 0% no-repeat padding-box",
			}}
			className="autoecole d-flex justify-content-center align-items-center">
			<div className="autoecole_container d-flex flex-column ">
				<div className="autoecole_container_header d-flex flex-row justify-content-between">
					<div className="d-flex justify-content-center align-items-center justify-content-center">
						<img src="https://cdn.sacul.cloud/v2/vision-cdn/autoecole/questions-et-reponses.webp"></img>
						<div className="d-flex justify-content-center align-items-center flex-row">
							{status === 0 && <span className="autoecole_container_header_text">Début de la session</span>}
							{status === 1 && (
								<span className="autoecole_container_header_text">
									Question :{" "}
									<span className="note">
										<b className="orangeScore">{questionSelected + 1}</b> / {data.length}
									</span>
								</span>
							)}
							{status === 2 && <span className="autoecole_container_header_text">Résultats</span>}
						</div>
					</div>
					<div className="autoecole_container_header_right d-flex justify-content-between">
						<div className="d-flex justify-content-center align-items-center">
							<div className="slidecontainer d-flex justify-content-center align-items-center">
								<input
									type="range"
									min="1"
									max="100"
									value={volume}
									className="slider"
									id="myRange"
									onChange={event => setVolume(event.target.value)}
								/>
							</div>
							<img
								src="https://cdn.sacul.cloud/v2/vision-cdn/autoecole/symbole-dinterface-daugmentation-du-volume.webp"
								className="button"></img>
						</div>

						<img
							onClick={() => close()}
							src="https://cdn.sacul.cloud/v2/vision-cdn/autoecole/logout.webp"
							className="button"></img>
					</div>
				</div>
				{status === 1 && (
					<div className="autoecole_container_progress">
						<div className="autoecole_container_progress_inner"></div>
					</div>
				)}
				{status === 0 && (
					<div className="autoecole_container_middle d-flex justify-content-center flex-column align-items-center">
						<span className="autoecole_container_middle_title">
							Examen du <b className="orangetext">code de la route</b>
						</span>
						<div className="autoecole_container_middle_text">
							<span className="autoecole_container_middle_text_span">
								Vous vous apprêtez à démarrer une <b className="orangetext">session d'examen du code de la route</b>.
							</span>

							<span className="autoecole_container_middle_text_span">
								Vous devrez répondre à une <b className="orangetext">série de 10 questions</b> à choix multiples parmi
								lesquelles vous devrez choisir la ou les bonnes réponses.
							</span>

							<span className="autoecole_container_middle_text_span">
								Vous devez atteindre la <b className="orangetext">note minimale de 7/10</b> pour obtenir votre code de la
								route, qui vous permettra de passer le <b className="orangetext">permis de conduire</b>.
							</span>

							<span className="autoecole_container_middle_text_span">
								Attention, vous devez valider vos réponses <b className="orangetext">avant la fin du minuteur</b>, qui sera
								situé en <b className="orangetext">orange</b> sur le haut de l'écran de la tablette.
							</span>

							<span className="autoecole_container_middle_text_span">
								En cas d'échec, vous pourrez repasser l'examen d'ici une heure.
							</span>

							<span className="autoecole_container_middle_text_span">Bonne chance.</span>
						</div>
					</div>
				)}
				{status === 1 && (
					<div className="autoecole_container_middle d-flex justify-content-center flex-column">
						<img
							className="autoecole_container_middle_picture"
							width={919}
							height={346}
							src={`https://cdn.sacul.cloud/v2/vision-cdn/autoecole/${data[questionSelected].picture}`}
						/>

						<div className="autoecole_container_middle_question">
							<span className="autoecole_container_middle_question_text">{data[questionSelected].name}</span>
							<div className="autoecole_container_middle_question_answer d-flex flex-row justify-content-around">
								<div className="d-flex flex-column">
									{questions?.answer.map((answer, index) => {
										if (index % 2 === 1) {
											return;
										}

										return (
											<div
												key={index}
												className="autoecole_container_middle_question_answer_item d-flex align-items-center flex-row"
												onClick={() => handleClick(questionSelected, index)}>
												<div className="autoecole_container_middle_question_answer_item_icon d-flex justify-content-center align-items-center">
													{answer.letter}
												</div>
												<span className="autoecole_container_middle_question_answer_item_text">{answer.name}</span>
											</div>
										);
									})}
								</div>
								<div className="d-flex flex-column">
									{questions?.answer.map((answer, index) => {
										if (index % 2 === 0) {
											return;
										}

										return (
											<div
												key={index}
												className="autoecole_container_middle_question_answer_item d-flex align-items-center flex-row"
												onClick={() => handleClick(questionSelected, index)}>
												<div className="autoecole_container_middle_question_answer_item_icon d-flex justify-content-center align-items-center">
													{answer.letter}
												</div>
												<span className="autoecole_container_middle_question_answer_item_text">{answer.name}</span>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				)}
				{status === 2 && (
					<div className="autoecole_container_middle d-flex justify-content-center flex-column align-items-center">
						<span className="autoecole_container_middle_title">Félicitations !</span>
						<div className="d-flex justify-content-center flex-column align-items-center">
							<span className="autoecole_container_middle_text_span">Vous avez obtenu la note de :</span>
							<span className="autoecole_container_middle_text_span bold">
								<b className="bold orange">{String(note)}</b>/10
							</span>
							{note >= 7 && (
								<span className="autoecole_container_middle_text_span">
									Ce qui signifie que <b className="orange">vous venez d'obtenir votre code de la route</b> !
								</span>
							)}
							{note < 7 && (
								<span className="autoecole_container_middle_text_span">
									Ce qui signifie que <b className="orange">vous n'avez pas obtenu votre code de la route</b> !
								</span>
							)}
						</div>
					</div>
				)}
				{status === 0 && (
					<div className="autoecole_container_bottom d-flex justify-content-end flex-row align-items-center">
						<button
							onClick={() => setStatus(1)}
							className="autoecole_container_bottom_button d-flex align-items-center flex-row justify-content-center"
							style={{ marginRight: "20px", width: "300px" }}>
							<img
								className="autoecole_container_bottom_button_img"
								src="https://cdn.sacul.cloud/v2/vision-cdn/autoecole/logout.webp"></img>
							<span className="autoecole_container_bottom_button_text">Démarrer une session d'examen</span>
						</button>
					</div>
				)}
				{status === 1 && (
					<div className="autoecole_container_bottom d-flex justify-content-around flex-row align-items-center">
						<div className="d-flex justify-content-center flex-row align-items-center">
							{questions?.answer.map((answer, index) => {
								return (
									<div
										key={index}
										className={`autoecole_container_bottom_answer d-flex align-items-center flex-row justify-content-center ${
											answer.selected ? "selected" : "unselected"
										}`}
										onClick={() => handleClick(questionSelected, index)}>
										<div className="autoecole_container_bottom_answer_icon d-flex justify-content-center align-items-center flex-column">
											<span className="autoecole_container_bottom_answer_icon_top">Réponse</span>
											<span className="autoecole_container_bottom_answer_icon_text">{answer.letter}</span>
										</div>
									</div>
								);
							})}
						</div>

						<button
							onClick={() => nextQuestion()}
							className="autoecole_container_bottom_button d-flex align-items-center flex-row justify-content-center">
							<img
								className="autoecole_container_bottom_button_img"
								src="https://cdn.sacul.cloud/v2/vision-cdn/autoecole/verifier.webp"></img>
							<span className="autoecole_container_bottom_button_text">Valider et passer à la question suivante</span>
						</button>
					</div>
				)}
				{status === 2 && (
					<div className="autoecole_container_bottom d-flex justify-content-end flex-row align-items-center">
						<button
							onClick={() => close()}
							className="autoecole_container_bottom_button d-flex align-items-center flex-row justify-content-center"
							style={{ marginRight: "20px", width: "150px" }}>
							<img
								className="autoecole_container_bottom_button_img"
								src="https://cdn.sacul.cloud/v2/vision-cdn/autoecole/logout.webp"></img>
							<span className="autoecole_container_bottom_button_text">Terminer</span>
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default AutoEcole;
