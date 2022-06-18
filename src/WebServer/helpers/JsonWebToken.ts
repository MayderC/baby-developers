import jwt from 'jsonwebtoken'
import ITokenPayload from './ITokenPayload';




export default class JsonWebToken {

  createToken(payload: ITokenPayload) : string {

    const token = jwt.sign(payload, "SECRET", {
      expiresIn : 15 * 60000
    })

    return token;
  }

  verifyToken(token: string) {
    const payload  = jwt.verify(token, "SECRET")
    return payload
  }


}