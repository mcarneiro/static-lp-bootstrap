import component from './component'
import throttle from '../utils/throttle'
import isInsideViewportBy from '../utils/isInsideViewport'
import runOnceBy from '../utils/runOnceBy'

export function module(elm, options, pub) {
	const trackScroll = ($node) => pub('bi:scroll', $node.getAttribute('data-bi:scroll'))
	const scrollEvt = throttle(isInsideViewportBy(trackScroll, document.querySelectorAll('[data-bi\\:scroll]'), window))
	window.addEventListener('scroll', scrollEvt)
	scrollEvt()
}

export default component('bi:scroll', runOnceBy(module))
