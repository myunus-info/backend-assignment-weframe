const { getAllTasks, getTaskById } = require('../modules/task/task.controller');

const Task = require('../modules/task/task.model.js');
const AppError = require('../modules/core/errors/app-error.js');

// Mock the Task model
jest.mock('../modules/task/task.model.js');

//////////////////////////////////////////////
////// Test for getting all tasks
describe('getAllTasks', () => {
  it('should return tasks when tasks are found', async () => {
    Task.find.mockResolvedValue([{ title: 'Task 1' }, { title: 'Task 2' }]);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getAllTasks(req, res, next);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      result: 2,
      tasks: expect.any(Array),
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with an error when no tasks are found', async () => {
    Task.find.mockResolvedValue([]);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getAllTasks(req, res, next);

    // Assertions
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect(next.mock.calls[0][0].statusCode).toBe(404);
    expect(next.mock.calls[0][0].message).toBe('No tasks found!');
  });
});

//////////////////////////////////////////////
/// Test for getting a single task by Id
describe('getTaskById', () => {
  it('should return a task when a valid ID is provided', async () => {
    const mockTask = { _id: 'validId', name: 'Test Task' };
    Task.findById.mockResolvedValueOnce(mockTask);

    const req = { params: { id: 'validId' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await getTaskById(req, res, next);

    expect(Task.findById).toHaveBeenCalledWith('validId');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      task: mockTask,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with an AppError when no task is found', async () => {
    Task.findById.mockResolvedValueOnce(null);

    const req = { params: { id: 'invalidId' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await getTaskById(req, res, next);

    expect(Task.findById).toHaveBeenCalledWith('invalidId');
    expect(next).toHaveBeenCalledWith(new AppError(404, 'No task found with ID: invalidId'));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
