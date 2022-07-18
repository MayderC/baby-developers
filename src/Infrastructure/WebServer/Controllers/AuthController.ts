import {Request, Response} from 'express'
import IAuthService from '../../../Application/Ports/Services/IAuthService';
import IUser from '../../../Application/Entities/Pojo/IUser';
import {OK, BAD, ERROR, UNAUTHORIZED} from '../http-status'
import IRegisterRequest from '../../../Application/Entities/DTOs/Auth/IRegisterRequest';
import IRegisterResponse from '../../../Application/Entities/DTOs/Auth/IRegisterResponse';
import {createRefreshToken, decodeToken, createToken} from './../helpers/JsonWebToken';
import ILoginResponse from './../../../Application/Entities/DTOs/Auth/ILoginResponse';
import IUserService from '../../../Application/Ports/Services/IUserService';
import { IRfreshTokenPayload } from '../helpers/ITokenPayload';
import { NOT_FOUND } from './../http-status/index';


export default class AuthController {
  
  private _authService : IAuthService;
  private _userService : IUserService

  constructor(authService : IAuthService, userService: IUserService ){
    this._authService = authService;
    this._userService = userService;
  }

  async login(req: Request, res: Response): Promise<Response<IUser>>{
    try {
      const user: IUser = await this._authService.login(req.body.user);
      if(!user) return res.status(NOT_FOUND).send()
      
      const response : IRegisterResponse  = {
        isAuthenticated : true,
        refreshToken : createRefreshToken({id : user.id}),
        token : createToken({
          id : user.id,
          username : user.username,
          roles: []
        })
      }
      
      return res.status(OK).json(response);
    } catch (error) {
      console.log(error);
      return res.status(BAD);
    }
  }

  async register(req: Request, res: Response): Promise<Response<IUser>>{
    try {
      const userToRegister: IRegisterRequest = req.body.user
      const userMapped : IUser = {id: "", ...userToRegister}
      const user: IUser = await this._authService.register(userMapped)
  
      const response : IRegisterResponse  = {
        isAuthenticated : true,
        refreshToken : createRefreshToken({id: user.id}),
        token : createToken({
          id : user.id,
          username : user.username,
          roles: []
        })
      }

      return res.status(OK).send(response)
    } catch (error) {
      return res.status(BAD).send(ERROR)
    }

  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    try {

      const payload = decodeToken<IRfreshTokenPayload>(req.header('Authorization'))
      const user: IUser = await this._userService.getById(payload.id)
      
      
      const refresh = createRefreshToken(payload)
      const token = createToken({
        id: user.id,
        username: user.username,
        roles: []
      })

      const response: ILoginResponse = {
        isAuthenticated : true,
        refreshToken: refresh,
        token : token
      } 

      return res.status(OK).send(response)
    } catch (error) {
      return res.status(BAD).send()
    }

  }
}