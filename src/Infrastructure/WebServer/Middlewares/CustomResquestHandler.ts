import {Request} from "express";
import {ITokenPayload} from "../helpers/ITokenPayload";

export interface CustomResquestHandler extends Request {
    userLogged: ITokenPayload
}