import {sign, verify, decode, JwtPayload} from 'jsonwebtoken'
import { IRefreshTokenPayload, ITokenPayload} from './ITokenPayload';
import Environments from '../../../Environments/index'

const env = Environments

export const createToken = (payload: ITokenPayload) : string => {
  const token = sign(payload, env.JWT_KEYWORD, {
    expiresIn : 100
  })
  return token;
}

export const createRefreshToken = ( payload: IRefreshTokenPayload) => {
  const token = sign(payload, env.JWT_KEYWORD, {
    expiresIn : 30 * 60000
  })
  return token;
}

export const verifyToken = <T>(token: string) : boolean => {
  try {
    const payload = verify(token, env.JWT_KEYWORD) as T
    return payload ? true : false

  } catch (error) {
    return false
  }

}

export const decodeToken = <T>(token: string):T => {
  return decode(token, {json: true}) as T
}
