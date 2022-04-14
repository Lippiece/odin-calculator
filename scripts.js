let buttons = document.querySelectorAll("button");
let outputField = document.querySelector("span");

let input = "";
let operands = [];
let operators = [];
let pressed;

function add(inputs1, inputs2) {
	return parseFloat(inputs1) + parseFloat(inputs2);
}
function substract(inputs1, inputs2) {
	return parseFloat(inputs1) - parseFloat(inputs2);
}
function multiply(inputs1, inputs2) {
	return parseFloat(inputs1) * parseFloat(inputs2);
}
function divide(inputs1, inputs2) {
	if (parseFloat(inputs2) !== 0) {
		return parseFloat(inputs1) / parseFloat(inputs2);
	}
}

function getInput() {
	/* Put the inputs and operators in arrays */
	operands = input.match(/\d*\.*\d+/g);
	operands = operands.map(x => parseFloat(x));
	operators = input.match(/ \D/g);
	/* Remove the whitespaces */
	operators = operators.map(x => x.replace(/\s/, ""));
	console.log("Operands and operators: ", operands, operators);
}

function evaluate() {
	for (let i = 0; i < operators.length; i++) {
		switch (operators[i]) {
		case "+":
			operands.splice(0, 2, add(operands[0], operands[1]));
			break;

		case "-":
			operands.splice(0, 2, substract(operands[0], operands[1]));
			break;

		case "*":
			operands.splice(0, 2, multiply(operands[0], operands[1]));
			break;

		case "/":
			operands.splice(0, 2, divide(operands[0], operands[1]));
			break;
		}
	}
}

let digit = /[0-9]/;
let operand = /\+|\-|\*|\//; /* regex is a real shit */
for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", () => {
		if (digit.test(buttons[i].textContent)) {
			if (operand.test(pressed)) {
				pressed = "digit";
				input += " " + buttons[i].textContent;
			} else if (pressed === "eval") {
				pressed = "digit";
				input = buttons[i].textContent;
			} else {				
				pressed = "digit";
				input += buttons[i].textContent;
			}
		}
		
		switch (buttons[i].textContent) {
		case "+":
		case "-":
		case "/":
		case "*":
			if (pressed === "digit") {
				pressed = buttons[i].textContent;
				input += " " + buttons[i].textContent;
			} else if (pressed === "eval") {
				pressed = buttons[i].textContent;
				input = "";
				break;
			} else {
				break;
			}
			break;
			
		case ".":
			if (pressed === "digit") {
				input += buttons[i].textContent;
				pressed = buttons[i].textContent;
			}
			break;
			
		case "=":
			getInput();
			if (operators.length + 1 === operands.length) {
				pressed = "eval";
				evaluate();				
				input = operands[0];
			}
			break;
			
		case "CLEAR":
			input = "";
			operands = [];				
			outputField.textContent = operands;
			break;

		}
	});
}