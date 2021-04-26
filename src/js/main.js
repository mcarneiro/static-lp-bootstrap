import pubSub from './utils/pubsub'
import track from './utils/track'
import bi from './bi'
import spotify from './components/spotify'
import deezer from './components/deezer'
import fullscreen from './components/fullscreen'

(() => {
	'use strict'
	const [pub, sub] = pubSub()

	//subscribe first
	bi(sub)
	sub('login:hide', () => {
		document.querySelector('.social-login').style.display = 'none'
	})

	//publish last
	track(pub)
	spotify(pub)
	deezer(pub)
	fullscreen()
})()
