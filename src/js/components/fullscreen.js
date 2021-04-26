import component from './component'

document.addEventListener('fullscreenchange', e => {
	console.log('changed full screen', document.fullscreenElement)
	if (document.fullscreenElement) {
		document.fullscreenElement.classList.add('-fullscreen')
		screen.orientation.lock('portrait')
		return
	}

	Array.from(document.querySelectorAll('.-fullscreen')).forEach(elm => elm.classList.remove('-fullscreen'))
	screen.orientation.unlock()
})

export function module(elm, opt) {
	elm.addEventListener('click', () => {
		const $el = document.querySelector(opt.el)

		if($el.requestFullscreen) {
			$el.requestFullscreen()
			return
		}

		$el.classList.add('-fullscreen')
	})
}

export default component('fullscreen', module)
