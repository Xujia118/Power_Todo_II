import { LOGIN_STATUS, SERVER, CLIENT, ACTIONS } from "./constants";

export const intialState = {
  error: "",
  isLoading: false,
  username: "",
  loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
  taskList: {},
  noteList: {},
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case ACTIONS.LOG_IN:
      return {
        ...state,
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.payload,
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
        taskList: action.payload,
        }
    // The following actions are solely to trigger useEffect to call checkSession
    case ACTIONS.ADD_TASK:
      return {
        ...state
      }
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
      }
    case ACTIONS.UPDATE_TASK:
      return {
        ...state
      }

    // The same for notes. We don't care about result. We just fetch the latest notes
    case ACTIONS.LOAD_NOTES:
      return {
        ...state,
        noteList: action.payload
      }
    case ACTIONS.ADD_NOTE:
      return {
        ...state,
      }
    case ACTIONS.DELETE_NOTE:
      return {
        ...state,
      }
    case ACTIONS.UPDATE_NOTE:
      return {
        ...state,
      }

      
    default:
      return state;
  }
}

export default reducer;