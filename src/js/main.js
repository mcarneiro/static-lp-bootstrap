import pubSub from './utils/pubsub'
import {track} from './utils/track'
import bi from './bi'

(() => {
	'use strict'
	const [pub, sub] = pubSub()
	bi(sub)
	track(pub)
})()
