window.years = {
	render() {
		years.renderForm();
		renderList();
	},

	renderForm() {
		byID('form').innerHTML = (`
			<input id="nameField" placeholder="event name" oninput="years.validateName();">
			<input id="periodField" type="number" placeholder="every ... years" value="1" oninput="years.validatePeriod();">
			<input id="offsetField" type="date" placeholder="every year that day" oninput="years.validateOffset();">
			<button class="green" onclick="years.addYearlyEvent();">add event</button>
		`);
	},

	validateName() {
		let nameField = byID('nameField');
		if (nameField.value == '') return validation.invalid(nameField, `the event should have a name to recognize it later`);
		return validation.valid(nameField);
	},

	validatePeriod() {
		let periodField = byID('periodField');
		if (periodField.value == '') return validation.invalid(periodField, `you have to submit a number of years to specify how frequent the event occurs`);
		if (periodField.value * 1 < 1) return validation.invalid(periodField, `it must be at least 1 year`);
		return validation.valid(periodField);
	},

	validateOffset() {
		let offsetField = byID('offsetField');
		if (offsetField.value == '') return validation.invalid(offsetField, `you have to submit a date the event occurs`);
		return validation.valid(offsetField);
	},

	addYearlyEvent() {
		if (!(this.validateName() & this.validatePeriod() & this.validateOffset())) return;

		let name = byID('nameField').value;
		let period = byID('periodField').value * 1;
		let offset = byID('offsetField').value;

		let startDate = new Date(offset);
		addEvent(name, {years: period}, startDate);
	}
};