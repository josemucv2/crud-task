import { ITask } from "../interfaces/ITask";
import TaskRepositories from '../repositories/task-repositories';

/**
 * Creates a new task with the provided data.
 * 
 * @param {Object} data - The data to create the task.
 * @param {string} data.title - The title of the task (required).
 * @param {string} [data.description] - An optional description of the task.
 * @returns {Promise<ITask>} - The created task object.
 * @throws {Object} - Throws an error if the task title is missing.
 */
const create = async (data: { title: string, description?: string }): Promise<ITask> => {
    if (!data.title) {
        throw {
            statusCode: 400,
            message: "Task title is required",
        };
    }

    const newTask = {
        ...data,
        completed: false,
        createdAt: new Date()
    };

    return await TaskRepositories.create(newTask);
};

/**
 * Retrieves all tasks with the optional filter for completion status.
 * 
 * @param {Object} filter - The filter to apply to the tasks.
 * @param {boolean} [filter.completed] - The completion status filter (optional).
 * @returns {Promise<ITask[]>} - A list of tasks that match the filter.
 */
const findAll = async (filter: { completed?: boolean }) => {
    return await TaskRepositories.findAll(filter);
};

/**
 * Finds a task by its ID.
 * 
 * @param {string} id - The ID of the task to find.
 * @returns {Promise<ITask | null>} - The task object if found, otherwise null.
 * @throws {Object} - Throws an error if the task is not found.
 */
const findById = async (id: string): Promise<ITask | null> => {
    const task = await TaskRepositories.findById(id);

    if (!task) {
        throw {
            statusCode: 404,
            message: "Task not found",
        };
    }

    return task;
};

/**
 * Updates an existing task with the provided data.
 * 
 * @param {string} id - The ID of the task to update.
 * @param {Partial<ITask>} data - The data to update the task with.
 * @returns {Promise<ITask | null>} - The updated task object.
 */
const update = async (id: string, data: Partial<ITask>): Promise<ITask | null> => {
    return await TaskRepositories.update(id, data);
};

/**
 * Removes a task by its ID.
 * 
 * @param {string} id - The ID of the task to remove.
 * @returns {Promise<boolean>} - A boolean indicating if the task was successfully removed.
 */
const remove = async (id: string) => {
    return await TaskRepositories.remove(id);
};

export default {
    create,
    findAll,
    findById,
    update,
    remove,
};
