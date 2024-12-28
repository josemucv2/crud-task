import mongoose from "mongoose";
import 'dotenv/config';

/**
 * Asynchronously connects to a MongoDB database.
 *
 * This function retrieves the MongoDB URI from the environment variables,
 * and attempts to establish a connection using Mongoose. It logs a success
 * message if the connection is successful, or throws an error if there is an issue.
 *
 * @throws {Error} If the `DB_URL` environment variable is not defined.
 * @throws {Error} If there is an error while attempting to connect to the database.
 *
 * @example
 * // Call the function to establish a database connection:
 * await dbConnection();
 */
export const dbConnection = async () => {
    try {
        const uri = process.env.DB_URL;

        if (!uri) {
            throw new Error("MongoDB URI is not defined");
        }

        await mongoose.connect(uri);

        console.log("Database online");
    } catch (error) {
        console.log(error);
        throw new Error("Error when starting the database");
    }
};
