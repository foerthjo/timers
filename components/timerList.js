window.timerList = {
	updateTimers() {
		let events = data[selected];
		if (events) {
			let dataChanged = false;
			let mappedEvents = [...events].map((event, index) => {
				let now = new Date();
				let nextOccurence = new Date(event.startDate);
				let startDateChanged = false;
				if (event.period && time.isPeriodValid(event.period)) while (time.isDateAfter(nextOccurence, now)) {
					time.addToDate(nextOccurence, event.period);
					startDateChanged = true;
				}
				if (startDateChanged) {
					event.startDate = nextOccurence;
					dataChanged = true;
				}
	
				let delta = nextOccurence - now;
				timer.update(index, delta);
	
				return {
					index,
					delta,
				};
			});
			let sortedEvents = [...mappedEvents].sort((e1, e2) => {
				let diff = e1.delta - e2.delta;
				if (Math.abs(diff) < 2) return 0;
				return diff;
			});
			sortedEvents.forEach((event, i) => {
				byID(`element_${selected}_${event.index}`).style = `order: ${i};`;
			});
			if (dataChanged) {
				storeData();
			}
		}
		setTimeout(timerList.updateTimers, 1000);
	}
};