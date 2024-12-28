import { Router } from 'express';
import { ENDPOINTS } from '../config/path';


const AuthRouter = Router();

AuthRouter.post(ENDPOINTS.AUTH.REGISTER, () => console.log(''));
AuthRouter.post(ENDPOINTS.AUTH.LOGIN, () => console.log(''));

export default AuthRouter;
