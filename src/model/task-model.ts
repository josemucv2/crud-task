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


TaskSchema.methods.toJSON = function () {
    let task = this;
    let taskObject = task.toObject();
    delete taskObject.__v;
    return taskObject;
};

export default model<ITask>("task", TaskSchema);
