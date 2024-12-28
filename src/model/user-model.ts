import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

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
 * User model based on the user schema.
 * 
 * @type {mongoose.Model<IUser>}
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