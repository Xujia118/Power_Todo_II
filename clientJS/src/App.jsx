import { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";

import { LOGIN_STATUS } from "./constants";
import reducer, { intialState } from "./reducer";
import { checkSession, onLogin, onLogout } from "./utils";

import FormLogin from "./FormLogin";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    checkSession(dispatch)();
  }, []);

  return (
    <>
      {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
        <FormLogin onLogin={onLogin(dispatch)} />
      )}

      {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <>
          <button className="" type="button" onClick={onLogout(dispatch)}>
            Logout
          </button>
          <Routes>
            <Route
              path="/"
              element={<TaskList tasks={state.taskList} />}
            ></Route>
            <Route
              path="/:taskId"
              element={<TaskDetail notes={state.noteList} />}
            ></Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
