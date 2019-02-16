/* Announcement of data */
let data = [
	{
		"_id": "5b5e3168c6bf40f2c1235cd6",
		"index": 0,
		"age": 39,
		"eyeColor": "green",
		"name": "Stein",
		"favoriteFruit": "apple"
	},
	{
		"_id": "5b5e3168e328c0d72e4f27d8",
		"index": 1,
		"age": 38,
		"eyeColor": "blue",
		"name": "Cortez",
		"favoriteFruit": "strawberry"
	},
	{
		"_id": "5b5e3168cc79132b631c666a",
		"index": 2,
		"age": 2,
		"eyeColor": "blue",
		"name": "Suzette",
		"favoriteFruit": "apple"
	},
	{
		"_id": "5b5e31682093adcc6cd0dde5",
		"index": 3,
		"age": 19,
		"eyeColor": "green",
		"name": "George",
		"favoriteFruit": "banana"
	}
];
/* 1 Task */
function findTypes() {
	let type = [];
	for(let i = 0; i < arguments.length; i++) {
		type[i] = typeof(arguments[i]);
	}
	return(type);
}
findTypes('number');
findTypes(null, 5, "number");
/* 2 Task */
function executeforEach(forEach, execute) {
	for(let i = 0; i < forEach.length; i++) {
		execute(forEach[i]);
	}
}
executeforEach([1,2,3], function(el) {
	console.log(el)
});
/* 3 Task */
function mapArray(array, map) {
	let newArray = [];
	executeforEach(array, function(elem) {
		newArray.push(map(elem));
	});
	return newArray;
}
mapArray([2, 5, 8], function(el) {
	return el + 3
});
/* 4 Task */
function filterArray(array, filter) {
	let filteredArray = [];
	executeforEach(array, function(elem) {
		if(filter(elem)) {
			filteredArray.push(elem);
		}
	});
	return filteredArray;
}
filterArray([2, 5, 8], function(el) {
	return el > 3
});
/* 5 Task */
function getAmountOfAdultPeople(dataObject) {
	let amountOfAdultPeople = filterArray(dataObject, function(el) {
		return el.age > 18;
	});
	return(amountOfAdultPeople.length);
}
getAmountOfAdultPeople(data);
/* 6 Task */
function getGreenAdultBananaLovers(dataObject) {
	let filteredArray = filterArray(dataObject, function(el) {
		return el.age > 18 && el.eyeColor === "green" && el.favoriteFruit === "banana";
	});
	return mapArray(filteredArray, function (el) {
		return el.name;
	});
}
getGreenAdultBananaLovers(data);
/* 7 Task */
function keys(keysObject) {
	let keysArray = [];
	for(let key in keysObject) {
		keysArray.push(key);
	}
	return keysArray;
}
keys({keyOne: 1, keyTwo: 2, keyThree: 3});
/* 8 Task */
function values(valuesObject) {
	let valuesArray = [];
	for(let value in valuesObject) {
		valuesArray.push(valuesObject[value]);
	}
	return valuesArray;
}
values({keyOne: 1, keyTwo: 2, keyThree: 3});
/* 9 Task */
function showFormattedDate(date) {
	const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
	return 'Date: '+date.getDate()+' of '+monthNames[date.getMonth()].substr(0, 3)+', '+date.getFullYear();
}
showFormattedDate(new Date('2019-01-27T01:10:00'));
/* 10 Task */
function isEvenYear(date) {
	return date.getFullYear() % 2 === 0;
}
isEvenYear(new Date('2019-01-27T01:10:00'));
/* 11 Task */
function isEvenMonth(date) {
	return date.getMonth() % 2 !== 0;
}
isEvenMonth(new Date('2019-02-27T01:10:00'));