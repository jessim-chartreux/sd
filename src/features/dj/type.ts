export type myMusicListT = {
	title: string;
	url: string;
};

export type myPlayListT = {
	title: string;
	url: string;
	isActive: boolean;
	pos: number;
};

export type HomeT = {
	setPage: (page: string) => void;
	input: string;
	setInput: (input: string) => void;
	musicPlay: string;
	setMusicPlay: (musicPlay: string) => void;
};

export type PageT = {
	setPage: (page: string) => void;
	page: string;
	setMusicPlay: (musicPlay: string) => void;
};
