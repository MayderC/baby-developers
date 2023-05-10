import { Router } from "express";
import { check, param } from "express-validator";
import { validation } from "../Middlewares/validationResult";
import PostController from './../Controllers/PostController';
import { validateJWT } from './../Middlewares/JsonWebToken';
import {getUser} from "../Middlewares/routes/auth/getUser";
const router = Router()

export default (postController: PostController) => {

  router.get('/:id', postController.getById.bind(postController))
  router.get('/', postController.getAll.bind(postController))
  router.post('/',[
    check('post.title', 'the title is requerid').notEmpty(),
    check('post.body', 'the body is requerid').notEmpty(),
    check('post.description', 'the body is requerid').notEmpty(),
    validateJWT,
    validation,
    getUser
  ], postController.save.bind(postController))

  router.delete('/:id',[
    param('id', 'the id is requerid').notEmpty(),
    //validateJWT,
    validation
  ], postController.delete.bind(postController))

  router.put('/:id', [
    param('id', 'the id is requerid').notEmpty(),
    //validateJWT,
    validation
  ], postController.update.bind(postController))

  return router
}
