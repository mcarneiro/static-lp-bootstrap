import component from './component'
import {auth, followArtist, isFollowingArtist, saveAlbum, isSavedAlbum} from '../auth/deezer'

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

	DZ.getLoginStatus(res => {
		if (res.authResponse) {
			if (cache.follow === undefined) {
				isFollowingArtist(options.artistID).then(res => {
					if (res) {
						cache.follow = true
						dispatch()
						return
					}
					followArtist(options.artistID).then(res => {
						if (!res.error) {
							cache.follow = true
							dispatch()
						}
					})
				})
			}

			if (cache.saved === undefined) {
				isSavedAlbum(options.albumID).then(res => {
					if (res) {
						cache.saved = true
						dispatch()
						return
					}
					saveAlbum(options.albumID).then(res => {
						if (!res.error) {
							cache.saved = true
							dispatch()
						}
					})
				})
			}
		}
	});

	elm.addEventListener('click', () => {
		auth(options)
	})
}

export default component('deezer', module)
