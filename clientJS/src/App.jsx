import { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";

import reducer, { intialState } from "./reducer";
import { checkSession, onLogin, onLogout } from "./utils";

import FormLogin from "./FormLogin";
import TaskList from "./TaskList";

import "./App.css";
import TaskDetail from "./TaskDetail";

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    checkSession(dispatch)();
  }, []);

  return (
    <div>
      <button className="" type="button" onClick={onLogout(dispatch)}>
        Logout
      </button>
      <FormLogin onLogin={onLogin(dispatch)} />

      <Routes>
        <Route path="/" element={<TaskList tasks={state.taskList} />}></Route>
        <Route
          path="/:taskId"
          element={<TaskDetail notes={state.noteList} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
