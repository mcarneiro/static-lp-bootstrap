import throttle from './throttle'
import isInsideViewportBy from './is-inside-viewport'

export function scroll(pub) {
	const trackScroll = ($node) => pub('bi:scroll', $node.getAttribute('data-bi:scroll'))
	const scrollEvt = throttle(isInsideViewportBy(trackScroll, document.querySelectorAll('[data-bi\\:scroll]'), window))
	window.addEventListener('scroll', scrollEvt)
	scrollEvt()
}

export function click(pub) {
	Array.from(document.querySelectorAll('[data-bi\\:click]'))
		.forEach($elm => {
			const clickEvt = () => pub('bi:click', $elm.getAttribute('data-bi:click'))
			$elm.addEventListener('click', clickEvt)
		})
}

export function runOnceByName(callback) {
	const cache = []

	return name => {
		if (cache.indexOf(name) >= 0) {
			return;
		}
		cache.push(name)
		callback(name)
	}
}

export function track(pub) {
	scroll(pub)
	click(pub)
}
