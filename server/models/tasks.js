const { User, Task } = require("../schema");

async function getTasks(userId) {
  try {
    const query = await User.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "tasks",
          foreignField: "_id",
          as: "taskList",
        },
      },
    ]);

    return query[0].taskList;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function addTask(userId, newTask) {
  try {
    const addTask = {
      userId,
      ...newTask,
    };

    const task = await Task.create(addTask);

    // update user
    const updateResult = await User.updateOne(
      { _id: userId },
      { $push: { tasks: task._id } }
    );

    return !!updateResult.modifiedCount;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteTask(userId, taskId) {
  try {
    // Delete task from tasks collection
    const deleteTaskResult = await Task.deleteOne({ _id: taskId });

    // Delete task from tasks array in user
    const updatedResult = await User.updateOne(
      { _id: userId },
      { $pull: { tasks: taskId } }
    );

    if (
      deleteTaskResult.deletedCount === 1 &&
      updatedResult.modifiedCount == 1
    ) {
      console.log("Task deleted successfully");
      return true;
    } else {
      console.log("Task deletion failed");
      return false;
    }
  } catch (err) {
    console.log(err.message);
    throw new Error("Failed to delete task");
  }
}

// update task. Only update task name, leave notes name to notes apis
async function updateTask({ userId, taskId, newName }) {
  try {
    const updateResult = await User.updateOne(
      { userId, [`tasks.${taskId}`]: { $exists: true } },
      { $set: { [`tasks.${taskId}.name`]: newName } }
    );
    return updateResult.modifiedCount > 0;
  } catch (err) {
    throw new Error("Failed to update task");
  }
}

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
};
