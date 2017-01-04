
// Function executed at the start (see "onload" in the index.html)
// It simply changes the title every seconds
function start() {
	var titleElement = document.querySelector("#title");
	var visibleIndex = 0;
	setInterval(function() {
		visibleIndex = (visibleIndex % "Drawki".length) + 1
		titleElement.innerHTML = "Drawki".substring(0, visibleIndex);
	}, 1000 /* milliseconds */);
}
