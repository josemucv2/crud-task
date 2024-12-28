import { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import UserModel from '../model/user-model'
import { IUser } from '../interfaces/IUser';
import { handleError } from '../utils/handle-response-util';

/**
 * Interface for the JWT payload, which includes the user data.
 * 
 * @interface ITokenPayload
 * @extends JwtPayload
 */
interface ITokenPayload extends JwtPayload {
    user: IUser
}

/**
 * Middleware that validates the token from the Authorization header.
 * It verifies the JWT token and ensures the user exists in the database.
 * If the token is valid, it adds the user to the request object.
 * If the token is invalid or expired, it responds with a 401 status code.
 * 
 * @async
 * @function validToken
 * @param {Request} req - The request object, which will have the user attached if valid.
 * @param {Response} res - The response object to send the result back.
 * @param {NextFunction} next - The next middleware function to be called if the token is valid.
 * 
 * @returns {void} - Passes control to the next middleware if the token is valid.
 * 
 * @throws {Error} - Throws an error with a message and a 401 status code if the token is invalid or expired.
 */
export const validToken = async (req: Request & { user?: IUser }, res: Response, next: NextFunction) => {
    const token = req.get("Authorization") || "";

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, 'HS256') as ITokenPayload;

        // Check if the user exists in the database
        const user = await UserModel.findOne({ _id: decoded.user._id });

        // If no user found or token is invalid, throw an error
        if (!user) {
            throw {
                message: 'Token no válido o el usuario ha sido inhabilitado',
                statusCode: 401
            }
        }

        // Attach the user to the request object
        req.user = user;

        // Proceed to the next middleware
        next();

    } catch (error: any) {
        // Handle error by sending a response with an error message
        const statusCode = error.statusCode || 401;
        const message = error.message || 'Token no válido';

        handleError({ res, error, message, statusCode });
    }
}
