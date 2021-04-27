import pubSub from './utils/pubsub'
import bi from './bi'
import spotify from './components/spotify'
import deezer from './components/deezer'
import fullscreen from './components/fullscreen'
import publish from './components/publish'
import trackScroll from './components/biScroll'

(() => {
	'use strict'
	const [pub, sub] = pubSub()

	//subscribe first
	bi(sub)
	sub('login:hide', () => {
		document.querySelector('.social-login').style.display = 'none'
	})
	fullscreen(sub)

	//publish last
	trackScroll(pub)
	spotify(pub)
	deezer(pub)
	publish(pub)
})()
