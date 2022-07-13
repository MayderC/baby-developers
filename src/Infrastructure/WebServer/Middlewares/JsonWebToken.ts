
import {verifyToken} from './../helpers/JsonWebToken';
import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from '../http-status';
import { ITokenPayload } from '../helpers/ITokenPayload';

export const validateJWT = (req: Request, res: Response, next: NextFunction ): Response => {

  const token = req.header('Authorization')
  if(!token)  return res.status(UNAUTHORIZED).send()

  const isValid = verifyToken<ITokenPayload>(token.split(" ")[1])
  if(!isValid)
    return res.status(UNAUTHORIZED).send()

  next()
}