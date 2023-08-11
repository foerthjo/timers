window.time = {
	secondsToString(time) {
		time = Math.floor(time);

		let seconds = time % 60;
		time -= seconds;
		time /= 60;

		let minutes = time % 60;
		time -= minutes;
		time /= 60;

		let hours = time % 24;
		time -= hours;
		time /= 24;

		let days = time % 365;
		time -= days;
		time /= 365;

		let years = time;

		let result = '';
		if (years > 0) result += `${Math.floor(years)} ${years >= 2 ? 'anni' : 'anno'} `;
		if (days > 0) result += `${Math.floor(days)}${years >= 2 ? 'd' : 'd'} `;
		if (hours > 0) result += `${Math.floor(hours)}${hours >= 2 ? 'h' : 'h'} `;
		if (minutes > 0) result += `${Math.floor(minutes)}${minutes >= 2 ? 'm' : 'm'} `;
		if (seconds > 0) result += `${Math.floor(seconds)}${seconds >= 2 ? 's' : 's'} `;
		if (result == '') return 'zero';

		return result.slice(0, result.length - 1);
	},

	millisToUnits(time) {
		time = Math.floor(time);

		let millis = time % 1000; time -= millis; time /= 1000;
		let seconds = time % 60; time -= seconds; time /= 60;
		let minutes = time % 60; time -= minutes; time /= 60;
		let hours = time % 24; time -= hours; time /= 24;
		let days = time % 365; time -= days; time /= 365;
		let years = time;

		return {seconds, minutes, hours, days, years};
	},

	isDateAfter(date1, date2) {
		return date2 - date1 > 0;
	},

	isPeriodValid(period) {
		return period.seconds >= 1 || period.minutes >= 1 || period.hours >= 1 || period.days >= 1 || period.months >= 1 || period.years >= 1;
	},
	
	addToDate(date, time) {
		if (time.seconds) date.setSeconds(date.getSeconds() + time.seconds);
		if (time.minutes) date.setMinutes(date.getMinutes() + time.minutes);
		if (time.hours) date.setHours(date.getHours() + time.hours);
		if (time.days) date.setDate(date.getDate() + time.days);
		if (time.months) date.setMonth(date.getMonth() + time.months);
		if (time.years) date.setFullYear(date.getFullYear() + time.years);
	}
};