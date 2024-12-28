import mongoose, { Schema, model } from "mongoose";
import { ITask } from "../interfaces/ITask";

const TaskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true, trim: true, },
        description: { type: String, required: false, trim: true, },
        completed: { type: Boolean, required: true, default: false, },
        createdAt: { type: Date, default: Date.now, required: true, },
    },
);

const Task = model<ITask>("task", TaskSchema);

export default Task;
