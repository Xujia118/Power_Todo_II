import { ACTIONS } from "./constants";

import { fetchSession, fetchLogin } from "./services";

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
