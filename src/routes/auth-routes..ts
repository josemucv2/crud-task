import { Router } from 'express';
import { ENDPOINTS } from '../config/path';
import AuthController from '../controller/auth-controller';


const AuthRouter = Router();

AuthRouter.post(ENDPOINTS.AUTH.REGISTER, AuthController.registerUserController);

export default AuthRouter;
