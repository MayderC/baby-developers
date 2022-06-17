import express from "express";
import UserController from './../Controllers/UserController';
const router = express.Router()


export default (controller: UserController) => {
  
  router.get('/',  controller.getAll)
  
  return router
}