import component from './component'
import {check, auth, followArtist, isFollowingArtist, saveAlbum, isSavedAlbum} from '../auth/spotify'

let cache = {follow: undefined, saved: undefined}

function dispatchBy(pub) {
	return () => {
		if (cache.follow && cache.saved) {
			pub('login:hide')
		}
	}
}

export function module(elm, options, pub) {
	const dispatch = dispatchBy(pub)
	const access_token = check()

	if (access_token && access_token.error) {
		elm.addEventListener('click', () => {
			auth(options)
		})
		return
	}

	if (cache.follow === undefined) {
		isFollowingArtist([options.artistID])
			.then(res => res.json())
			.then(json => {
				cache.follow = true
				if (!json[0]) {
					followArtist([options.artistID])
				}
				dispatch()
			})
	}

	if (cache.saved === undefined) {
		isSavedAlbum([options.albumID])
			.then(res => res.json())
			.then(json => {
				cache.saved = true
				if (!json[0]) {
					saveAlbum([options.albumID])
				}
				dispatch()
			})
	}
}

export default component('spotify', module)
