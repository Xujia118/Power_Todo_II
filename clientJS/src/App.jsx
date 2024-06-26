import { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";

import { LOGIN_STATUS } from "./constants";
import reducer, { intialState } from "./reducer";
import {
  checkSession,
  onLogin,
  onLogout,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
  onFetchRecentNotes,
  onFetchAdditionalNotes,
  onAddNote,
  onDeleteNote,
  onUpdateNote,
} from "./utils";

import FormLogin from "./FormLogin";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";
import Header from "./Header";
import AddTask from "./AddTask";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    checkSession(dispatch)();
  }, [state.loginStatus, dispatch]);

  return (
    <>
      {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
        <main>
          <FormLogin onLogin={onLogin(dispatch)} />
        </main>
      )}

      {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <>
          <Header user={state.username} onLogout={onLogout(dispatch)} />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <TaskList
                    tasks={state.taskList}
                    onDeleteTask={onDeleteTask(dispatch)}
                    onUpdateTask={onUpdateTask(dispatch)}
                  />
                }
              ></Route>
              <Route
                path="/:taskId"
                element={
                  <TaskDetail
                    recentNotes={state.recentNoteList}
                    additionalNotes={state.additionalNoteList}
                    onFetchRecentNotes={onFetchRecentNotes(dispatch)}
                    onFetchAdditionalNotes={onFetchAdditionalNotes(dispatch)}
                    onAddNote={onAddNote(dispatch)}
                    onDeleteNote={onDeleteNote(dispatch)}
                    onUpdateNote={onUpdateNote(dispatch)}
                  />
                }
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
