import {Request, Response} from 'express'
import IAuthService from './../../Application/Services/Ports/IAuthService';
import AuthService from './../../Application/Services/Adapters/AuthService';
import IUser from './../../Application/Entities/Pojo/IUser';
import UserRepository from './../../Application/Repositories/Adapters/UserRepository';
import ILoginRequest from './../../Application/Entities/Pojo/DTOs/Auth/ILoginRequest';


export default class AuthController {
  
  private _authService : IAuthService;
  
  constructor(_authService : AuthService){

    this._authService = new AuthService(new UserRepository());

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