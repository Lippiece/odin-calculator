let inputs;
let operators;
let output;

let add = (inputs1, inputs2) => {
	return parseInt(inputs1) + parseInt(inputs2);
};
let substract = (inputs1, inputs2) => {
	return parseInt(inputs1) - parseInt(inputs2);
};
let multiply = (inputs1, inputs2) => {
	return parseInt(inputs1) * parseInt(inputs2);
};
let divide = (inputs1, inputs2) => {
	if (parseInt(inputs2) !== 0) {
		return parseInt(inputs1) / parseInt(inputs2);
	}
};

let getInput = () => {
	let input = "44 + 55 / 66";
	/* Put the inputs and operators in arrays */
	inputs = input.match(/\d+/g);
	inputs = inputs.map(x => parseInt(x));
	operators = input.match(/ \D/g);
	/* Remove the whitespaces */
	operators = operators.map(x => x.replace(/\s/, ""));
	console.log("Inputs and operators: ",inputs, operators);
};
let multiply = (input1, input2) => {
	return input1 * input2;
};
let divide = (input1, input2) => {
	if (input2 !== 0) {
		return input1 / input2;
	}
};
