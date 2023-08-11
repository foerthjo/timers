function byID(id) {
	return document.getElementById(id);
}

function escapeHTML(text) {
	let div = document.createElement('div');
	div.innerText = text;
	return div.innerHTML;
}