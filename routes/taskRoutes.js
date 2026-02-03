import Task from '../dataModels/tasks.js'

// fetch all tasks GET
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).exec();

    if (tasks.length == 0) {
      return res.status(404).json({ notice: "You have no tasks :) Good job!" });
    };

    res.status(200).json({ Tasks: tasks });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Unable to retrieve tasks" });
  }
};

// create new task POST
const createTask = async (req, res) => {
  try {
    const {
      title,
      description
    } = req.body;

    const newTask = new Task({
      taskTitle: title,
      description: description
    });

    await newTask.save();

    res.status(201).json({
      confirm: "New task successfully added to To-Do List",
      data: newTask
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Bad request. Check for missing or invalid data" });
  }
};

// delete task DELETE
const deleteTask = async (req, res) => {
  try {
    const taskID = req.params._id;
    let toDelete = await Task.findById(taskID).exec();

    if (!toDelete) {
      return res.status(404).json({ notice: "Specified task not found" });
    };

    await Task.deleteOne({ _id: taskID }).exec()

    res.status(200).json({
      confirm: "Task successfully deleted from list",
      data: toDelete
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Unable to perform deletion of task" })
  }
}

//update task PUT
const updateTask = async (req, res) => {
  try {
    const taskID = req.params._id;
    const task = await Task.findById(taskID).exec();

    if (!req.body.length) {
      return res.status(400).json({ notice: "No fields to update given" });
    };

    const allowedFields = ['taskTitle', 'description', 'status'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    });

    await task.save();

    if (task['status'] === true) {
      await Task.findByIdAndDelete(taskID).exec();
      return res.status(200).json({ confirm: "Successful completion! Task successfully removed from list" });
    };

    res.status(200).json({
      confirm: "Task updated successfully",
      data: task
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Unable to update specified task" });
  }
}

export default { getAllTasks, createTask, deleteTask, updateTask }