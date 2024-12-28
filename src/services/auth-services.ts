import jwt from 'jsonwebtoken'

import { IUser } from "../interfaces/IUser";
import UserRepository from "../repository/user-repository";
import bcrypt from "bcryptjs";


const registerUserServices = async (user: IUser) => {

    const { password, email, ...rest } = user


    const hashedPassword = await bcrypt.hash(password, 10);

    const userRegistered = await UserRepository.registerUserRepository({
        password: hashedPassword,
        email: email.toLowerCase(),
        ...rest
    });

    return userRegistered
}

const loginServices = async ({ user, password }: { user: string, password: string }) => {

    try {


        const userValidate = await _verifyUser({ identifier: user, password });

        const id = userValidate._id as string;

        const token = jwt.sign({ user: userValidate }, 'HS256', { expiresIn: "672h" });

        const userUpdatingToken = await UserRepository.updateUser(id, { token })

        return {
            user: userUpdatingToken,
            token
        }


    } catch (error) {

        throw error

    }
}


const _verifyUser = async ({ identifier, password }: { identifier: string, password: string }) => {


    try {
        const user = await UserRepository.findByEmailOrUsername(identifier);

        if (!user) {
            throw {
                statusCode: 404,
                code: 404,
                message: "Usuario no encontrado",
            }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw {
                statusCode: 401,
                code: 401,
                message: "Contraseña invalida",
            }
        }

        return user
    } catch (error) {
        throw error
    }
}

export default {
    registerUserServices,
    loginServices
}