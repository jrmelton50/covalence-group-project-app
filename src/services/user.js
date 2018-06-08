import * as baseService from './base';

let loggedIn = false;
const url = 'https://bham-hops.herokuapp.com';
// const url = 'http://localhost:3000';

async function isLoggedIn() {
	await checkLogin();
	return loggedIn;
}

async function checkLogin() {
	if (loggedIn) {
		return Promise.resolve(true);
	} else {
		await baseService.populateAuthToken();
		return me()
			.then(user => {
				loggedIn = true;
				return Promise.resolve(true);
			})

			.catch(() => {
				return Promise.resolve(false);
			});
	}
}

function login(email, password) {
	return baseService
		.makeFetch(`${url}/api/auth/login`, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})
		.then(response => {
			if (response.ok) {
				return response.json().then(jsonResponse => {
					baseService.setAuthToken(jsonResponse.token, jsonResponse.user);
					loggedIn = true;
				});
			} else if (response.status === 401) {
				return response.json().then(jsonResponse => {
					throw jsonResponse;
				});
			}
		});
}

function logout() {
	baseService.clearAuthToken();
	loggedIn = false;
}

function me() {
	return baseService.get(`${url}/api/users/me`);
}

export { isLoggedIn, checkLogin, login, logout };
