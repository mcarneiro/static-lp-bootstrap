export default function component(name, fn) {
	return (...extra) => Array.from(document.querySelectorAll(`[data-component=${name}]`)).map(elm => {
		const options = JSON.parse(elm.getAttribute(`data-${name}`))
		fn(elm, options, ...extra)
	})
}