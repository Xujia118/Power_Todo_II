import { ACTIONS } from "./constants";

import { fetchLogin } from "./services";

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
