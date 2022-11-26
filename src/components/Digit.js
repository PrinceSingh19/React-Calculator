import React from "react";
import { ACTIONS } from "../reducer/reducer";
const Digit = ({ dispatch, digit }) => {
	return (
		<button
			className="p-3 bg-slate-300 rounded-md hover:bg-slate-100"
			onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
		>
			{digit}
		</button>
	);
};

export default Digit;
