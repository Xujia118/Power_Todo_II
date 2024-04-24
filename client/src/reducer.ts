import { 
    LOGIN_STATUS,
    SERVER,
    CLIENT,
    ACTIONS,
} from "./constants"

interface TaskList {
    [key: string]: any;
}

interface NoteList {
    [key: string]: any;
}

interface State {
    error: string,
    username: string,
    loginStatus: LOGIN_STATUS,
    taskList: TaskList,
    noteList: NoteList,
}

interface Action {
    type: ACTIONS;
}

export const intialState: State = {
    error: '',
    username: '',
    loginStatus: LOGIN_STATUS.PENDING,
    taskList: {},
    noteList: {},
}

function reducer(state: State, action: Action) {
    switch(action.type) {
        
        case.ACTIONS.LOGIN: 
        return {
            ...state,


        }
    }
}