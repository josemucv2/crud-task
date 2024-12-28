import { ISuccess, IError } from "../types/response-types";

/**
 * Sends a success response to the client.
 * 
 * @param {Object} params - The parameters for the success response.
 * @param {Object} params.res - The Express response object.
 * @param {T} params.data - The data to send in the response body.
 * @param {number} [params.statusCode=200] - The HTTP status code (optional, defaults to 200).
 * @template T
 */
export const sendSuccess = <T>({ res, data, statusCode = 200 }: ISuccess<T>) => {
    res.status(statusCode).json({ data });
};

/**
 * Handles errors and sends an error response to the client.
 * 
 * @param {Object} params - The parameters for the error response.
 * @param {Object} params.res - The Express response object.
 * @param {Object} params.error - The error object.
 * @param {string} [params.message] - A custom error message (optional).
 * @param {number} [params.statusCode=400] - The HTTP status code (optional, defaults to 400).
 */
export const handleError = ({ res, error, message, statusCode = 400 }: IError) => {
    const msg = message || error.message || "Error inesperado";
    res.status(statusCode).json({ error, message: msg });
};
