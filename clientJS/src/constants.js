export const LOGIN_STATUS = {
  PENDING: "pending",
  NOT_LOGGED_IN: "notLoggedIn",
  IS_LOGGED_IN: "loggedIn",
};

// Might be SERVER_CODES and CLIENT_CODES if we had more and different constants
export const SERVER = {
  AUTH_MISSING: "auth-missing",
  AUTH_INSUFFICIENT: "auth-insufficient",
  REQUIRED_USERNAME: "required-username",
  REQUIRED_TASK: "required-task",
  TASK_MISSING: "noSuchId", // Someone was inconsistent!
};

export const CLIENT = {
  NETWORK_ERROR: "networkError",
  NO_SESSION: "noSession",
  UNKNOWN_ACTION: "unknownAction",
};

export const MESSAGES = {
  // The [] below uses the variable value as the key
  [CLIENT.NETWORK_ERROR]:
    "Trouble connecting to the network.  Please try again",
  // Here we use 'dog' to simulate a bad password
  [SERVER.AUTH_INSUFFICIENT]:
    "Your username/password combination does not match any records, please try again.",
  [SERVER.REQUIRED_USERNAME]:
    "Please enter a valid (letters and/or numbers) username",
  [SERVER.REQUIRED_TASK]: "Please enter the task to do",
  default: "Something went wrong.  Please try again",
};

export const ACTIONS = {
  LOG_IN: "logIn",
  LOG_OUT: "logOut",

  LOAD_TASKS: "load tasks",
  ADD_TASK: "add task",
  DELETE_TASK: "delete task",
  UPDATE_TASK: "update task",

  LOAD_NOTES: "load notes",
  ADD_NOTE: "add note",
  DELETE_NOTE: "delete note",
  UPDATE_NOTE: "update note", 
  
  START_LOADING_TODOS: "startLoadingTodos",
  REPORT_ERROR: "reportError",
};
