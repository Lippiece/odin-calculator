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
	operators = input.match(/ \D/g);
	/* Remove the whitespaces */
	operators = operators.map(x => x.replace(/\s/, ""));
}

function evaluate() {
	for (let i = 0; i < operators.length; i++) {
		switch (operators[i]) {
		case "+":
			inputs.splice(0, 2, add(inputs[0], inputs[1]));
			break;
			
		case "-":
			inputs.splice(0, 2, substract(inputs[0], inputs[1]));
			break;
			
		case "*":
			inputs.splice(0, 2, multiply(inputs[0], inputs[1]));
			break;
			
		case "/":
			inputs.splice(0, 2, divide(inputs[0], inputs[1]));
			break;
		}
	}
}

for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", () => {
		switch (buttons[i].textContent) {
		case "+":
		case "-":
		case "/":
		case "*":
			if (pressed !== buttons[i].textContent) {
				alert("You pressed the button: " + buttons[i].textContent);
				input += " " + buttons[i].textContent;
				pressed = buttons[i].textContent;
				output.textContent =+ input;
			} else {
				break;
			}
			break;

	});
}