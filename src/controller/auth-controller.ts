import { Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import { handleError, sendSuccess } from "../utils/handle-response-util";
import AuthServices from "../services/auth-services";

/**
 * Controller to register a new user.
 * 
 * This controller receives user registration data, processes it through the 
 * AuthServices to register the user, and sends a success response.
 * 
 * @async
 * @param {Request<{}, {}, IUser>} req - The request object containing user registration data in the body.
 * @param {Response} res - The response object used to send back the response.
 * @returns {void} 
 * @throws {Error} Throws an error if the user registration fails.
 */
const registerUserController = async (req: Request<{}, {}, IUser>, res: Response) => {
    try {
        const body = req.body;

        // Register user through AuthServices
        const newUser = await AuthServices.registerUserServices(body);

        // Send success response
        sendSuccess({ res, data: newUser, message: 'Usuario Registrado', statusCode: 201 });

    } catch (error) {
        // Handle error if registration fails
        handleError({ res, error });
    }
}

/**
 * Controller to log in an existing user.
 * 
 * This controller receives the user's identifier (e.g., email or username) and 
 * password, processes the login through the AuthServices, and sends a success response.
 * 
 * @async
 * @param {Request<{}, {}, { identifier: string, password: string }>} req - The request object containing 
 * the login credentials (identifier and password) in the body.
 * @param {Response} res - The response object used to send back the response.
 * @returns {void} 
 * @throws {Error} Throws an error if the login process fails.
 */
const loginController = async (req: Request<{}, {}, { identifier: string, password: string }>, res: Response) => {
    try {
        const { identifier, password } = req.body;

        // Log in user through AuthServices
        const user = await AuthServices.loginServices({ user: identifier, password });

        // Send success response
        sendSuccess({ res, data: user, message: 'Usuario Logueado', statusCode: 200 });

    } catch (error) {
        // Handle error if login fails
        handleError({ res, error });
    }
}

export default {
    registerUserController,
    loginController
}
