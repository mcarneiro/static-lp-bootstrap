export function auth({scope, artistID, albumID}) {
	localStorage.setItem('auth', JSON.stringify({type: 'deezer'}))

	DZ.login(res => {
		if (res.authResponse) {
			followArtist(artistID)
			saveAlbum(albumID)
		}
	}, {perms: scope})
}

export function isFollowingArtist(artistID) {
	return new Promise(ok => {
		DZ.api('/user/me/artists', 'GET', {artist_id: artistID}, res => ok(res && res.data && res.data.length > 0))
	})
}

export function isSavedAlbum(albumID) {
	return new Promise(ok => {
		DZ.api('/user/me/albums', 'GET', {album_id: albumID}, res => ok(res && res.data && res.data.length > 0))
	})
}

export function followArtist(artistID) {
	return new Promise(ok => {
		DZ.api('/user/me/artists', 'POST', {artist_id: artistID}, ok)
	})
}

export function saveAlbum(albumID) {
	return new Promise(ok => {
		DZ.api('/user/me/albums', 'POST', {album_id: albumID}, ok)
	})
}
