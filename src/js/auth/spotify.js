export function generateRandomString(length) {
	var text = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export function getHashParams(scope = document.location.hash) {
	return Object.fromEntries((document.location.hash.match(/([^#&;=]+)=?([^&;#]+)/g) || []).map(val => val.split('=')))
}

export function auth({clientID, redirectURI, scope}) {
	const state = generateRandomString(16)

	localStorage.setItem('auth', JSON.stringify({type: 'spotify', state}))
	console.log('auth', state, encodeURIComponent(state))

	let url = 'https://accounts.spotify.com/authorize'
	url += '?response_type=token'
	url += '&client_id=' + encodeURIComponent(clientID)
	url += '&scope=' + encodeURIComponent(scope)
	url += '&redirect_uri=' + encodeURIComponent(redirectURI)
	url += '&state=' + encodeURIComponent(state)

	window.location = url
}

export function check() {
	const {access_token, state: currState } = getHashParams()
	const {state} = JSON.parse(localStorage.getItem('auth')) || {}

	if (!access_token) {
		return {
			error: true,
			type: 'access_token'
		}
	}

	if (!currState || currState !== state) {
		return {
			error: true,
			type: 'state'
		}
	}

	return access_token
}

export async function callApi({url, fetchData = {}}) {
	const access_token = check()

	if (access_token && access_token.error) {
		return access_token.type
	}

	const response = await fetch(url, Object.assign(fetchData, {
		headers: {
			'Authorization': 'Bearer ' + access_token
		}
	}))

	if (response === false) {
		return {
			error: true,
			type: 'server_error'
		}
	}

	return response
}

export async function isFollowingArtist(ids) {
	const apiURL = 'https://api.spotify.com/v1/me/following/contains?type=artist&ids='

	return await callApi({
		url: apiURL + ids.join(',')
	})
}

export async function isSavedAlbum(ids) {
	const apiURL = 'https://api.spotify.com/v1/me/albums/contains?ids='

	return await callApi({
		url: apiURL + ids.join(',')
	})
}

export async function followArtist(ids) {
	const apiURL = 'https://api.spotify.com/v1/me/following?type=artist&ids='

	return await callApi({
		url: apiURL + ids.join(','),
		fetchData: {
			method: 'PUT'
		}
	})
}

export async function saveAlbum(ids) {
	const apiURL = 'https://api.spotify.com/v1/me/albums?ids='

	return await callApi({
		url: apiURL + ids.join(','),
		fetchData: {
			method: 'PUT'
		}
	})
}
