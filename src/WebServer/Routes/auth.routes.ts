import {Router} from 'express';
import UserController from './../Controllers/UserController';

const router = Router();


export default (controller: UserController) => {
  
  router.get('/login',controller.getAll )
  router.post('/register', controller.getAll)
  router.post('/refreshtoken', controller.getAll)

  return router; 
}
