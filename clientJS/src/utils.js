import { ACTIONS } from "./constants";

import { fetchSession, fetchLogin, fetchLogout } from "./services";

export function checkSession(dispatch) {
  return function () {
    fetchSession()
      .then((data) => {
        dispatch({ type: ACTIONS.LOG_IN, username: data.username }); // maybe return task list after this
        console.log(data);
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
