let spans = document.querySelectorAll("span");
let buttons = document.querySelectorAll("button");
let inputs = document.querySelectorAll("input");

let slider = inputs[0];
let currentDecimals = spans[0];
let outputField = spans[1];
let decimals = 3;
let tempTotal;

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

/* Parse the input for future operations */
function getInput() {
	/* Put the inputs and operators in arrays */
	operands = input.match(/\d*\.*\d+/g);
	operands = operands.map(x => parseFloat(x));
	operators = input.match(/ \D/g);
	/* Remove the whitespaces */
	operators = operators.map(x => x.replace(/\s/, ""));
	console.log("Operands and operators: ", operands, operators);
}

/* Stolen from W3C */
function decimalAdjust(type, value, exp) {
	// If the exp is undefined or zero...
	if (typeof exp === "undefined" || +exp === 0) {
		return Math[type](value);
	}
	value = +value;
	exp = +exp;
	// If the value is not a number or the exp is not an integer...
	if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
		return NaN;
	}
	// Shift
	value = value.toString().split("e");
	value = Math[type](+(value[0] + "e" + (value[1] ? (+value[1] - exp) : -exp)));
	// Shift back
	value = value.toString().split("e");
	return +(value[0] + "e" + (value[1] ? (+value[1] + exp) : exp));
}
function round10(value, exp) {
	return decimalAdjust("round", value, exp);
}

/* Perform the operations and trim the output array */
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
		tempTotal = operands[0];
		operands[0] = round10(operands[0], -decimals);
	}
}

/* Add the event listeners to the buttons regardless of their properties */
let digit = /[0-9]/;
let operand = /\+|\-|\*|\//; /* regex is a real shit */
for (let i = 0; i < buttons.length; i++) {
	/* Digits */
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

		/* Operators */
		switch (buttons[i].textContent) {
		case "+":
		case "-":
		case "/":
		case "*":
			if (pressed === "digit" || pressed === "eval") {
				pressed = buttons[i].textContent;
				input += " " + buttons[i].textContent;
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
		outputField.textContent = input;
	});
}

/* Get decimals value from the slider and adjust the evaluation */
};
slider.oninput = function updateValue () {
	decimals = this.value;
	currentDecimals.textContent = decimals;
	decimals = parseInt(decimals);
};
