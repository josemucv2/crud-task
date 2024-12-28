import Task from "../model/task-model";
import { ITask } from "../interfaces/ITask";
import { Document } from "mongoose";

const create = async (data: Partial<ITask>): Promise<ITask> => {
    return Task.create(data);
};

const findAll = async (filter: { completed?: boolean }) => {
    const query: any = {};
    if (filter.completed !== undefined) {
        query.completed = filter.completed;
    }
    return await Task.find(query);
};

const findById = async (id: string): Promise<ITask | null> => {
    return await Task.findById(id);
};

const update = async (id: string, data: Partial<ITask>): Promise<ITask | null> => {

    const task = await Task.findByIdAndUpdate(id, data, { new: true });

    if (!task) {
        throw {
            statusCode: 404,
            message: "Task not found",
        };
    }
    return task
};

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
