import {Request, Response} from 'express'
import IUser from '../../../Application/Entities/Pojo/IUser';
import UserService from '../../../Application/Adapters/Services/UserServices';
import IUserService from '../../../Application/Ports/Services/IUserService';
import UserRepository from '../../../Application/Adapters/Repositories/UserRepository';


const _userService : IUserService = new UserService(new UserRepository())

export default class UserController {
  
  private _userService : IUserService;
  constructor(userService: IUserService){
    this._userService = userService;
  }

  async getAll(req: Request, res : Response) : Promise<Response<Array<IUser>>> {
    try {

      const users : Array<IUser>  = await this._userService.getAll()
      return res.status(200).json(users);
    
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  }

  async getById(req: Request, res: Response): Promise<Response<IUser>> {
    try {
      
      const user : IUser | null= await this._userService.getById(req.params['id']);
      return res.status(200).json(user);

    } catch (error) {
      console.log(error);
      return res.status(400) 
    }
  }

}