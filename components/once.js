window.once = {
	render() {
		once.renderForm();
		renderList();
	},

	renderForm() {
		byID('form').innerHTML = (`
			<input id="nameField" placeholder="event name" oninput="once.validateName();">
			<input id="dateField" type="date" placeholder="day" oninput="once.validateDate();">
			<input id="timeField" type="time" placeholder="time" oninput="once.validateTime();">
			<button class="green" onclick="once.addOnceEvent();">add event</button>
		`);
	},

	validateName() {
		let nameField = byID('nameField');
		if (nameField.value == '') return validation.invalid(nameField, `the event should have a name to recognize it later`);
		return validation.valid(nameField);
	},

	validateDate() {
		let dateField = byID('dateField');
		if (dateField.value == '') return validation.invalid(dateField, `you have to submit a date for the event`);
		return validation.valid(dateField);
	},

	validateTime() {
		let timeField = byID('timeField');
		if (timeField.value == '') return validation.invalid(timeField, `you have to submit a time for the event`);
		return validation.valid(timeField);
	},

	addOnceEvent() {
		if (!(this.validateName() & this.validateDate() & this.validateTime())) return;

		let name = byID('nameField').value;
		let date = new Date(byID('dateField').value);
		let [hour, minute] = byID('timeField').value.split(':');

		hour *= 1;
		minute *= 1;

		date.setHours(hour, minute, 0, 0);
		addEvent(name, null, date);
	}
};