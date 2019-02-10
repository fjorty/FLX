function addOne(x) {
	return x + 1;
}
function pipe(a) {
	let i = 1;
	while(i < arguments.length) {
		if(typeof arguments[i] === 'function') {
			a = addOne(a);
		}
		i++;
	}
	return a;
}
pipe(1, addOne);
pipe(1, addOne, addOne);