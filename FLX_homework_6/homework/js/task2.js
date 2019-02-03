// Your code goes here
var prc, dscnt, prcDscnt, disMoney;

prc = prompt('Please, enter the price (from 0 to 9999999):');
dscnt = prompt('Please, enter the discount (from 0 to 99):');

if(isNaN(prc) || isNaN(dscnt) || prc === '' || dscnt === '' || prc < 0 || prc > 9999999 || dscnt < 0 || dscnt > 99) {
	alert('Invalid input data');
} else {
	disMoney = (prc/100)*dscnt;
	prcDscnt = prc-disMoney;

	prc = Math.floor(prc*100)/100;
	dscnt = Math.floor(dscnt*100)/100;
	disMoney = Math.floor(disMoney*100)/100;
	prcDscnt = Math.floor(prcDscnt*100)/100;
	alert('Price without discount: '+prc+'\nDiscount: '+dscnt+'\nPrice with discount: '+prcDscnt+'\nSaved: '+disMoney);
}