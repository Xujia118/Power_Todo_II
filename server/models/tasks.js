// const uuid = require("uuid").v4;
// const User = require("../schemas/User");

// // get user data
// async function getUserData(username) {
//   const userData = await User.findOne({ username });
//   return userData;
// }

// // add task
// async function addTask(username) {
//   try {
//     const taskId = uuid();
//     const taskName = "testTask1";
//     const taskDate = new Date();
//     const taskNotes = {};

//     const newTask = {
//       name: taskName,
//       notes: taskNotes,
//       date: taskDate,
//     };

//     await User.updateOne(
//       { username },
//       { $set: { [`tasks.${taskId}`]: newTask } }
//     );

//     return newTask;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function test() {
//   await addTask("xujia");
//   const testUserData = await getUserData("xujia");
//   console.log("2", testUserData);
// }

// test();

// // task name can't be too long

// module.exports = {
//   getUserData,
//   addTask,
// };
