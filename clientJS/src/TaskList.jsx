import { Link } from "react-router-dom";
import AddTask from "./AddTask"

import "./TaskList.css";

function TaskList({ tasks }) {

  return (
    <>
      <Link to={"/add"}>Add Task</Link>

      <ul className="task-list">
        {Object.values(tasks).map((task) => (
          <li className="task-item" key={task._id}>
            <Link to={`/${task._id}`}>
              <p className="task-name" >{task.name}</p>
            </Link>
            {/* <p className="task-notes">{task.notes}</p> */}
            {}
            <p className="task-date">{task.date}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskList;
