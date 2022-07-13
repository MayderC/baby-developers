import {Router} from 'express';
import { validateJWT } from '../Middlewares/JsonWebToken';
import AuthController from './../Controllers/AuthController';
const router = Router();



export default (authController: AuthController) => {
  
  router.post('/login',authController.login.bind(authController))
  router.post('/register', authController.register.bind(authController))
  router.get('/refresh', [validateJWT], authController.refreshToken.bind(authController))

  return router; 
}
