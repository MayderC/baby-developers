import {Request, Response} from 'express'
import IUser from '../../../Application/Entities/Pojo/IUser';
import IUserService from '../../../Application/Ports/Services/IUserService';
import {BAD,OK, DELETED, UPDATED, ERROR, SAVED, sendMsg} from '../http-status'


export default class UserController {
  
  private _userService : IUserService;
  constructor(userService: IUserService){
    this._userService = userService;
  }

  async getAll(req: Request, res : Response) : Promise<Response<Array<IUser>>> {
    try {
      const users : Array<IUser>  = await this._userService.getAll()
      return res.status(OK).json(users);
    } catch (error) {
      console.log(error);
      return res.status(BAD);
    }
  }

  async getById(req: Request, res: Response): Promise<Response<IUser>> {
    try {

      const user : IUser | null= await this._userService.getById(req.params['id']);
      return res.status(OK).json(user);

    } catch (error) {
      return res.status(BAD).send(ERROR)
    }
  }

  async update(req: Request, res: Response): Promise<Response>{
    try {

      await this._userService.update(req.body.user)
      return res.status(OK).send(UPDATED)

    } catch (error) {
      return res.status(BAD).send(ERROR)
    }
  }

  async delete(req: Request, res: Response): Promise<Response>{
    try {

      const isDeleted = await this._userService.delete(req.params['id'])
      return isDeleted ? res.status(OK).send(DELETED) : res.status(BAD).send(ERROR)

    } catch (error) {
      return res.status(BAD).send(error)
    }
  }

  async save(req: Request, res: Response): Promise<Response> {
    try {

      const userFound = await this._userService.getByUsernme(req.body.user.username)
      if(userFound)return res.status(BAD).send(sendMsg("This user is already taken"))


      const user = await this._userService.save(req.body.user)
      return res.status(OK).send(user)

    } catch (error) {
      return res.status(BAD).send(ERROR)
    }
  }
  

}