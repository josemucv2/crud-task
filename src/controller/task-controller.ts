import { Request, Response } from "express";
import TaskServices from "../services/task-services";
import { sendSuccess, handleError } from '../utils/handle-response-util'
import { ITask } from "../interfaces/ITask";

const createTask = async (req: Request, res: Response) => {
    try {
        const task = await TaskServices.create(req.body);

        sendSuccess({ res, data: task, message: 'Task created', statusCode: 201 });

    } catch (error) {

        handleError({ res, error });
    }
};

const getTasks = async (req: Request<any, any, any, Partial<ITask>>, res: Response) => {

    try {

        const { completed } = req.query;

        const tasks = await TaskServices.findAll({ completed });

        sendSuccess({ res, data: tasks, message: 'Tasks found', statusCode: 200 });

    } catch (error: any) {

        handleError({ res, error });

    }

};

const getTaskById = async (req: Request, res: Response) => {

    try {

        const task = await TaskServices.findById(req.params.id);

        if (!task) throw { statusCode: 404, message: "Task not found" };

        sendSuccess({ res, data: task, message: 'Task found', statusCode: 200 });

    } catch (error) {

        handleError({ res, error });

    }

};

const updateTask = async (req: Request, res: Response) => {

    try {

        const task = await TaskServices.update(req.params.id, req.body);

        if (!task) throw { statusCode: 404, message: "Task not found" };

        sendSuccess({ res, data: task, message: 'Task updated', statusCode: 200 });

    } catch (error) {

        handleError({ res, error });

    }

};

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
