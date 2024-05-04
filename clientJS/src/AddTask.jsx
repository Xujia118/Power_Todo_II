import "./AddTask.css";

function AddTask() {
  function handleSubmit(e) {
    e.preventDefault();
    // call add task service
    // we have a ful package to send

    // At submit, navigate back to tasks page
    
  }
  return (
    <>
      <form className="form-add-task" onSubmit={handleSubmit}>
        <div className="form-container">
          <label htmlFor="">
            Task Title:
            <input type="text" name="newTaskName" placeholder="Add task..." />
          </label>
        </div>

        <div className="form-container">
          <label htmlFor="">
            Task Deadline
            <input type="date" name="newTaskDeadline"/>
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
