import { fetchLogin } from "./services";

import reducer, { intialState } from "./reducer";

import FormLogin from "./FormLogin";

import "./App.css";
import { useReducer } from "react";
import { ACTIONS } from "./constants";

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  // Make this function work first, then learn context api
  function onLogin(username) {
    fetchLogin(username)
      .then((data) => {
        dispatch({ type: ACTIONS.LOG_IN, username: data.username });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
      <FormLogin onLogin={onLogin} />
    </div>
  );
}

export default App;
