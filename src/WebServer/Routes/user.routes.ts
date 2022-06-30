import {Router} from "express";
import UserController from './../Controllers/UserController';
const router = Router()


export default (controller: UserController) => {
  
  router.get('/:id',controller.getById)
  router.get('/', controller.getAll)
  
  return router
}