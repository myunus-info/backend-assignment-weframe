const Task = require('./task.model');
const path = require('path');
const { asyncHandler, AppError } = require(path.join(process.cwd(), 'src/modules/core/errors'));

const createTask = asyncHandler(async (req, res, next) => {
  const { title, description, assignedUser, dueDate, completed } = req.body;

  const existingTask = await Task.findOne({ title });
  if (existingTask) {
    return next(new AppError(400, 'This task already exists!'));
  }

  const task = await Task.create({ title, description, assignedUser, dueDate, completed });

  res.status(201).json({
    status: 'success',
    message: 'Task created successfully!',
    task,
  });
});

const getAllTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find();

  if (!tasks || tasks.length === 0) {
    return next(new AppError(404, 'No tasks found!'));
  }

  res.status(200).json({
    status: 'success',
    result: tasks.length,
    tasks,
  });
});

const getTaskById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    return next(new AppError(404, `No task found with ID: ${id}`));
  }

  res.status(200).json({
    status: 'success',
    task,
  });
});

const updateTaskById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(new AppError(404, `No task found with ID: ${id}`));
  }

  res.status(200).json({
    status: 'success',
    message: 'Task updated successfully!',
    task,
  });
});

const deleteTaskById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    return next(new AppError(404, `No task found with ID: ${id}`));
  }

  await task.deleteOne();

  res.status(200).json({
    status: 'success',
    message: 'Task deleted successfully!',
    task,
  });
});

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
