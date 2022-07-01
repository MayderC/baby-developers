import {Request, Response} from 'express'
import IAuthService from '../../../Application/Ports/Services/IAuthService';
import AuthService from '../../../Application/Adapters/Services/AuthService';
import IUser from '../../../Application/Entities/Pojo/IUser';
import ILoginRequest from '../../../Application/Entities/Pojo/DTOs/Auth/ILoginRequest';
import UserRepository from './../../../Application/Adapters/Repositories/UserRepository';

const _authService = new AuthService(new UserRepository())

export default class AuthController {
  
  private _authService : IAuthService;
  
  constructor(authService : AuthService){
    this._authService = authService
  }

  async login(req: Request, res: Response): Promise<Response<IUser>>{
    try {
      const login : ILoginRequest = req.body
      //todo map login request to user
      const response: IUser = await this._authService.login({email: "",id: "",password : "",username: ""});
      // map user to login response
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(400);
    }
  }

  async register(res: Response, req: Request): Promise<Response<IUser>>{

    const user: IUser = await this._authService.register({email: "",id: "",password : "",username: ""})
    return res.status(200).send(user)
  }
}