import sound from "../onHover.mp3";
import sound2 from "../onClick.mp3";

import sound3 from "../boutiqueEnter.mp3";
import sound4 from "../boutiqueLeave.mp3";

export const playOnHoverSound = () => {
	const audio = new Audio(sound);
	audio.play();
};
export const playOnClickSound = () => {
	const audio = new Audio(sound2);
	audio.play();
};

export const playBoutiqueEnter = () => {
	const audio = new Audio(sound3);
	audio.volume = 0.15;
	audio.play();
};

export const playBoutiqueLeave = () => {
	const audio = new Audio(sound4);
	audio.volume = 0.15;
	audio.play();
};
