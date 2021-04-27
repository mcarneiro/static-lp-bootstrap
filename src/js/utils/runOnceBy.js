export default function runOnceBy(fn) {
	let once = false
	return (...args) => {
		if (!once) {
			once = true
			if (fn) {
				return fn(...args)
			} else {
				const [fn, ...remain] = args
				return fn(...remain)
			}
		}
	}
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
