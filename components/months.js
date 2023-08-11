window.months = {
	render() {
		months.renderForm();
		renderList();
	},

	renderForm() {
		byID('form').innerHTML = (`
			<input id="nameField" placeholder="event name" oninput="months.validateName();">
			<input id="periodField" type="number" placeholder="every nth month" value="1" oninput="months.validatePeriod();">
			<input id="offsetField" type="number" placeholder="days into the month" oninput="months.validateOffset();">
			<button class="green" onclick="months.addMonthlyEvent();">add event</button>
		`);
	},

	validateName() {
		let nameField = byID('nameField');
		if (nameField.value == '') return validation.invalid(nameField, `the event should have a name to recognize it later`);
		return validation.valid(nameField);
	},

	validatePeriod() {
		let periodField = byID('periodField');
		if (periodField.value == '') return validation.invalid(periodField, `you have to submit a number of months to specify how frequent the event occurs`);
		if (periodField.value * 1 < 1) return validation.invalid(periodField, `it must be at least 1 month`);
		return validation.valid(periodField);
	},

	validateOffset() {
		let offsetField = byID('offsetField');
		if (offsetField.value == '') return validation.invalid(offsetField, `you have to submit a day of the month the event occurs`);
		return validation.valid(offsetField);
	},

	addMonthlyEvent() {
		if (!(this.validateName() & this.validatePeriod() & this.validateOffset())) return;

		let name = byID('nameField').value;
		let period = byID('periodField').value * 1;
		let offset = byID('offsetField').value * 1;

		let startDate = new Date(0);
		startDate.setDate(offset - 1);
		addEvent(name, {months: period}, startDate);
	}
};