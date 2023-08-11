window.validation = {
	invalid(element, message) {
		let id = `${element.id}_valid_msg`;
		let existing = byID(id);
		
		if (!existing) {
			let msg = document.createElement('p');
			msg.innerText = message;
			msg.id = id;
			msg.classList.add('invalid-msg');
			element.insertAdjacentElement('afterend', msg);
		} else {
			existing.innerText = message;
		}

		return false;
	},

	valid(element) {
		let id = `${element.id}_valid_msg`;
		let existing = byID(id);
		if (existing) {
			existing.remove();
		}

		return true;
	},
};