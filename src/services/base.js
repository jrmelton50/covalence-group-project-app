import 'es6-promise';
import 'fetch-everywhere';
import { AsyncStorage } from 'react-native';

const AUTH_TOKEN_KEY = 'authtoken';
let authToken = '';

function setAuthToken(token, userid) {
	authToken = `Bearer ${token}`;
	let user = userid;
	if (AsyncStorage) {
		AsyncStorage.setItem(AUTH_TOKEN_KEY, authToken);
		AsyncStorage.setItem('user', user.toString());
	}
}

function clearAuthToken() {
	authToken = '';
	if (AsyncStorage) {
		AsyncStorage.removeItem(AUTH_TOKEN_KEY);
	}
}

async function populateAuthToken() {
	if (AsyncStorage) {
		let token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
		if (token && token !== null) {
			authToken = token;
		}
	}
}

function makeFetch(url, info) {
	return fetch(url, info);
}

function json(url, method = 'GET', payload = {}) {
	let data = {
		method,
		body: JSON.stringify(payload),
		headers: new Headers({
			'Content-Type': 'application/json',
			Authorization: authToken,
		}),
	};

	if (method === 'GET') {
		delete data.body;
	}

	return makeFetch(url, data).then(response => {
		if (response.ok) {
			let contentType = response.headers.get('Content-Type');
			if (contentType.indexOf('application/json') > -1) {
				return response.json();
			}
			return response.statusText;
		}
		throw response;
	});
}

function get(url) {
	return json(url);
}

function post(url, payload) {
	return json(url, 'POST', payload);
}

function put(url, payload) {
	return json(url, 'PUT', payload);
}

function destroy(url, payload) {
	return json(url, 'DELETE', payload);
}

export { setAuthToken, populateAuthToken, clearAuthToken, get, post, put, destroy, makeFetch };
