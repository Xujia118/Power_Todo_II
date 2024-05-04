import { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";

import { LOGIN_STATUS } from "./constants";
import reducer, { intialState } from "./reducer";
import { checkSession, onLogin, onLogout, onAddTask } from "./utils";

import FormLogin from "./FormLogin";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";

import "./App.css";
import Header from "./Header";
import AddTask from "./AddTask";

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
          <Header user={state.username} onLogout={onLogout(dispatch)} />
          <main>
            <Routes>
              <Route
                path="/"
                element={<TaskList tasks={state.taskList} />}
              ></Route>
              <Route
                path="/:taskId"
                element={<TaskDetail notes={state.noteList} />}
              ></Route>
              <Route
                path="/add"
                element={<AddTask onAddTask={onAddTask(dispatch)} />}
              ></Route>
            </Routes>
          </main>
        </>
      )}
    </>
  );
}

export default App;
