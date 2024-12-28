import { IUser } from "../interfaces/IUser";
import User from "../model/user-model";

/**
 * Registers a new user in the database using Mongoose's create method.
 *
 * @param userData - Partial data for creating the user (username, email, password).
 * @returns The created user object without sensitive fields.
 */


const registerUserRepository = async (userData: Partial<IUser>) => {
    try {
        const newUser = await User.create(userData);

        return newUser;
    } catch (error: any) {
        if (error.code === 11000) {
            throw {
                statusCode: 401,
                message: `Duplicate key error: ${JSON.stringify(error.keyValue)}`
            };
        }
        throw {
            statusCode: 500,
            message: `Failed to register user: ${error.message}`
        };
    }
};

const findByEmailOrUsername = async (user: string): Promise<IUser | null> => {

    const isEmail = /\S+@\S+\.\S+/.test(user);

    const userIdentifier = isEmail ? { email: user } : { username: user };
    const userFind = await User.findOne({ ...userIdentifier });
    if (!userFind) {
        throw {
            statusCode: 404,
            code: 404,
            message: "Usuario no encontrado",
        }
    }


    return userFind
};

const updateUser = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            throw {
                statusCode: 404,
                code: 404,
                message: "Usuario no encontrado",
            };
        }
        return updatedUser;
    } catch (error: any) {
        throw {
            statusCode: 500,
            message: `Failed to update user: ${error.message}`
        };
    }
};

export default {
    registerUserRepository,
    findByEmailOrUsername,
    updateUser
}