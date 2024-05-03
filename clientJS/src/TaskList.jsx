import { Link } from "react-router-dom";

import "./TaskList.css";

function TaskList({ tasks }) {
  function handleSubmit(e) {
    e.preventDefault();
    // call add task service
  }

  return (
    <>
      <form className="form-add-task" onSubmit={handleSubmit}>
        <input type="text" placeholder="Add task..." />
        <button className="button-add-task" type="submit">
          Add Task
        </button>
      </form>

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
