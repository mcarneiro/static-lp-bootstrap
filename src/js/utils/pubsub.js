export default function pubSub() {
	let obj = {}

	return [
		(label, extra) => {
			if (obj[label]) {
				obj[label].map(fn => fn(extra))
			}
			return null
		},
		(label, callback) => {
			if (!callback || callback.constructor !== Function) {
				throw new Error('callback must be a function')
			}

			if (obj[label] === undefined) {
				obj[label] = []
			}
			obj[label].push(callback)
			return obj[label]
		}
	]
}
