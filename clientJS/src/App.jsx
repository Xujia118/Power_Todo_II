import { useEffect, useReducer } from "react";
import reducer, { intialState } from "./reducer";

import { checkSession, onFetchTasks, onLogin, onLogout } from "./utils";

import FormLogin from "./FormLogin";
import TaskList from "./TaskList";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);


  useEffect(() => {
    checkSession(dispatch)();
  }, [])

  return (
    <div>
      <button className="" type="button" onClick={onLogout(dispatch)}>
        Logout
      </button>

      <FormLogin onLogin={onLogin(dispatch)} />
      <TaskList tasks={state.taskList}/>
    </div>
  );
}

export default App;
