import { Link } from "react-router-dom";

import Delete from "../public/delete_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import View from "../public/visibility_24dp_FILL0_wght400_GRAD0_opsz24.svg";
import Add from "../public/add_box_24dp_FILL0_wght400_GRAD0_opsz24.svg";

import "./TaskList.css";

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
  function handleDelete(taskId) {
    onDeleteTask(taskId);
  }

  function handleEdit(taskId) {
    // onUpdateTask(taskId);
  }

  return (
    <>
      <div className="task-container">
        <Link className="add-task-link" to={"/add"}>
          <img src={Add} alt="add a new task" />
        </Link>
      </div>

      <div className="task-container">
        <ul className="task-menu">
          {Object.values(tasks)
            .reverse()
            .map((task) => (
              <li className="task-item" key={task._id}>
                <Link className="task-link" to={`/${task._id}`}>
                  <p className="task-name">{task.name}</p>
                </Link>
                {/* <p>Deadline: {task.deadline.slice(0, 10)}</p> */}
                <div className="button-container">
                  <button
                    className="button-edit"
                    onClick={() => handleEdit(task._id)}
                  >
                    <img src={View} alt="view task detail" />
                  </button>
                  <button
                    className="button-delete"
                    onClick={() => handleDelete(task._id)}
                  >
                    <img src={Delete} alt="delete" />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default TaskList;
