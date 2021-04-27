import component from './component'
import runOnceBy from '../utils/runOnceBy'

document.addEventListener('fullscreenchange', e => {
	if (document.fullscreenElement) {
		screen.orientation.lock('landscape')
		return
	}

	Array.from(document.querySelectorAll('.-fullscreen')).forEach(elm => elm.classList.remove('-fullscreen'))
	screen.orientation.unlock()
})

const fullscreenClose = () => {
	if(document.fullscreenElement) {
		document.exitFullscreen()
		screen.orientation.unlock()
	}

	if(document.webkitFullscreenElement) {
		document.webkitExitFullscreen()
	}

	const $elm = Array.from(document.querySelectorAll('.-fullscreen'))
	$elm.forEach(elm => elm.classList.remove('-fullscreen'))
}

const runOnce = runOnceBy()

export function module(elm, options, sub) {
	runOnce(() => sub('fullscreen:close', fullscreenClose))
	elm.addEventListener('click', () => {
		const $elm = document.querySelector(options.elm)

		$elm.classList.add('-fullscreen')

		if (!/Android|iPad/.test(navigator.userAgent)) {
			return
		}

		if($elm.requestFullscreen) {
			$elm.requestFullscreen()
		}

		if($elm.webkitRequestFullscreen) {
			$elm.webkitRequestFullscreen()
		}
	})
}

export default component('fullscreen', module)
