import { ACTIONS } from "./constants";

import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchTasks,
  fetchAddTask,
  fetchDeleteTask,
  fetchUpdateTask,
} from "./services";

// Sessions
export function checkSession(dispatch) {
  return function () {
    fetchSession()
      .then((data) => {
        dispatch({ type: ACTIONS.LOG_IN, payload: data.username });
        return fetchTasks();
      })
      .then((data) => {
        dispatch({ type: ACTIONS.LOAD_TASKS, payload: data.allTasks });
      })
      .catch((err) => console.log(err));
  };
}

export function onLogin(dispatch) {
  return function (username) {
    fetchLogin(username)
      .then((data) => {
        dispatch({ type: ACTIONS.LOG_IN, username: data.username });
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

// For add, update and delete, DB returns a message success or not
// After each operation, We just need to load task list again
// This way, our task list is always updated with DB

export function onAddTask(dispatch) {
  return function (newTask) {
    fetchAddTask(newTask)
      .then(() => {
        return fetchTasks();
      })
      .then((data) => {
        dispatch({ type: ACTIONS.LOAD_TASKS, payload: data.allTasks });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function onDeleteTask(dispatch) {
  return function (taskId) {
    fetchDeleteTask(taskId)
      .then((data) => {
        console.log(data)
        return fetchTasks();
      })
      .then((data) => {
        dispatch({ type: ACTIONS.LOAD_TASKS, payload: data.allTasks });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function onUpdateTask(dispatch) {
  return function (taskId) {
    fetchUpdateTask(taskId)
      .then(() => {
        return fetchTasks();
      })
      .then((data) => {
        dispatch({ type: ACTIONS.LOAD_TASKS, payload: data.allTasks });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// Notes
// export function on
