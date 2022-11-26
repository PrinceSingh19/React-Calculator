import React from "react";
import { ACTIONS } from "../reducer/reducer";
const Operation = ({ dispatch, operation }) => {
	return (
		<button
			className="p-3  rounded-md hover:bg-slate-100 bg-orange-400"
			onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
		>
			{operation}
		</button>
	);
};

export default Operation;
