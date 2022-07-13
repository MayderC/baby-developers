import {Router} from "express";
import UserController from '../Controllers/UserController';
import { validateJWT } from "../Middlewares/JsonWebToken";
const router = Router()


export default (userController: UserController) => {
  
  router.get('/:id',userController.getById.bind(userController))
  router.get('/',[validateJWT], userController.getAll.bind(userController))
  router.post('/', userController.save.bind(userController))
  router.delete('/:id', userController.delete.bind(userController))
  router.put('/:id', userController.update.bind(userController))

  return router
}