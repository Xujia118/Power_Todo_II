import React from "react";

function TaskList({ tasks }) {

  console.log(tasks)
  return (
    <ul>
      {Object.values(tasks).map((task) => (
        <li key={task._id}>
          <p>{task.name}</p>
          {/* <p>{task.notes}</p> */}
          <p>{task.date}</p>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
