import jwt from 'jsonwebtoken';
import { IUser } from "../interfaces/IUser";
import UserRepositories from "../repositories/user-repositories";
import bcrypt from "bcryptjs";

/**
 * Registers a new user and hashes their password before saving to the database.
 * 
 * @param {IUser} user - The user data (including password) to be registered.
 * @returns {Promise<IUser>} - The registered user object.
 */
const registerUserServices = async (user: IUser) => {
    const { password, email, ...rest } = user;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Register the user in the repository
    const userRegistered = await UserRepositories.registerUser({
        password: hashedPassword,
        email: email.toLowerCase(),
        ...rest
    });

    return userRegistered;
};

/**
 * Authenticates a user, validates the password, and generates a JWT token.
 * 
 * @param {Object} credentials - The login credentials containing user identifier (email or username) and password.
 * @param {string} credentials.user - The email or username of the user.
 * @param {string} credentials.password - The password of the user.
 * @returns {Promise<{ user: IUser, token: string }>} - The authenticated user and the generated JWT token.
 */
const loginServices = async ({ user, password }: { user: string, password: string }) => {
    try {
        // Verify the user credentials
        const userValidate = await _verifyUser({ identifier: user, password });

        const id = userValidate._id as string;

        // Generate a JWT token
        const token = jwt.sign({ user: userValidate }, 'HS256', { expiresIn: "672h" });

        // Update the user with the generated token
        const userUpdatingToken = await UserRepositories.updateUser(id, { token });

        return {
            user: userUpdatingToken,
            token
        };
    } catch (error) {
        throw error;
    }
};

/**
 * Verifies the user's credentials by checking the email/username and validating the password.
 * 
 * @param {Object} credentials - The login credentials containing the identifier (email or username) and password.
 * @param {string} credentials.identifier - The email or username of the user.
 * @param {string} credentials.password - The password of the user.
 * @returns {Promise<IUser>} - The validated user object.
 */
const _verifyUser = async ({ identifier, password }: { identifier: string, password: string }) => {
    try {
        // Find the user by email or username
        const user = await UserRepositories.findByEmailOrUsername(identifier);

        if (!user) {
            throw {
                statusCode: 404,
                code: 404,
                message: "Usuario no encontrado",
            };
        }

        // Check if the provided password matches the stored password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw {
                statusCode: 401,
                code: 401,
                message: "Contraseña invalida",
            };
        }

        return user;
    } catch (error) {
        throw error;
    }
};

export default {
    registerUserServices,
    loginServices
};
