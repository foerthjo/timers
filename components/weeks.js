window.weeks = {
	render() {
		weeks.renderForm();
		renderList();
	},

	renderForm() {
		byID('form').innerHTML = (`
			<input id="nameField" placeholder="event name" oninput="weeks.validateName();">
			<input id="periodField" type="number" placeholder="every nth week" value="1" oninput="weeks.validatePeriod();">
			<select id="weekdayField">
				<option value="1">monday</option>
				<option value="2">tuesday</option>
				<option value="3">wednesday</option>
				<option value="4">thursday</option>
				<option value="5">friday</option>
				<option value="6">saturday</option>
				<option value="7">sunday</option>
			</select>
			<input id="offsetField" type="time" placeholder="at" oninput="weeks.validateOffset();">
			<button class="green" onclick="weeks.addWeeklyEvent();">add event</button>
		`);
	},

	validateName() {
		let nameField = byID('nameField');
		if (nameField.value == '') return validation.invalid(nameField, `the event should have a name to recognize it later`);
		return validation.valid(nameField);
	},

	validatePeriod() {
		let periodField = byID('periodField');
		if (periodField.value == '') return validation.invalid(periodField, `you have to submit a number of weeks to specify how frequent the event occurs`);
		if (periodField.value * 1 < 1) return validation.invalid(periodField, `it must be at least 1 week`);
		return validation.valid(periodField);
	},

	validateOffset() {
		let offsetField = byID('offsetField');
		if (offsetField.value == '') return validation.invalid(offsetField, `you have to submit a time of the day the event occurs`);
		return validation.valid(offsetField);
	},

	addWeeklyEvent() {
		if (!(this.validateName() & this.validatePeriod() & this.validateOffset())) return;
		
		let name = byID('nameField').value;
		let offset = byID('offsetField').value;
		let period = byID('periodField').value;
		let weekday = byID('weekdayField').value;

		let [hour, minute] = offset.split(':');
		let startDate = new Date();
		startDate.setMinutes(minute, 0, 0);
		startDate.setHours(hour);
		startDate.setDate(startDate.getDate() + (weekday - startDate.getDay()));
		addEvent(name, {days: period * 7}, startDate);
	}
};