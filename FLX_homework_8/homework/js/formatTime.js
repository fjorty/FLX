function isInteger(a) {
	return (a % 1) === 0;
}
function formatTime(mins) {
	if(isInteger(mins) && mins >= 0) {
		let totalMins = mins;
		let days = totalMins / 1440 ^ 0;
		totalMins %= 1440;
		let hours = totalMins / 60 ^ 0;
		let minutes = totalMins % 60;
		return (days + ' day(s) ' + hours + ' hour(s) ' + minutes + ' minute(s).');
	}
	return ('Not a positive integer number!');
}
formatTime(120);
formatTime(59);
formatTime(3601);