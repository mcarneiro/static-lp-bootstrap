import component from './component'

export function module(elm, options, pub) {
	elm.addEventListener('click', () => {
		Object.entries(options)
			.forEach(([evt, arg]) => pub(evt, arg))
	})
}

export default component('publish', module)
