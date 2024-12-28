import express, { Express } from 'express';
import { API, ENDPOINTS } from "./path";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { dbConnection } from './dbconnection';

import AuthRouter from '../routes/auth-routes.';
import TaskRouter from '../routes/task-router';
import { validToken } from '../middleware/valid-token';


const registerdRoutes = () => ({
    auth: `${API}${ENDPOINTS.AUTH.BASE}`,
    task: `${API}${ENDPOINTS.TASK.BASE}`,
})


const configureMiddlewares = (app: Express) => {
    app.use(cors());
    app.use(morgan("short"));
    app.use(express.json());
    app.use(helmet());
    app.use(express.urlencoded({ extended: true }));
};

const configureRoutes = (app: Express, paths: { [key: string]: string }) => {
    app.use(paths.auth, AuthRouter);
    app.use(paths.task, validToken, TaskRouter);
};

export const startServer = async () => {
    const app = express();
    const port = process.env.PORT || 3000;
    const paths = registerdRoutes();

    await dbConnection();
    configureMiddlewares(app);
    configureRoutes(app, paths);

    console.log("Available routes:", paths);

    app.get("/", (req, res) => {
        res.send("coally api");
    });

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};
