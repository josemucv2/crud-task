import mongoose from "mongoose";
import 'dotenv/config';

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
