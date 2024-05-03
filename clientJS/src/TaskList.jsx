import { Link } from "react-router-dom";

function TaskList({ tasks }) {
  return (
    <ul>
      {Object.values(tasks).map((task) => (
        <li key={task._id}>
          <Link to={`/${task._id}`}>
            <p>{task.name}</p>
          </Link>
          {/* <p>{task.notes}</p> */}
          {}
          <p>{task.date}</p>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
