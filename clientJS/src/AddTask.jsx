import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AddTask.css";

function AddTask({ onAddTask }) {
  const navigate = useNavigate()
   
  const [newTask, setNewTask] = useState({
    name: "",
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
    navigate("/") // To verify...
  }
  return (
    <>
      <form className="form-add-task" onSubmit={handleSubmit}>
        <div className="form-container">
          <label htmlFor="">
            Task Title:
            <input
              type="text"
              name="name"
              placeholder="Add task..."
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-container">
          <label htmlFor="">
            Task Deadline
            <input type="date" name="deadline" onChange={handleChange} />
          </label>
        </div>

        <div className="button-container">
          <button className="button-add-task" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </>
  );
}

export default AddTask;
