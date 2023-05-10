import {Request} from "express";
import {ITokenPayload} from "../helpers/ITokenPayload";

export interface ResquestHandler extends Request {
    userLogged: ITokenPayload
}