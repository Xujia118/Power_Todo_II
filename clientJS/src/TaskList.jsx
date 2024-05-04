import { Link } from "react-router-dom";

import "./TaskList.css";

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
  function handleDelete(taskId) {
    onDeleteTask(taskId);
  }

  function handleEdit(taskId) {
    onUpdateTask(taskId);
  }

  return (
    <>
      <Link to={"/add"}>Add Task</Link>

      <ul className="task-list">
        {Object.values(tasks)
          .reverse()
          .map((task) => (
            <li className="task-item" key={task._id}>
              <Link to={`/${task._id}`}>
                <p className="task-name">{task.name}</p>
              </Link>
              {/* <p>Deadline: {task.deadline.slice(0, 10)}</p> */}
              <button className="button-edit" onClick={handleEdit(task._id)}>
                Edit
              </button>
              <button
                className="button-delete"
                onClick={handleDelete(task._id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}

export default TaskList;
