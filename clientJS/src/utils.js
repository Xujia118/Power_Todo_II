import { ACTIONS } from "./constants";

import { fetchSession, fetchLogin, fetchLogout, fetchTasks } from "./services";

// Sessions
export function checkSession(dispatch) {
  return function () {
    fetchSession()
      .then((data) => {
        dispatch({ type: ACTIONS.LOG_IN, payload: data.username });
        return fetchTasks();
      })
      .then(data => {
        console.log(data.allTasks)
        dispatch({ type: ACTIONS.LOAD_TASKS, payload: data.allTasks})
      })
      .catch((err) => console.log(err));
  };
}

export function onLogin(dispatch) {
  return function (username) {
    fetchLogin(username)
      .then((data) => {
        dispatch({ type: ACTIONS.LOG_IN, username: data.username });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function onLogout(dispatch) {
  return function () {
    fetchLogout()
      .then((data) => {
        console.log(data);
        dispatch({ type: ACTIONS.LOG_OUT });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// Tasks
export function onFetchTasks(dispatch) {
  return function () {
    fetchTasks()
      .then((data) => {
        console.log(data); // got the data, and now setTaskList 
        dispatch({ type: ACTIONS.LOAD_TASKS, payload: data.allTasks });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
