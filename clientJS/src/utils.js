import { ACTIONS } from "./constants";

import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchTasks,
  fetchAddTask,
  fetchDeleteTask,
  fetchUpdateTask,
  fetchNotes,
  fetchAddNote,
  fetchDeleteNote,
  fetchUpdateNote,
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
        dispatch({ type: ACTIONS.ADD_TASK });
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
        dispatch({ type: ACTIONS.DELETE_TASK });
        console.log(data);
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
        dispatch({ type: ACTIONS.UPDATE_TASK });
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
export function onFetchNotes(dispatch) {
  return function (taskId) {
    fetchNotes(taskId)
      .then((data) => {
        dispatch({ type: ACTIONS.LOAD_NOTES, payload: data.allNotes })
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function onAddNote(dispatch) {
  return function (taskId) {
    fetchAddNote({taskId, newNote})
      .then(() => {
        dispatch({ type: ACTIONS.ADD_NOTE })
        return fetchNotes()
      })
      .then(data => {
        dispatch({ type: ACTIONS.LOAD_NOTES, payload: data.allNotes });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function onDeleteNote(dispatch) {
  return function (taskId) {
    fetchDeleteNote(taskId)
      .then(() => {
        dispatch({ type: ACTIONS.DELETE_NOTE });
        return fetchNotes();
      })
      .then((data) => {
        dispatch({ type: ACTIONS.LOAD_NOTES, payload: data.allNotes });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function onUpdateNote(dispatch) {
  return function (taskId) {
    fetchUpdateNote(taskId)
      .then(() => {
        dispatch({ type: ACTIONS.UPDATE_NOTE });
        return fetchNotes();
      })
      .then((data) => {
        dispatch({ type: ACTIONS.LOAD_NOTES, payload: data.allNotes });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


