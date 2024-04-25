import { useReducer } from "react";
import reducer, { intialState } from "./reducer";

import { onLogin } from "./utils";

import FormLogin from "./FormLogin";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <div>

      <button
        className=""
        type="button"
        onClick={() => {
          fetch("/api/v1/session");
        }}
      >
        test
      </button>
      
      <FormLogin onLogin={onLogin(dispatch)} />
    </div>
  );
}

export default App;
