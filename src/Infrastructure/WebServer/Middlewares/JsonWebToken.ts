
import {verifyToken} from './../helpers/JsonWebToken';
import { Request, Response, NextFunction } from 'express';
import { HEADER_AUTHORIZATION, UNAUTHORIZED } from '../http-status';
import { ITokenPayload, IRefreshTokenPayload  } from '../helpers/ITokenPayload';


export const validateJWT = (req: Request, res: Response, next: NextFunction ): Response => {

  const token = req.header(HEADER_AUTHORIZATION)
  if(!token)  return res.status(UNAUTHORIZED).send()

  const isValid = verifyToken<ITokenPayload>(token.split(" ")[1])
  if(isValid === false) return res.status(UNAUTHORIZED).send()

  next()
}

export const validateRefreshJWT = (req: Request, res: Response, next: NextFunction) : Response => {

  const token = req.header(HEADER_AUTHORIZATION)
  if(!token)  return res.status(UNAUTHORIZED).send()

  const isValid = verifyToken<IRefreshTokenPayload>(token.split(" ")[1])
  if(isValid === false) return res.status(UNAUTHORIZED).send()

  next()
}