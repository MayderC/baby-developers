import {decode, sign, verify} from 'jsonwebtoken'
import {IRefreshTokenPayload, ITokenPayload} from './ITokenPayload';
import Environments from '../../../Environments/index'

const env = Environments

export const createToken = (payload: ITokenPayload) : string => {
  const token = sign(payload, env.JWT_KEYWORD, {
    expiresIn : 60 * 10
  })
  return token;
}

export const createRefreshToken = ( payload: IRefreshTokenPayload) => {
  return sign(payload, env.JWT_KEYWORD, {
    expiresIn: 60 * 60
  });
}

export const verifyToken = <T>(token: string) : boolean => {
  try {
    const payload = verify(token, env.JWT_KEYWORD) as T
    return !!payload

  } catch (error) {
    return false
  }

}

export const decodeToken = <T>(token: string):T => {
  return decode(token, {json: true}) as T
}
