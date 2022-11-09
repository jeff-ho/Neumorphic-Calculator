import "./App.css";
import { useReducer } from "react";
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
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand === ".") return state;
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      return {};
    
    case ACTIONS.EVALUATE:
      if (
        state.operation == null || 
        state.currentOperand == null || 
        state.previousOperand == null
        ) {
          return state
        }
      
        return {
          ...state,
          previousOperand: null,
          currentOperand: evaluate(state),
          operation: null,
          overwrite: true
        }
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: null,
          overwrite:false
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return {
          ...state, 
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }

  return computation.toString();
}

const integerFormat = new Intl.NumberFormat("en-us" ,{
  maximumFractionDigits: 0,
}) 

function formatOperand(operand) {
  if (operand == null) return
  const[integer, decimal] = operand.split('.')
  if (decimal == null) return integerFormat.format(integer)
  return `${integerFormat.format(integer)}.${decimal}`
} 

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="container">
      <div className="calculator-border">
        <div className="calculator-grid">
          <div className="output">
            <div className="previous-operand">
              {formatOperand(previousOperand)} {operation}
            </div>
            <div className="current-operand">{formatOperand(currentOperand)}</div>
          </div>
          <button
            className="span-two"
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            AC
          </button>
          <button className="special-char" onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
          <OperationButton
            className="special-char"
            operation="/"
            dispatch={dispatch}
          ></OperationButton>
          <DigitButton digit="7" dispatch={dispatch}></DigitButton>
          <DigitButton digit="8" dispatch={dispatch}></DigitButton>
          <DigitButton digit="9" dispatch={dispatch}></DigitButton>
          <OperationButton
            className="special-char"
            operation="*"
            dispatch={dispatch}
          ></OperationButton>
          <DigitButton digit="4" dispatch={dispatch}></DigitButton>
          <DigitButton digit="5" dispatch={dispatch}></DigitButton>
          <DigitButton digit="6" dispatch={dispatch}></DigitButton>
          <OperationButton
            className="special-char"
            operation="+"
            dispatch={dispatch}
          ></OperationButton>
          <DigitButton digit="1" dispatch={dispatch}></DigitButton>
          <DigitButton digit="2" dispatch={dispatch}></DigitButton>
          <DigitButton digit="3" dispatch={dispatch}></DigitButton>
          <OperationButton
            className="special-char"
            operation="-"
            dispatch={dispatch}
          ></OperationButton>
          <DigitButton
            className="special-char"
            digit="."
            dispatch={dispatch}
          ></DigitButton>
          <DigitButton digit="0" dispatch={dispatch}></DigitButton>
          <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
