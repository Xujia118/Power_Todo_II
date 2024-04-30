import { useReducer } from "react";
import reducer, { intialState } from "./reducer";

import { onFetchTasks, onLogin, onLogout } from "./utils";

import FormLogin from "./FormLogin";
import TaskList from "./TaskList";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <div>
      <button className="" type="button" onClick={onLogout(dispatch)}>
        Logout
      </button>

      <button className="" type="button" onClick={onFetchTasks(dispatch)}>
        Get Tasks
      </button>

      <FormLogin onLogin={onLogin(dispatch)} />
      <TaskList />
    </div>
  );
}

export default App;
