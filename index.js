const fs = require("fs");
const task = [
  { id: 1, task: "task1", isCompleted: false },
  { id: 2, task: "task2", isCompleted: false },
  { id: 3, task: "task3", isCompleted: false },
  { id: 4, task: "task4", isCompleted: false },
];

const createFile = (fineName, content) => {
  fs.writeFile(fineName, content, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("file create successfully");
  });
};

const readFile = (fileName) => {
  try {
    const data = fs.readFileSync(fileName, "utf8");
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

createFile("task.json", JSON.stringify(task));
const fileTask = readFile("task.json");

const allTasks = JSON.parse(fileTask);
console.log(allTasks);
//
const markAsCompleted = (tasks, id) => {
  const updatedTasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, isCompleted: true };
    }
    return task;
  });
  console.log(updatedTasks);
  createFile("task.json", JSON.stringify(updatedTasks));
};

const deleteTask = (tasks, id) => {
  const removeTask = tasks.filter((task) => {
    if (task.id !== id) {
      return task;
    }
  });
  console.log(removeTask);
  fs.unlink("task.json", (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return;
    }
    console.log("File deleted successfully");
  });
  createFile("task.json", JSON.stringify(removeTask));
};
markAsCompleted(allTasks, 2);
deleteTask(allTasks, 3);
