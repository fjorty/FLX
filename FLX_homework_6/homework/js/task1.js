// Your code goes here
var a, b, c, D, x, x1, x2;

a = prompt('Please, enter the value a:');
b = prompt('Please, enter the value b:');
c = prompt('Please, enter the value c:');

if(isNaN(a) || isNaN(b) || isNaN(c) || a === 0 || a === '' || b === '' || c === '') {
	alert('Invalid input data');
} else {
	D = (Math.pow(b, 2))-4*a*c;
	if(D>0) {
		x1 = (-b+Math.sqrt(D))/(2*a);
		x2 = (-b-Math.sqrt(D))/(2*a);
		alert('x1='+x1+' and x2='+x2);
	} else if(D<0) {		
		alert('No solution');
	} else {
		x = -b/(2*a);
		alert('x='+x);
	}
}