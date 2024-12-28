import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

/**
 * Schema for User model in the database.
 * 
 * @typedef {Object} User
 * @property {string} username - The username of the user (unique and required).
 * @property {string} email - The email of the user (unique and required).
 * @property {string} password - The password of the user (required).
 * @property {string} [token] - The token of the user (optional).
 */
const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (v: string) {
                return !/\s/.test(v);
            },
            message: props => `${props.value} cannot contain spaces!`
        }
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String, required: false },
});

/**
 * Removes sensitive fields (`password`, `token`, `__v`) when converting the user object to JSON.
 * 
 * @function toJSON
 * @returns {Object} User object without sensitive fields.
 */
UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    delete userObject.token;
    delete userObject.__v;
    return userObject;
};

export default mongoose.model<IUser>('User', UserSchema);
