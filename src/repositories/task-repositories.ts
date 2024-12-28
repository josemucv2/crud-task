import Task from "../model/task-model";
import { ITask } from "../interfaces/ITask";
import { Document } from "mongoose";

/**
 * Creates a new task in the database.
 * 
 * @function create
 * @param {Partial<ITask>} data - The task data to be saved.
 * @returns {Promise<ITask>} - The created task.
 */
const create = async (data: Partial<ITask>): Promise<ITask> => {
    return Task.create(data);
};

/**
 * Finds all tasks based on a filter.
 * 
 * @function findAll
 * @param {Object} filter - Filter to apply on tasks.
 * @param {boolean} [filter.completed] - Filter tasks by completion status.
 * @returns {Promise<ITask[]>} - A list of tasks.
 */
const findAll = async (filter: { completed?: boolean }) => {
    const query: any = {};
    if (filter.completed !== undefined) {
        query.completed = filter.completed;
    }
    return await Task.find(query);
};

/**
 * Finds a task by its ID.
 * 
 * @function findById
 * @param {string} id - The task ID.
 * @returns {Promise<ITask | null>} - The found task or null if not found.
 */
const findById = async (id: string): Promise<ITask | null> => {
    return await Task.findById(id);
};

/**
 * Updates a task by its ID.
 * 
 * @function update
 * @param {string} id - The task ID.
 * @param {Partial<ITask>} data - The data to update.
 * @returns {Promise<ITask | null>} - The updated task or null if not found.
 */
const update = async (id: string, data: Partial<ITask>): Promise<ITask | null> => {
    const task = await Task.findByIdAndUpdate(id, data, { new: true });

    if (!task) {
        throw {
            statusCode: 404,
            message: "Task not found",
        };
    }
    return task;
};

/**
 * Removes a task by its ID.
 * 
 * @function remove
 * @param {string} id - The task ID.
 * @returns {Promise<boolean | Document>} - True if deleted, or the document if not found.
 */
const remove = async (id: string): Promise<boolean | Document> => {
    const result = await Task.findByIdAndDelete(id);

    if (!result) {
        throw {
            statusCode: 404,
            message: "Task not found",
        };
    }
    return result;
};

export default {
    create,
    findAll,
    findById,
    update,
    remove,
};
