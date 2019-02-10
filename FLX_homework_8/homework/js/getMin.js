function getMin() {
	let i = 1;
	let min = arguments[0];
	while (i < arguments.length) {
		if(min > arguments[i]) {
			min = arguments[i];
		}
		i++;
	}
	return min;
}
getMin(3, 0, -3);