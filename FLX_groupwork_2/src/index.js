const inputMsg = document.getElementById('input_message');
const outputMsg = document.getElementById('output_message');
const errorMsg = document.getElementById('error');
const transpileBtn = document.getElementById('transpile-btn');

transpileBtn.addEventListener('click', transpileCode);

function transpileCode() {
	const initialCode = inputMsg.value;
	const lex = str => str.split(' ' || '↵').map(s => s.trim()).filter(s => s.length);
	const spaces = str => str.join(' ');
	populateResult(spaces(swapElements(lex(initialCode))));
}
function populateResult(outputCode) {
	outputMsg.value = outputCode;
	populateError();
}
function populateError() {
	errorMsg.innerText = 'Transpilation completed... No errors found';
}
function swapElements(outputCode) {
	let newOutputCode = [];
	for(let i = 0; i < outputCode.length; i++) {
		if(outputCode[i] == "<=") {
			newOutputCode[i] = '=';
		} else if(outputCode[i] == "++") {
			newOutputCode[i] = '+';
		} else if(outputCode[i] == "--") {
			newOutputCode[i] = '-';
		} else if(outputCode[i] == "^") {
			newOutputCode[i] = '*';
		} else if(outputCode[i] == "%") {
			newOutputCode[i] = '/';
		} else if(outputCode[i] == "#") {
			newOutputCode[i] = '//';
		} else if(outputCode[i] === "repeat") {
			newOutputCode[i] = 'for';
		} else if(outputCode[i] === "int") {
			newOutputCode[i] = 'let';
		} else if(outputCode[i] === "float") {
			newOutputCode[i] = 'let';
		} else if(outputCode[i] === "string") {
			newOutputCode[i] = 'let';
		} else {
			newOutputCode[i] = outputCode[i];
		}
	}
	return newOutputCode;
}
// 
// (,) - //Line #4: syntax error
// 'a: int' = 'var a' && 'int i' = 'var i' float, string
// '<=' = '='
// '++' = '+'
// '--' = '-'
// '^' = '*'
// '%' = '/'
// '#' = '//'
// 'repeat' = 'for'