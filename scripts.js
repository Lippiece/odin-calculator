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
};
let multiply = (input1, input2) => {
	return input1 * input2;
};
let divide = (input1, input2) => {
	if (input2 !== 0) {
		return input1 / input2;
	}
};
