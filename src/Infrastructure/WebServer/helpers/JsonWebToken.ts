import {sign, verify, decode, JwtPayload} from 'jsonwebtoken'
import { IRefreshTokenPayload, ITokenPayload} from './ITokenPayload';


// 60000ms = 1 minunte

export const createToken = (payload: ITokenPayload) : string => {
  const token = sign(payload, "SECRET", {
    expiresIn : 100
  })
  return token;
}

export const createRefreshToken = ( payload: IRefreshTokenPayload) => {
  const token = sign(payload, "SECRET", {
    expiresIn : 30 * 60000
  })
  return token;
}

export const verifyToken = <T>(token: string) : boolean => {
  try {

    const payload = verify(token, "SECRET") as T
    return true

  } catch (error) {
    return false
  }

}
export const decodeToken = <T>(token: string):T => {
  return decode(token, {json: true}) as T
}
