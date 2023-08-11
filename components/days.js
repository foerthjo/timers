window.days = {
	render() {
		days.renderForm();
		renderList();
	},

	renderForm() {
		byID('form').innerHTML = (`
			<input id="nameField" placeholder="event name" oninput="days.validateName();">
			<input id="periodField" type="number" placeholder="every nth day" value="1" oninput="days.validatePeriod();">
			<input id="offsetField" type="time" placeholder="every day at" oninput="days.validateOffset();">
			<button class="green" onclick="days.addDailyEvent();">add event</button>
		`);
	},

	validateName() {
		if (byID('nameField').value == '') return validation.invalid(byID('nameField'), `the event should have a name to recognize it later`);
		return validation.valid(byID('nameField'));
	},

	validatePeriod() {
		if (byID('periodField').value == '') return validation.invalid(byID('periodField'), `you have to submit a number of days to specify how frequent the event occurs`);
		if (byID('periodField').value * 1 < 1) return validation.invalid(byID('periodField'), `it must be at least 1 day`);
		return validation.valid(byID('periodField'));
	},

	validateOffset() {
		let offsetField = byID('offsetField');
		if (offsetField.value == '') return validation.invalid(offsetField, `you have to submit a time of the day the event occurs`);
		return validation.valid(offsetField);
	},

	addDailyEvent() {
		if (!(this.validateName() & this.validatePeriod() & this.validateOffset())) return;

		let name = byID('nameField').value;
		let period = byID('periodField').value * 1;
		let offset = byID('offsetField').value;

		let [hour, minute] = offset.split(':');
		let startDate = new Date();
		startDate.setMinutes(minute * 1, 0, 0);
		startDate.setHours(hour * 1);
		addEvent(name, {days: period}, startDate);
	}
};