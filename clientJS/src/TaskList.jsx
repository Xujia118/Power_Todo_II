import { Link } from "react-router-dom";

import "./TaskList.css";

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
  function handleDelete(taskId) {
    console.log("clicked")
    console.log(taskId)
    onDeleteTask(taskId);
  }

  function handleEdit(taskId) {
    // onUpdateTask(taskId);
  }

  return (
    <>
      <Link to={"/add"}>Add Task</Link>

      <ul className="task-list">
        {Object.values(tasks)
          .reverse()
          .map((task) => (
            <li className="task-item" key={task.id}>
              <Link to={`/${task.id}`}>
                <p className="task-name">{task.name}</p>
              </Link>
              {/* <p>Deadline: {task.deadline.slice(0, 10)}</p> */}
              <button className="button-edit" onClick={() => handleEdit(task.id)}>
                Edit
              </button>
              <button
                className="button-delete"
                onClick={() => handleDelete(task.id)}
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
