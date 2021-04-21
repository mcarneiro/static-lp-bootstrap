import {runOnceByName} from './utils/track'

export default function bi(sub) {
	sub('bi:scroll', runOnceByName((name) => {
		console.log('[track scroll]', name)
	}))

	sub('bi:click', (data) => {
		console.log('[track cta]', data)
	})
}
