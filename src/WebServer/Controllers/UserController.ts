import {Request, Response} from 'express'
import IUser from '../../Application/Entities/Pojo/IUser';
import UserService from './../../Application/Services/Adapters/UserServices';
import IUserService from './../../Application/Services/Ports/IUserService';
import UserRepository from './../../Application/Repositories/Adapters/UserRepository';


const _userService : IUserService = new UserService(new UserRepository())
export default class UserController {

 // private _userService : IUserService;
  constructor(){
//    this._userService = new UserService(new MemoryRepository())
  }

  async getAll(req: Request, res : Response) : Promise<Response<Array<IUser>>> {
    try {

      const users : Array<IUser>  = await _userService.getAll()
      return res.status(200).json(users);
    
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  }

  async getById(req: Request, res: Response): Promise<Response<IUser>> {
    try {
      
      const user : IUser | null= await _userService.getById(req.params['id']);
      return res.status(200).json(user);

    } catch (error) {
      console.log(error);
      return res.status(400) 
    }
  }

}