export const ACTIONS = {
	ADD_DIGIT: "add-digit",
	CLEAR: "clear-out",
	CHOOSE_OPERATION: "choose-operation",
	EVALUATE: "evaluate",
	DELETE_DIGIT: "delete-digit",
};
export const reducer = (state, { type, payload }) => {
	switch (type) {
		// implementing the digit add action
		case ACTIONS.ADD_DIGIT:
			if (state.overwrite) {
				//checking the possibility to overwrite the digits
				return {
					...state,
					currentVal: payload.digit,
					overwrite: false,
				};
			}
			if (payload.digit === "0" && state.currentVal === "0") return state; // making sure that 000 like situation do not occur
			if (payload.digit === "." && state.currentVal.includes(".")) return state; //making sure that . is not added more than once
			return {
				...state,
				currentVal: `${state.currentVal || ""}${payload.digit}`,
			};

		case ACTIONS.CHOOSE_OPERATION: //selecting the operation
			if (state.currentVal === null && state.prevVal === null) {
				return state;
			}
			if (state.currentVal === null) {
				return {
					...state,
					operation: payload.operation,
				};
			}

			if (state.prevVal === null) {
				return {
					...state,
					operation: `${payload.operation}`,
					prevVal: `${state.currentVal}${payload.operation}`,
					currentVal: null,
				};
			}
			return {
				...state,
				prevVal: `${evaluate(state)} ${payload.operation}`,
				operation: payload.operation,
				currentVal: null,
			};

		case ACTIONS.CLEAR: //clearing the display field
			return {
				...state,
				currentVal: null,
				prevVal: null,
			};

		case ACTIONS.EVALUATE: //implementing the evaluate feature
			if (state.operation === null || state.currentVal === null || state.prevVal === null) {
				//making sure that it do not implement until all the values are inplace
				return state;
			}
			return {
				...state,
				overwrite: true,
				prevVal: null,
				operation: null,
				currentVal: evaluate(state),
			};

		case ACTIONS.DELETE_DIGIT: //deleting the values one by one
			if (state.overwrite) {
				//if value is after evaluating and we want to clear the fields after = then clear all
				return {
					...state,
					overwrite: false,
					currentVal: null,
				};
			}
			if (state.currentVal === null) return state;
			if (state.currentVal.length === 1) {
				//if one value the return null
				return {
					...state,
					currentVal: null,
				};
			}
			return {
				...state,
				currentVal: state.currentVal.slice(0, -1), //deleting the values one by one
			};
		default:
			return {
				...state,
			};
	}
};

export function evaluate({ currentVal, prevVal, operation }) {
	const prev = parseFloat(prevVal); //converting the string values into integer
	const curr = parseFloat(currentVal);
	let result = "";
	if (isNaN(prev) || isNaN(curr)) return ""; //making sure that values are number
	//eslint-disable-next-line
	switch (operation) {
		case "+":
			result = prev + curr;
			break;
		case "-":
			result = prev - curr;
			break;
		case "*":
			result = curr * prev;
			break;
		case "/":
			result = prev / curr;
			break;
	}
	return result.toString(); //returning the values as string
}
