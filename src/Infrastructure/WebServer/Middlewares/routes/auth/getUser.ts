import {Response} from "express";
import {ERROR, HEADER_AUTHORIZATION, UNAUTHORIZED} from "../../../http-status";
import {decodeToken} from "../../../helpers/JsonWebToken";
import {ITokenPayload} from "../../../helpers/ITokenPayload";
import {CustomResquestHandler} from "../../CustomResquestHandler";

export const getUser = (req: CustomResquestHandler, res: Response, next: Function) => {
    const id = req.header(HEADER_AUTHORIZATION)
    if(!id) return res.status(UNAUTHORIZED).send(ERROR)
    req.userLogged = decodeToken<ITokenPayload>(id.split(' ')[1])
    return next()
}