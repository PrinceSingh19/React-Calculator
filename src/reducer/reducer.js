export const ACTIONS = {
	ADD_DIGIT: "add-digit",
	CLEAR: "clear-out",
	CHOOSE_OPERATION: "choose-operation",
	EVALUATE: "evaluate",
	DELETE_DIGIT: "delete-digit",
};
export const reducer = (state, { type, payload }) => {
	switch (type) {
		case ACTIONS.ADD_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					currentVal: payload.digit,
					overwrite: false,
				};
			}
			if (payload.digit === "0" && state.currentVal === "0") return state;
			if (payload.digit === "." && state.currentVal.includes(".")) return state;
			return {
				...state,
				currentVal: `${state.currentVal || ""}${payload.digit}`,
			};

		case ACTIONS.CHOOSE_OPERATION:
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

		/* case ACTIONS.EVALUATE:
      return evalate() */
		case ACTIONS.CLEAR:
			return {
				...state,
				currentVal: null,
				prevVal: null,
			};

		case ACTIONS.EVALUATE:
			if (state.operation === null || state.currentVal === null || state.prevVal === null) {
				return state;
			}
			return {
				...state,
				overwrite: true,
				prevVal: null,
				operation: null,
				currentVal: evaluate(state),
			};

		case ACTIONS.DELETE_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					overwrite: false,
					currentVal: null,
				};
			}
			if (state.currentVal === null) return state;
			if (state.currentVal.length === 1) {
				return {
					...state,
					currentVal: null,
				};
			}
			return {
				...state,
				currentVal: state.currentVal.slice(0, -1),
			};
		default:
			return {
				...state,
			};
	}
};

export function evaluate({ currentVal, prevVal, operation }) {
	const prev = parseFloat(prevVal);
	const curr = parseFloat(currentVal);
	let result = "";
	if (isNaN(prev) || isNaN(curr)) return "";
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
	return result.toString();
}
