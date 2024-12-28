import express, { Express } from 'express';
import { API, ENDPOINTS } from "./path";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { dbConnection } from './dbconnection';

import AuthRouter from '../routes/auth-routes.';
import TaskRouter from '../routes/task-router';
import { validToken } from '../middleware/valid-token';
import { setupSwagger } from '../config/swagger';

/**
 * Registers the API route paths for authentication and task management.
 * 
 * @returns {Object} An object containing the base API routes.
 * @property {string} auth - The base route for authentication (`/api/v1/auth`).
 * @property {string} task - The base route for task management (`/api/v1/task`).
 */
const registerdRoutes = () => ({
    auth: `${API}${ENDPOINTS.AUTH.BASE}`,
    task: `${API}${ENDPOINTS.TASK.BASE}`,
});

/**
 * Configures the middleware for the Express app.
 * 
 * Middleware includes:
 * - CORS
 * - Morgan for logging HTTP requests
 * - Helmet for security
 * - Express JSON parser
 * - Express URL encoding
 * 
 * @param {Express} app - The Express application instance.
 */
const configureMiddlewares = (app: Express) => {
    app.use(cors());
    app.use(morgan("short"));
    app.use(express.json());
    app.use(helmet());
    app.use(express.urlencoded({ extended: true }));
};

/**
 * Configures the routes for the Express app.
 * 
 * @param {Express} app - The Express application instance.
 * @param {Object} paths - An object containing the API paths for routing.
 * @param {string} paths.auth - The base authentication route (`/api/v1/auth`).
 * @param {string} paths.task - The base task route (`/api/v1/task`).
 */
const configureRoutes = (app: Express, paths: { [key: string]: string }) => {
    app.use(paths.auth, AuthRouter);
    app.use(paths.task, validToken, TaskRouter);
};

/**
 * Starts the Express server, configures middlewares, routes, and connects to the database.
 * 
 * The function initializes the server on the specified port and sets up API documentation at `/api-docs`.
 * 
 * @async
 * @throws {Error} Throws an error if the database connection fails or server fails to start.
 */
export const startServer = async () => {
    const app = express();
    const port = process.env.PORT || 3000;
    const paths = registerdRoutes();

    // Connect to the database
    await dbConnection();

    // Configure the server with middlewares
    configureMiddlewares(app);

    // Set up Swagger API documentation
    setupSwagger(app);

    // Set up the routes
    configureRoutes(app, paths);

    console.log("Available routes:", paths);

    // Default route for the API
    app.get("/", (req, res) => {
        res.send("coally api");
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        console.log(`Documentación disponible en http://localhost:${port}/api-docs`);
    });
};
