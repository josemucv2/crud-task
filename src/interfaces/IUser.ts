import { Document } from 'mongoose';

export interface IUser extends Document {
    /**
     * The username of the user.
     * @type {string}
     */
    username: string;

    /**
     * The email address of the user.
     * @type {string}
     */
    email: string;

    /**
     * The password of the user.
     * @type {string}
     */
    password: string;

    /**
     * The authentication token for the user.
     * @type {string}
     */
    token: string;
}