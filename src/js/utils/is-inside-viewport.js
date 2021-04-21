export default function isInsideViewportBy(callback, $elmList, window) {
	return () => {
		var minTop = window.scrollY
		var maxBottom = minTop + window.innerHeight
		Array.from($elmList).forEach(function ($elm) {
			var minS = $elm.offsetTop + 1
			var maxS = minS + 100
			if (minS >= minTop && maxS <= maxBottom) {
				callback($elm)
			}
		})
	}
}
