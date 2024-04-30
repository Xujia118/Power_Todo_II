import { LOGIN_STATUS, SERVER, CLIENT, ACTIONS } from "./constants";

export const intialState = {
  error: "",
  username: "",
  loginStatus: LOGIN_STATUS.PENDING,
  taskList: {},
  noteList: {},
};

function reducer(state, action) {
  switch ((state, action)) {
    case ACTIONS.LOG_IN:
      return {
        ...state,
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
      };
    case ACTIONS.LOG_OUT:
      return {
        ...state,
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        username: "",
      };
    case ACTIONS.LOAD_TASKS:
      return {
        ...state,
        taskList: action.tasks,
        }
      
    default:
      return state;
  }
}

export default reducer;