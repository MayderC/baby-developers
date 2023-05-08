import { Request, Response } from "express";
import {IAuthService, IUserService} from "../../../Application/Ports/Services";
import IUser from "../../../Application/Entities/Pojo/IUser";
import {OK, BAD, ERROR, HEADER_AUTHORIZATION, sendMsg} from "../http-status";
import { IRegisterRequest, IRegisterResponse, ILoginResponse } from "../DTOs/Auth";
import {createRefreshToken, decodeToken, createToken,} from "./../helpers/JsonWebToken";
import { IRefreshTokenPayload } from "../helpers/ITokenPayload";
import { NOT_FOUND } from "./../http-status/index";
import IRole from './../../../Application/Entities/Pojo/IRole';



export default class AuthController {
  private _authService: IAuthService;
  private _userService: IUserService;

  constructor(authService: IAuthService, userService: IUserService) {
    this._authService = authService;
    this._userService = userService;
  }

  async login(req: any, res: Response): Promise<ILoginResponse> {
    try {
      const user: IUser = await this._authService.login(req.body.user);

      const response: ILoginResponse = {
        isAuthenticated: true,
        refreshToken: createRefreshToken({ id: user.id }),
        token: createToken({
          id: user.id, 
          fullName: user.fullName ,
          roles: (user.roles as IRole[]).map(x => x.name),
        }),
      };

      res.status(OK).json(response);
      return Promise.resolve(response)
    } catch (error) {
      console.log(error)
      res.status(BAD);
      return 
    }
  }

  async register(req: Request, res: Response): Promise<Response<IRegisterResponse>> {
    try {

      const request: IRegisterRequest = req.body.user;
      const userMapped: IUser = { id: "", ...request, roles : [] };
      const user: IUser = await this._authService.register(userMapped, request.roles[0]);

      const response: IRegisterResponse = {
        isAuthenticated: true,
        refreshToken: createRefreshToken({ id: user.id }),
        token: createToken({
          id: user.id,
          fullName: user.fullName,
          roles: (user.roles as IRole[]).map(x => x.name),
        }),
      };
      return res.status(OK).send(response);
    } catch (error) {
      console.log(error)
      return res.status(BAD).send(ERROR);
    }
  }

  async refreshToken(req: Request, res: Response): Promise<Response<ILoginResponse>> {
    try {

      const payload = decodeToken<IRefreshTokenPayload>(req.header(HEADER_AUTHORIZATION));
      const user: IUser = await this._userService.getById(payload.id);

      const refresh = createRefreshToken(payload);
      const token = createToken({
        id: user.id,
        fullName: user.fullName,
        roles: (user.roles as IRole[]).map(x => x.name),
      });

      const response: ILoginResponse = {
        isAuthenticated: true,
        refreshToken: refresh,
        token: token,
      };

      return res.status(OK).send(response);
    } catch (error) {
      return res.status(BAD).send();
    }
  }
}
