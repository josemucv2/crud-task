import { Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import { handleError, sendSuccess } from "../utils/handle-response-util";
import AuthServices from "../services/auth-services";


const registerUserController = async (req: Request<{}, {}, IUser>, res: Response) => {
    try {

        const body = req.body;

        const newUser = await AuthServices.registerUserServices(body);

        sendSuccess({ res, data: newUser, message: 'Usuario Registrado', statusCode: 201, });

    } catch (error) {

        handleError({ res, error });

    }
}

const loginController = async (req: Request<{}, {}, { identifier: string, password: string }>, res: Response) => {
    try {

        const { identifier, password } = req.body;

        const user = await AuthServices.loginServices({ user: identifier, password });

        sendSuccess({ res, data: user, message: 'Usuario Logueado', statusCode: 200, });

    } catch (error) {

        handleError({ res, error });

    }
}

export default {
    registerUserController,
    loginController
}