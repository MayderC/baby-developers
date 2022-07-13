import {sign, verify, decode, JwtPayload} from 'jsonwebtoken'
import {IRfreshTokenPayload, ITokenPayload} from './ITokenPayload';


// 60000ms = 1 minunte

export const createToken = (payload: ITokenPayload) : string => {

  const token = sign(payload, "SECRET", {
    //expiresIn : 15 * 60000
    expiresIn : 100
  })

  return token;
}

export const createRefreshToken = ( payload: IRfreshTokenPayload) => {

  const token = sign(payload, "SECRET", {
    expiresIn : 30 * 60000
  })

  return token;
}

export const decodeToken = <T>(token: string):T => {
  return decode(token, {json: true}) as T
}

export const verifyToken = <T>(token: string) : boolean | T => {

  try {
    const payload = verify(token, "SECRET") as T
    return payload
  } catch (error) {
    return false
  }

}

