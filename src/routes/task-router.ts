import { Router } from "express";
import { ENDPOINTS } from "../config/path";
import TaskController from "../controller/task-controller";

const TaskRouter = Router();

TaskRouter.post(ENDPOINTS.TASK.CREATE, TaskController.createTask);
TaskRouter.delete(ENDPOINTS.TASK.DELETE, TaskController.deleteTask);
TaskRouter.put(ENDPOINTS.TASK.UPDATE, TaskController.updateTask);
TaskRouter.get(ENDPOINTS.TASK.GET, TaskController.getTaskById);
TaskRouter.get(ENDPOINTS.TASK.GET_ALL, TaskController.getTasks);

export default TaskRouter;