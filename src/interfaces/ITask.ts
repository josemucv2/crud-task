import { Document } from "mongoose";

/**
 * Interface representing a Task document in MongoDB.
 * 
 * This interface extends `Document` from Mongoose to ensure that it includes all the 
 * necessary properties and methods associated with a Mongoose document, such as 
 * `_id`, `save()`, `remove()`, etc.
 * 
 * @interface
 * @extends Document
 */
export interface ITask extends Document {

    /**
     * The title of the task.
     * 
     * @type {string}
     * @required
     */
    title: string,

    /**
     * A brief description of the task (optional).
     * 
     * @type {string | undefined}
     * @optional
     */
    description?: string,

    /**
     * Indicates whether the task is completed or not.
     * 
     * @type {boolean}
     * @required
     */
    completed: boolean,

    /**
     * The date when the task was created.
     * 
     * @type {Date}
     * @required
     */
    createdAt: Date,
}
