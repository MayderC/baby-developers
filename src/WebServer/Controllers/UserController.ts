
import {Request, Response} from 'express'
import IUser from './../../Application/Entities/Poco/IUser';
import UserService from './../../Application/Services/Adapters/UserServices';
import MemoryRepository from '../../Application/Repositories/Adapters/MemoryRepository';
import IUserService from './../../Application/Services/Ports/IUserService';


const service : IUserService = new UserService(new MemoryRepository())

export default class UserController {

  constructor(){}

  async getAll(req: Request, res : Response) : Promise<Response<Array<IUser>>> {
    const users : Array<IUser>  = await service.getAll()
    return res.status(200).json(users);
  }

  async getById(req: Request, res: Response): Promise<Response<IUser>> {

    const user : IUser = await service.getById("a8a878s0d8sd9s9a0a9a8a7");
    return res.status(200).json(user);
  }

}