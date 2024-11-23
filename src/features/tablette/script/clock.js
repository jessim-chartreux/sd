export function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	var d = today.getDate();
	var y = today.getFullYear();
	var day = [];
	var month = [];

	month[0] = "Janvier";
	month[1] = "Février";
	month[2] = "Mars";
	month[3] = "Avril";
	month[4] = "Mai";
	month[5] = "Juin";
	month[6] = "Juillet";
	month[7] = "Août";
	month[8] = "Septembre";
	month[9] = "Octobre";
	month[10] = "Novembre";
	month[11] = "Décembre";

	day[0] = "Dimanche";
	day[1] = "Lundi";
	day[2] = "Mardi";
	day[3] = "Mercredi";
	day[4] = "Jeudi";
	day[5] = "Vendredi";
	day[6] = "Samedi";

	// ajoute zero devant <10
	// add a zero in front of numbers<10
	m = checkTime(m);
	s = checkTime(s);

	var j = day[today.getDay()];
	var n = month[today.getMonth()];

	document.getElementById("hour").innerHTML = h + ":" + m + ":" + s;
	document.getElementById("date").innerHTML = j + " " + d + " " + n + " " + y;
}
export function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}
