import { ISuccess, IError } from "../types/response-types";

export const sendSuccess = <T>({ res, data, statusCode = 200 }: ISuccess<T>) => {
    res.status(statusCode).json({ data });
}


export const handleError = ({ res, error, message, statusCode = 400 }: IError) => {
    const msg = message || error.message || "Error inesperado";
    res.status(statusCode).json({ error, message: msg });
}