import { useReducer } from "react";
import reducer, { intialState } from "./reducer";

import { onLogin, onLogout } from "./utils";

import { fetchLogout } from "./services";

import FormLogin from "./FormLogin";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <div>
      <button
        className=""
        type="button"
        onClick={() => fetchLogout()}
        // onClick={() => {
        //   console.log("clicked");
        //   onLogout;
        // }}
      >
        Logout
      </button>

      <FormLogin onLogin={onLogin(dispatch)} />
    </div>
  );
}

export default App;
