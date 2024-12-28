import { ITask } from "../interfaces/ITask";
import TaskRepositories from '../repositories/task-repositories'

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
    }
    return await TaskRepositories.create(newTask);
};

const findAll = async (filter: { completed?: boolean }) => {
    return await TaskRepositories.findAll(filter);
};

const findById = async (id: string): Promise<ITask | null> => {
    const task = await TaskRepositories.findById(id)

    if (!task) {
        throw {
            statusCode: 404,
            message: "Task not found",
        };
    }
    return task
};

const update = async (id: string, data: Partial<ITask>): Promise<ITask | null> => {
    return await TaskRepositories.update(id, data);
};

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
