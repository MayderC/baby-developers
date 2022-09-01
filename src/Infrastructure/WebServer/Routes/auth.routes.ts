import {Router} from 'express';
import AuthController from './../Controllers/AuthController';
import { loginMiddlewares, registerMiddlewares, refreshMiddlewares } from './../Middlewares/routes/auth/authMiddlewares';
const router = Router();



export default (authController: AuthController) => {
  
  router.post('/login', loginMiddlewares, authController.login.bind(authController))
  router.post('/register', registerMiddlewares, authController.register.bind(authController))
  router.get('/refresh', refreshMiddlewares, authController.refreshToken.bind(authController))

  return router; 
}
