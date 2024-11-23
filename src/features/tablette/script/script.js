const shown = document.querySelectorAll(".shown");
const choosen = document.querySelectorAll(".choose");
const drug = document.querySelectorAll(".drug");
const header = document.querySelectorAll(".header-hidden");
const tools = document.querySelectorAll(".tools");
const time = document.querySelectorAll(".time-select");
const thanku = document.querySelectorAll(".thanku");

export function showConnect() {
	for (const show of shown) {
		show.classList.add("shown");

		show.classList.remove("hidden");
	}
	for (const choose of choosen) {
		choose.classList.add("hidden");

		choose.classList.remove("shown");
	}
	for (const drugs of drug) {
		drugs.classList.add("hidden");

		drugs.classList.remove("shown");
	}
	for (const headers of header) {
		headers.classList.add("hidden");

		headers.classList.remove("block");
	}
	for (const tool of tools) {
		tool.classList.add("hidden");

		tool.classList.remove("shown");
	}
}

export function showChoose() {
	for (const choose of choosen) {
		choose.classList.add("shown");

		choose.classList.remove("hidden");
	}
	for (const show of shown) {
		show.classList.add("hidden");

		show.classList.remove("shown");
	}
	for (const headers of header) {
		headers.classList.add("hidden");

		headers.classList.remove("block");
	}
	for (const drugs of drug) {
		drugs.classList.add("hidden");

		drugs.classList.remove("shown");
	}
	for (const tool of tools) {
		tool.classList.add("hidden");

		tool.classList.remove("shown");
	}
	for (const times of time) {
		times.classList.add("hidden");

		times.classList.remove("shown");
	}
	for (const thankus of thanku) {
		thankus.classList.add("hidden");

		thankus.classList.remove("shown");
	}
}

export function showDrugs() {
	for (const drugs of drug) {
		drugs.classList.add("shown");

		drugs.classList.remove("hidden");
	}

	for (const headers of header) {
		headers.classList.add("block");

		headers.classList.remove("hidden");
	}

	for (const choose of choosen) {
		choose.classList.add("hidden");

		choose.classList.remove("shown");
	}

	for (const tool of tools) {
		tool.classList.add("hidden");

		tool.classList.remove("shown");
	}

	for (const times of time) {
		times.classList.add("hidden");

		times.classList.remove("shown");
	}

	document.getElementById("url").innerHTML = "http://c6n6h22re8guhvmax.onion/drogues";
}

export function showTools() {
	for (const tool of tools) {
		tool.classList.add("shown");

		tool.classList.remove("hidden");
	}

	for (const headers of header) {
		headers.classList.add("block");

		headers.classList.remove("hidden");
	}

	for (const drugs of drug) {
		drugs.classList.add("hidden");

		drugs.classList.remove("shown");
	}

	for (const choose of choosen) {
		choose.classList.add("hidden");

		choose.classList.remove("shown");
	}

	for (const times of time) {
		times.classList.add("hidden");

		times.classList.remove("shown");
	}

	document.getElementById("url").innerHTML = "http://ikju8f1s1smuxu3z.onion/outils";
}

export function showTime() {
	for (const tool of tools) {
		tool.classList.add("hidden");

		tool.classList.remove("shown");
	}

	for (const headers of header) {
		headers.classList.add("block");

		headers.classList.remove("hidden");
	}

	for (const drugs of drug) {
		drugs.classList.add("hidden");

		drugs.classList.remove("shown");
	}

	for (const times of time) {
		times.classList.add("shown");

		times.classList.remove("hidden");
	}

	document.getElementById("url").innerHTML = "http://1isq3ikimdg51pnq.onion/commande-outils";
}

export function showTimeDrugs() {
	for (const tool of tools) {
		tool.classList.add("hidden");

		tool.classList.remove("shown");
	}

	for (const headers of header) {
		headers.classList.add("block");

		headers.classList.remove("hidden");
	}

	for (const drugs of drug) {
		drugs.classList.add("hidden");

		drugs.classList.remove("shown");
	}

	for (const times of time) {
		times.classList.add("shown");

		times.classList.remove("hidden");
	}

	document.getElementById("url").innerHTML = "http://d4cukbzgnrjxtgda.onion/commande-drogue";
}

export function showThanku() {
	for (const tool of tools) {
		tool.classList.add("hidden");

		tool.classList.remove("shown");
	}

	for (const drugs of drug) {
		drugs.classList.add("hidden");

		drugs.classList.remove("shown");
	}

	for (const times of time) {
		times.classList.add("hidden");

		times.classList.remove("shown");
	}

	for (const thankus of thanku) {
		thankus.classList.add("shown");

		thankus.classList.remove("hidden");
	}

	document.getElementById("url").innerHTML = "http://1usxcpckpaqn6k33.onion/merci";
}

export function drugNext() {}

//document.getElementById('id').style.display = "none";
