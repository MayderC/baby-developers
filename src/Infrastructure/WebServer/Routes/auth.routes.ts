import {Router} from 'express';
import AuthController from './../Controllers/AuthController';

const router = Router();


export default (controller: AuthController) => {
  
  router.get('/login',controller.login )
  router.post('/register', controller.register)


  return router; 
}
