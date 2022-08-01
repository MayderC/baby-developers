import {Request, Response} from 'express'
import {IAuthService, IUserService} from '../../../Application/Ports/Services';
import IUser from '../../../Application/Entities/Pojo/IUser';
import {OK, BAD, ERROR} from '../http-status'
import {IRegisterRequest, IRegisterResponse, ILoginResponse} from '../DTOs/Auth';
import {createRefreshToken, decodeToken, createToken} from './../helpers/JsonWebToken';
import { IRefreshTokenPayload } from '../helpers/ITokenPayload';
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

      //property role is not part of IUser, but is in User Entity /models

      const userWhitRole: IRegisterRequest = req.body.user
      const { role, ...userWhitOutRole } = userWhitRole
      
      const userMapped : IUser = {id: "", ...userWhitOutRole}
      const user: IUser = await this._authService.register(userMapped, role)

  
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
      const payload = decodeToken<IRefreshTokenPayload>(req.header('Authorization'))
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