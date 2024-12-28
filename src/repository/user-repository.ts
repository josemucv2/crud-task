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

export default {
    registerUserRepository
}