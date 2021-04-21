export default function throttle(fn, threshhold = 250) {
	let last;
	
	return () => {
		let now = Date.now();
		if (!last || now > (last + threshhold)) {
			last = now
			fn()
		}
	};
}
