import { LOGIN_STATUS, SERVER, CLIENT, ACTIONS } from "./constants";

export const intialState = {
  error: "",
  username: "",
  loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
  taskList: {},
  noteList: {},
};

function reducer(state, action) {
  switch (action.type) {
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
    case ACTIONS.LOAD_NOTES:
      return {
        ...state,
        noteList: action.payload
      }
    
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        taskList: {
          ...taskList,
          [action.payload.id]: action.payload
        }
      }

    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        taskList: {
          
        }
      }


      
    default:
      return state;
  }
}

export default reducer;