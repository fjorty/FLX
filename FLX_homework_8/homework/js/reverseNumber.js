function reverseNumber(a) {
	var reversed = 0;
	while (a !== 0) {
		reversed *= 10;
		reversed += a % 10;
		a -= a % 10;
		a /= 10;
	}
	return reversed;
	//const reversed = a.toString().split('').reverse().join('');
	//return Math.sign(a) * parseInt(reversed);
}
reverseNumber(123);
reverseNumber(-456);
reverseNumber(10000);