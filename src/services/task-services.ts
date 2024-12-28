import { ITask } from "../interfaces/ITask";
import TaskRepository from '../repository/task-repository'

const create = async (data: Partial<ITask>): Promise<ITask> => {
    if (!data.title) {
        throw {
            statusCode: 400,
            message: "Task title is required",
        };
    }
    return TaskRepository.create(data);
};

const findAll = async (filter: { completed?: boolean }) => {
    return TaskRepository.findAll(filter);
};

const findById = async (id: string): Promise<ITask | null> => {
    const task = TaskRepository.findById(id)

    if (!task) {
        throw {
            statusCode: 404,
            message: "Task not found",
        };
    }
    return task
};

const update = async (id: string, data: Partial<ITask>): Promise<ITask | null> => {
    return await TaskRepository.update(id, data);
};

const remove = async (id: string) => {
    return await TaskRepository.remove(id);
};

export default {
    create,
    findAll,
    findById,
    update,
    remove,
};
