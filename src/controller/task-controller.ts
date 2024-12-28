import { Request, Response } from "express";
import TaskServices from "../services/task-services";
import { sendSuccess, handleError } from '../utils/handle-response-util'
import { ITask } from "../interfaces/ITask";

/**
 * Controller to create a new task.
 * 
 * This controller receives task data, processes it through TaskServices 
 * to create a new task, and sends a success response.
 * 
 * @async
 * @param {Request} req - The request object containing the task data in the body.
 * @param {Response} res - The response object used to send back the response.
 * @returns {void} 
 * @throws {Error} Throws an error if the task creation fails.
 */
const createTask = async (req: Request, res: Response) => {
    try {
        const task = await TaskServices.create(req.body);

        sendSuccess({ res, data: task, message: 'Task created', statusCode: 201 });

    } catch (error) {

        handleError({ res, error });
    }
};

/**
 * Controller to get all tasks or filter tasks by completion status.
 * 
 * This controller receives an optional query parameter for the completion status (`completed`) 
 * and returns a list of tasks filtered accordingly. If no query is provided, all tasks will be fetched.
 * 
 * @async
 * @param {Request<any, any, any, Partial<ITask>>} req - The request object containing an optional query parameter 
 * for task completion status.
 * @param {Response} res - The response object used to send back the response.
 * @returns {void} 
 * @throws {Error} Throws an error if fetching tasks fails.
 */
const getTasks = async (req: Request<any, any, any, Partial<ITask>>, res: Response) => {

    try {

        const { completed } = req.query;

        const tasks = await TaskServices.findAll({ completed });

        sendSuccess({ res, data: tasks, message: 'Tasks found', statusCode: 200 });

    } catch (error: any) {

        handleError({ res, error });

    }

};

/**
 * Controller to get a task by its ID.
 * 
 * This controller receives a task ID as a parameter, processes it through TaskServices 
 * to find the task by its ID, and sends a success response if found, or a 404 error if not found.
 * 
 * @async
 * @param {Request} req - The request object containing the task ID as a parameter.
 * @param {Response} res - The response object used to send back the response.
 * @returns {void} 
 * @throws {Error} Throws an error if the task is not found or if the task fetching fails.
 */
const getTaskById = async (req: Request, res: Response) => {

    try {

        const task = await TaskServices.findById(req.params.id);

        if (!task) throw { statusCode: 404, message: "Task not found" };

        sendSuccess({ res, data: task, message: 'Task found', statusCode: 200 });

    } catch (error) {

        handleError({ res, error });

    }

};

/**
 * Controller to update an existing task.
 * 
 * This controller receives a task ID as a parameter and task data in the body, 
 * processes it through TaskServices to update the task, and sends a success response 
 * if the update is successful, or a 404 error if the task is not found.
 * 
 * @async
 * @param {Request} req - The request object containing the task ID as a parameter and updated task data in the body.
 * @param {Response} res - The response object used to send back the response.
 * @returns {void} 
 * @throws {Error} Throws an error if the task is not found or if the task update fails.
 */
const updateTask = async (req: Request, res: Response) => {

    try {

        const task = await TaskServices.update(req.params.id, req.body);

        if (!task) throw { statusCode: 404, message: "Task not found" };

        sendSuccess({ res, data: task, message: 'Task updated', statusCode: 200 });

    } catch (error) {

        handleError({ res, error });

    }

};

/**
 * Controller to delete a task by its ID.
 * 
 * This controller receives a task ID as a parameter, processes it through TaskServices 
 * to remove the task, and sends a success response if the deletion is successful, 
 * or a 404 error if the task is not found.
 * 
 * @async
 * @param {Request} req - The request object containing the task ID as a parameter.
 * @param {Response} res - The response object used to send back the response.
 * @returns {void} 
 * @throws {Error} Throws an error if the task is not found or if the task deletion fails.
 */
const deleteTask = async (req: Request, res: Response) => {

    try {

        const success = await TaskServices.remove(req.params.id);

        if (!success) throw { statusCode: 404, message: "Task not found" };

        sendSuccess({ res, data: success, message: 'Task deleted', statusCode: 200 });

    } catch (error) {

        handleError({ res, error });

    }

};

export default {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
}
