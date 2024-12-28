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

export default {
    registerUserServices
}