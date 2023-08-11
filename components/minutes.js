window.minutes = {
	render() {
		minutes.renderForm();
		renderList();
	},

	renderForm() {
		byID('form').innerHTML = (`
			<input id="nameField" placeholder="event name" oninput="minutes.validateName()">
			<input id="periodField" type="number" placeholder="minutes" oninput="minutes.validatePeriod()">
			<input id="startField" type="number" placeholder="starting at" oninput="minutes.validateStart()">
			<button class="green" onclick="minutes.addMinuteEvent(byID('nameField').value, byID('periodField').value, byID('startField').value);">add event</button>
		`);
	},

	validateName() {
		if (byID('nameField').value == '') return validation.invalid(byID('nameField'), `the event should have a name to recognize it later`);
		return validation.valid(byID('nameField'));
	},

	validatePeriod() {
		if (byID('periodField').value == '') return validation.invalid(byID('periodField'), `you have to submit a number of minutes to specify how frequent the event occurs`);
		if (byID('periodField').value * 1 < 1) return validation.invalid(byID('periodField'), `it must be at least 1 minute`);
		return validation.valid(byID('periodField'));
	},

	validateStart() {
		if (byID('startField').value == '') return validation.invalid(byID('startField'), `you have to submit a number of minutes as an offset`);
		return validation.valid(byID('startField'));
	},

	addMinuteEvent(name, minutes, start) {
		if (!(
			this.validateName() & this.validatePeriod() & this.validateStart()
		)) return;

		minutes *= 1;
		start *= 1;
		let startDate = new Date();
		startDate.setMinutes(start, 0, 0);
		addEvent(name, {minutes}, startDate);
	}
};