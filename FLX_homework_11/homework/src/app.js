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
	//Announce variables for drag & drop functions
	let dragSrcEl = null;
	let dropPosEl = null;
	//Drag & drop functions
	function dragTarget(el) {
		let target = el.target;
		if (target.hasAttribute('draggable')) {
			return target;
		}
	}
	function handleDragStart(el) {
		dragSrcEl = dragTarget(el);
		if(!dragSrcEl) {
			return;
		}
	}
	function handleDragOver(el) {
		el.preventDefault();
		let dropPosEl = dragTarget(el);
		if(!dropPosEl) {
			return;
		}
	}
	function handleDragLeave(el) {
		let dropPosEl = dragTarget(el);
		if(!dropPosEl) {
			return;
		}
	}
	function handleDrop(el) {
		dropPosEl = dragTarget(el);
		if(!dropPosEl) {
			return;
		}
		el.preventDefault();
		let rect = dropPosEl.getBoundingClientRect();
		let num = 2;
		let middle = rect.top + (rect.bottom - rect.top) / num;
		let dropPosElEnd = middle <= el.clientY ? dropPosEl.nextSibling : dropPosEl;
		rootNode.insertBefore(dragSrcEl, dropPosElEnd);
	}
	function handleDragEnd() {
		//dragEnd for element
	}
	//Add event listeners for draggable elements
	rootNode.addEventListener('dragstart', handleDragStart, false);
	rootNode.addEventListener('dragover', handleDragOver, false);
	rootNode.addEventListener('dragleave', handleDragLeave, false);
	rootNode.addEventListener('drop', handleDrop, false);
	rootNode.addEventListener('dragend', handleDragEnd, false);
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