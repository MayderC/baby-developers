import { Router } from "express";
import PostController from './../Controllers/PostController';
const router = Router()

export default (postController: PostController) => {

  router.get('/:id', postController.getById.bind(postController))
  router.get('/', postController.getAll.bind(postController))
  router.post('/', postController.save.bind(postController))
  router.delete('/', postController.delete.bind(postController))

  return router
}
