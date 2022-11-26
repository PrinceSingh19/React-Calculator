import { useReducer } from "react";
import Digit from "./components/Digit";
import Operation from "./components/Operation";
import { reducer, ACTIONS } from "./reducer/reducer";

function App() {
	const [{ currentVal, prevVal }, dispatch] = useReducer(reducer, {
		currentVal: 0,
		prevVal: null,
		operation: null,
	});

	return (
		<>
			<h1 className="flex justify-center m-3 text-3xl font-serif font-extrabold text-slate-700 ">
				React Calculator
			</h1>
			<div className="flex flex-column justify-center">
				<div className="grid grid-cols-4  space-x-1 space-y-1 bg-gradient-to-r from-cyan-900 to-slate-800 mt-9 p-10 m-2 rounded-3xl">
					<div className="flex flex-col items-end col-span-full bg-slate-800 h-16  justify-around rounded-md  border-2 border-neutral-700">
						<div className="text-slate-400 px-2 break-words break-all text-sm">{prevVal}</div>
						<div className="text-white px-2  break-words break-all text-xl">{currentVal}</div>
					</div>
					<button
						className="p-3 bg-slate-300 rounded-md col-span-2 hover:bg-slate-100"
						onClick={() => dispatch({ type: ACTIONS.CLEAR })}
					>
						AC
					</button>
					<button
						className="p-3 bg-slate-300 rounded-md hover:bg-slate-100"
						onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
					>
						DEL
					</button>
					<Operation dispatch={dispatch} operation="/" />
					<Digit dispatch={dispatch} digit="1" />
					<Digit dispatch={dispatch} digit="2" />
					<Digit dispatch={dispatch} digit="3" />
					<Operation dispatch={dispatch} operation="*" />
					<Digit dispatch={dispatch} digit="4" />
					<Digit dispatch={dispatch} digit="5" />
					<Digit dispatch={dispatch} digit="6" />
					<Operation dispatch={dispatch} operation="+" />
					<Digit dispatch={dispatch} digit="7" />
					<Digit dispatch={dispatch} digit="8" />
					<Digit dispatch={dispatch} digit="9" />
					<Operation dispatch={dispatch} operation="-" />
					<Digit dispatch={dispatch} digit="." />
					<Digit dispatch={dispatch} digit="0" />
					<button
						className="p-3 bg-orange-400 rounded-md col-span-2 hover:bg-slate-100"
						onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
					>
						=
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
