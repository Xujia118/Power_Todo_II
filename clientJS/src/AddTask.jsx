import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AddTask.css";

function AddTask({ onAddTask }) {
  const navigate = useNavigate();

  const [newTask, setNewTask] = useState({
    title: "",
    deadline: "",
  });

  function handleChange(e) {
    setNewTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddTask(newTask);
    navigate("/"); // To verify...
  }
  return (
    <div className="add-task-form-container">
      <form className="form-add-task" onSubmit={handleSubmit}>
        <div className="form-container">
          <label htmlFor="task-title" />
          Task Title:
          <input
            type="text"
            id="task-title"
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className="form-container">
          <label htmlFor="task-deadline" />
          Task Deadline
          <input
            type="date"
            id="task-deadline"
            name="deadline"
            onChange={handleChange}
          />
        </div>

        <div className="button-container">
          <button className="add-task" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
