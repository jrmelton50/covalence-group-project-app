import * as baseService from './base';

function sendContactEmail(name, email, message) {
	return baseService.post('https://bham-hops.herokuapp.com/api/contact', {
		name,
		email,
		message,
	});
}

export { sendContactEmail };
