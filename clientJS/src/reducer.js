import { LOGIN_STATUS, SERVER, CLIENT, ACTIONS } from "./constants";

export const intialState = {
  error: "",
  username: "",
  loginStatus: LOGIN_STATUS.PENDING,
  taskList: {},
  noteList: {},
};

function reducer(state, action) {
    switch(state, action) {
        case ACTIONS.LOG_IN: 
        console.log('came here')
        return {
            ...state,
            loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
            username: action.username,
        }
    }
}

export default reducer;