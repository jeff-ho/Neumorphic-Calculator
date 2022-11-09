import "./App.css";
import { useState, useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0" ) return state
      if (payload.digit === "." && state.currentOperand.includes(".")) return state
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      };

    case ACTIONS.CLEAR:
      return {}

    

  }
};

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
    );
    console.log(currentOperand)

  
  return (
    <div className="container">
      <div className="calculator-border">
        <div className="calculator-grid">
          <div className="output">
            <div className="previous-operand">
              {previousOperand} {operation}
            </div>
            <div className="current-operand">{currentOperand}</div>
          </div>
          <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR}) }>AC</button>
          <button className="special-char">DEL</button>
          <OperationButton className="special-char" operation="/" dispatch={dispatch}></OperationButton>
          <DigitButton className="special-char" digit="1" dispatch={dispatch}></DigitButton>
          <DigitButton className="special-char" digit="2" dispatch={dispatch}></DigitButton>
          <DigitButton className="special-char" digit="3" dispatch={dispatch}></DigitButton>
          <OperationButton className="special-char" operation="*" dispatch={dispatch}></OperationButton>
          <DigitButton className="special-char" digit="4" dispatch={dispatch}></DigitButton>
          <DigitButton className="special-char" digit="5" dispatch={dispatch}></DigitButton>
          <DigitButton className="special-char" digit="6" dispatch={dispatch}></DigitButton>
          <OperationButton className="special-char" operation="+" dispatch={dispatch}></OperationButton>
          <DigitButton className="special-char" digit="7" dispatch={dispatch}></DigitButton>
          <DigitButton className="special-char" digit="8" dispatch={dispatch}></DigitButton>
          <DigitButton className="special-char" digit="9" dispatch={dispatch}></DigitButton>
          <OperationButton className="special-char" operation="-" dispatch={dispatch}></OperationButton>
          <DigitButton className="special-char" digit="." dispatch={dispatch}></DigitButton>
          <DigitButton className="special-char" digit="0" dispatch={dispatch}></DigitButton>
          <OperationButton className="special-char" operation="=" dispatch={dispatch}></OperationButton>
        </div>
      </div>
    </div>
  );
}

export default App;
