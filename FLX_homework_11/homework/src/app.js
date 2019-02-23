//Announce global variables
let rootNode = document.getElementById('root');
let submitBtn = document.getElementById('submit-btn');
let inputValue = document.getElementById('add-text');
//Add event to the submit button
submitBtn.addEventListener('click', addElement);
// Check input string
function checkInput() {
	if(inputValue.value.length !== null &&
		inputValue.value.trim()) {
		submitBtn.removeAttribute('disabled');
	} else {
		submitBtn.setAttribute('disabled', 'on');
	}
}
//Add NEW text to the paragraph in NEW element
function addText(text) {
	let htmlElement = `
		<div class="content-item" draggable="true">
			<button type="button" class="btn action-btn checkbox-btn">
				<i class="material-icons checkbox-icon">check_box_outline_blank</i>
			</button>
			<p class="content-text">${text}</p>
			<button type="button" class="btn action-btn delete-btn">
				<i class="material-icons">delete</i>
			</button>
		</div>
		`;
	return htmlElement;
}
//Add NEW element to the DOM
function addElement(evt) {
	let domElement = addText(inputValue.value);
	rootNode.innerHTML += domElement;
	inputValue.value = '';
	evt.preventDefault();
	//Check when element marked as done
	let checkboxBtn = document.getElementsByClassName('checkbox-btn');
	for(let i = 0; i < checkboxBtn.length; i++) {
		checkboxBtn[i].addEventListener('click', checkboxSwap);
	}
	function checkboxSwap() {
		let checkboxSwap = this.firstElementChild.innerHTML = 'check_box';
		return checkboxSwap;
	}
	//Check when element deleted
	let deleteBtn = document.getElementsByClassName('delete-btn');
	for(let i = 0; i < deleteBtn.length; i++) {
		deleteBtn[i].addEventListener('click', removeElement);
	}
	function removeElement() {
		return rootNode.removeChild(this.parentElement);
	}
	//DRAG & DROP
	let dragSrcEl = null;
	function handleDragStart(e) {
		dragSrcEl = this;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', this.outerHTML);
		this.classList.add('dragElem');
	}
	function handleDragOver(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}
		this.classList.add('over');
		e.dataTransfer.dropEffect = 'move';
		return false;
	}
	function handleDragEnter(e) {
		// this / e.target is the current hover target.
	}
	function handleDragLeave(e) {
		this.classList.remove('over');
	}
	function handleDrop(e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		if (dragSrcEl !== this) {
			this.parentNode.removeChild(dragSrcEl);
			let dropHTML = e.dataTransfer.getData('text/html');
			this.insertAdjacentHTML('beforebegin',dropHTML);
			let dropElem = this.previousSibling;
			addDnDHandlers(dropElem);
		}
		this.classList.remove('over');
		return false;
	}
	function handleDragEnd(e) {
		this.classList.remove('over');
	}
	function addDnDHandlers(elem) {
		elem.addEventListener('dragstart', handleDragStart, false);
		elem.addEventListener('dragenter', handleDragEnter, false)
		elem.addEventListener('dragover', handleDragOver, false);
		elem.addEventListener('dragleave', handleDragLeave, false);
		elem.addEventListener('drop', handleDrop, false);
		elem.addEventListener('dragend', handleDragEnd, false);
	}
	let dragItems = document.querySelectorAll('.content-item');
	[].forEach.call(dragItems, addDnDHandlers);
}
//Check that number of element will be less than 10
document.onclick = function(event) {
	if(event.target.className === 'material-icons') {
		let elementsNumber = document.getElementsByClassName('content-item');
		const maxNumber = 10;
		let paragraph = document.querySelector('.notification-text');
		if(maxNumber <= elementsNumber.length) {
			submitBtn.setAttribute('disabled', 'on');
			paragraph.style.display = 'block';
			inputValue.setAttribute('disabled', 'on');
		} else {
			submitBtn.setAttribute('disabled', 'on');
			paragraph.style.display = 'none';
			inputValue.removeAttribute('disabled');
		}
	}
}