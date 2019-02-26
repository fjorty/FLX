const rootNode = document.getElementById('root');
const todoItems = [];
const mainPage = `
	<h1 class="heading">Simple TODO application</h1>
	<button type="button" class="btn add-btn">Add new task</button>
	<div id="todo-list">
		<p id="hiddenp" class="hidden">TODO is empty</p>
	</div>
`;
const addPage = `
	<h1 class="heading">Add task</h1>
	<input type="text" name="input-text" class="input-text">
	<div class="buttons">
		<button type="button" class="btn action-btn cancel-btn">Cancel</button>
		<button type="button" class="btn action-btn save-btn">Save changes</button>
	</div>
`;
function modifyPage() {
	let modify = JSON.parse(localStorage.getItem('modify'));
	let title = modify[1];
	const modifyTemplate = `
		<h1 class="heading">Modify</h1>
		<input value="${title}" type="text" name="input-text" class="modify-text">
		<div class="buttons">
			<button type="button" class="btn action-btn cancel-btn">Cancel</button>
			<button type="button" class="btn action-btn modify-btn">Save changes</button>
		</div>
	`;
	return modifyTemplate;
}
window.addEventListener('hashchange', hashHandler);
hashHandler();
document.addEventListener('click',function(e){
	if (e.target && e.target.classList.contains('add-btn')){
		window.location.hash = '#add';
	}
	if (e.target && e.target.classList.contains('cancel-btn')) {
		window.location.hash = '#main';
	}
	if (e.target && e.target.classList.contains('content-text')) {
		modifyStart(e.target);
		window.location.hash = '#modify';
	}
	if (e.target && e.target.classList.contains('save-btn')){
		saveChanges();
	}
	if (e.target && e.target.classList.contains('modify-btn')){
		modifyList();
	}
	if (e.target && e.target.classList.contains('checkbox-img')){
		checkboxSwap(e.target);
	}
	if (e.target && e.target.classList.contains('delete-img')) {
		removeElement(e.target);
		location.reload();
	}
});
function hashHandler() {
	const hash = window.location.hash;
	if(hash === '#add') {
		rootNode.innerHTML = addPage;
	} else if(hash === '#modify') {
		rootNode.innerHTML = modifyPage();
	} else {
		rootNode.innerHTML = mainPage;
		checkLength();
	}
}
function checkLength() {
	let currentLocal = checkLocalStorage();
	let minLength = 0;
	if(currentLocal.length > minLength) {
		const todoWrap = document.querySelector('#todo-list');
		todoWrap.innerHTML = appendOptions();
	} else {
		let hidden = document.getElementById('hiddenp');
		hidden.classList.remove('hidden');
	}
}
function checkLocalStorage() {
	let storageList = localStorage.getItem('list');
	let parsedList;
	if (storageList === null) {
		localStorage.setItem('list', JSON.stringify(todoItems));
		storageList = localStorage.getItem('list');
	}
	parsedList = JSON.parse(storageList);
	return parsedList;
}
function appendOptions() {
	let currentLocal = checkLocalStorage();
	let list = '';
	for(let item of currentLocal) {
		list += populateOption(item.isDone, item.id, item.description);
	}	
	return list;
}
function populateOption(state, id, title) {
	const todoListTemplate = `
		<div class="content-item" id="${id}">
			<button type="button" class="btn checkbox-btn">
				<img class="checkbox-img" src="${state ? 'assets/img/done-s.png' : 'assets/img/todo-s.png'}" alt="todo">
			</button>
			<p class="${state ? 'content-text-disabled' : 'content-text'}">${title}</p>
			<button type="button" class="btn delete-btn">
				<img class="delete-img" src="assets/img/remove-s.jpg" alt="remove">
			</button>
		</div>
	`;
	return todoListTemplate;
}
function saveChanges() {
	let inputValue = document.querySelector('.input-text');
	if(inputValue.value.length !== null &&
		inputValue.value.trim()) {
		let currentLocal = checkLocalStorage();
		let index;
		const item = {
			isDone: false,
			id: '',
			description: ''
		}
		const min = 0;
		const max = 1;
		const multiplier = 100000;
		item.id = Math.round(Math.random(min, max)*multiplier);
		item.description = document.querySelector('.input-text').value;
		for(let item of currentLocal) {
			if(item.isDone === true) {
				index = currentLocal.indexOf(item);
				break;
			}			
		}
		if(index !== undefined) {
			currentLocal.splice(index, min, item);
		} else {
			currentLocal.push(item);
		}
		localStorage.setItem('list', JSON.stringify(currentLocal));
		window.location.hash = '#main';
	}
}
function removeElement(target) {
	let id = +target.closest('.content-item').id;
	let elem = document.getElementById(id);
	let currentLocal = checkLocalStorage();
	currentLocal = currentLocal.filter(function(el) {
		return el.id !== id;
	});	
	localStorage.setItem('list', JSON.stringify(currentLocal));
	return elem.parentNode.removeChild(elem);
}
function checkboxSwap(target) {
	let elem = target.closest('.content-item');
	let text = elem.querySelector('.content-text');
	if(text.class !== 'content-text-disabled'){
		removeElement(target);
		let currentLocal = checkLocalStorage();
		const item = {
			isDone: true,
			id: '',
			description: ''
		}
		item.id = +elem.id;
		item.description = text.innerHTML;
		currentLocal.push(item);
		localStorage.setItem('list', JSON.stringify(currentLocal));
		location.reload();
	}
}
function modifyStart(el) {
	let targetId = el.closest('.content-item').id;
	let targetText = el.innerHTML;
	let array = [targetId, targetText];
	localStorage.setItem('modify', JSON.stringify(array));
}
function modifyList() {
	const firstElem = 0;
	let currentLocal = checkLocalStorage();
	let id = +JSON.parse(localStorage.getItem('modify'))[firstElem];
	let updatedTitle = document.querySelector('.modify-text').value;
	if(updatedTitle.length !== null &&
			updatedTitle.trim()) {
		for(let item of currentLocal) {
			if(item.id === id) {
				item.description = updatedTitle;
			}
		}
		localStorage.setItem('list', JSON.stringify(currentLocal));
		window.location.hash = '#main';
	}
}