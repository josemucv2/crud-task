import { Schema, model } from "mongoose";
import { ITask } from "../interfaces/ITask";

/**
 * Schema for Task model in the database.
 * 
 * @typedef {Object} Task
 * @property {string} title - The title of the task (required).
 * @property {string} [description] - The description of the task (optional).
 * @property {boolean} completed - Whether the task is completed or not (required).
 * @property {Date} createdAt - The date the task was created (required, defaults to current date).
 */
const TaskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true, trim: true, },
        description: { type: String, required: false, trim: true, },
        completed: { type: Boolean, required: true, default: false, },
        createdAt: { type: Date, default: Date.now, required: true, },
    },
);

/**
 * Removes the `__v` property from the task object when converting it to JSON.
 * 
 * @function toJSON
 * @returns {Object} Task object without the `__v` field.
 */
TaskSchema.methods.toJSON = function () {
    let task = this;
    let taskObject = task.toObject();
    delete taskObject.__v;
    return taskObject;
};

export default model<ITask>("task", TaskSchema);
