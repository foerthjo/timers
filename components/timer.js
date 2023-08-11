window.timer = {
	render(selected, id, name) {
		return `
			<div class="column timer-element" id="element_${selected}_${id}" onclick="timer.edit('${selected}', ${id});">
				<div class="column nogap">
					<p>${escapeHTML(name)}</p>
					<div class="timer-row">
						<div id="${id}_years_display" class="column nogap">
							<p id="${id}_years" class="timer">0</p>
							<p class="unit">a</p>
						</div>	
						<div id="${id}_days_display" class="column nogap">
							<p id="${id}_days" class="timer">0</p>
							<p class="unit">d</p>
						</div>
						<div id="${id}_hours_display" class="column nogap">
							<p id="${id}_hours" class="timer">00</p>
							<p class="unit">h</p>
						</div>
						<div id="${id}_minutes_display" class="column nogap">
							<p id="${id}_minutes" class="timer">00</p>
							<p class="unit">m</p>
						</div>
						<div id="${id}_seconds_display" class="column nogap">
							<p id="${id}_seconds" class="timer">00</p>
							<p class="unit">s</p>
						</div>
					</div>
				</div>
				<div id="${selected}_${id}_editform" class="column hideable hidden">
					<button class="red" onclick="remove('${selected}', ${id});">remove</button>
				</div>
			</div>
		`;
	},

	update(id, time) {
		let times = window.time.millisToUnits(time);
		let displayedUnits = {};
		let unitDisplayed = false;
		['years', 'days', 'hours', 'minutes', 'seconds'].forEach(unit => {
			if (times[unit] > 0) unitDisplayed = true;
			if (unitDisplayed) {
				displayedUnits[unit] = true;
			} else {
				displayedUnits[unit] = false;
			}
		});
		for (key in times) {
			let number = times[key];
			if (number >= 0) {
				let element = byID(`${id}_${key}`);
				if (element) {
					let displayedNumber = this.zeroPad(number, this.expectedLength[key]);
					if (element.innerText != displayedNumber) {
						element.innerText = displayedNumber;
					}
				}
			}
			let displayElement = byID(`${id}_${key}_display`);
			if (displayElement) {
				if (displayedUnits[key]) displayElement.classList.remove('nodisplay');
				else displayElement.classList.add('nodisplay');
			}
		}
	},

	zeroPad(number, totalPlaces) {
		number = '' + number;
		while (number.length < totalPlaces) {
			number = '0' + number;
		}
		return number;
	},

	expectedLength: {
		seconds: 2,
		minutes: 2,
		hours: 2,
		days: 1,
		years: 1,
	},

	edit(selected, id) {
		if (this.edited) {
			if (JSON.stringify(this.edited) == JSON.stringify({selected, id})) {
				let element = byID(`${this.edited.selected}_${this.edited.id}_editform`);
				if (element) element.classList.add('hidden');
				this.edited = null;
				return;
			}
			let element = byID(`${this.edited.selected}_${this.edited.id}_editform`);
			if (element) element.classList.add('hidden');
		}
		this.edited = {selected, id};
		let element = byID(`${this.edited.selected}_${this.edited.id}_editform`);
		if (element) element.classList.remove('hidden');
	}
}