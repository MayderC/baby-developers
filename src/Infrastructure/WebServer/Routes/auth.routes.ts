import {Router} from 'express';
import {body, check, header} from 'express-validator'
import { IRefreshTokenPayload } from '../helpers/ITokenPayload';
import { HEADER_AUTHORIZATION } from '../http-status';
import { validateRefreshJWT } from '../Middlewares/JsonWebToken';
import { validation } from '../Middlewares/validationResult';
import AuthController from './../Controllers/AuthController';
const router = Router();



export default (authController: AuthController) => {
  
  router.post('/login',[
    check('user.username', 'the username is requerid')
    .notEmpty()
    .isLength({max: 16, min : 3})
    .withMessage('must be at least 16 chars long and 3 min'),

    check('user.password', 'the password is requerid')
    .notEmpty()
    .isLength({max: 16, min : 6})
    .withMessage('must be at least 16 chars long and 6 min'),
    validation
  ],authController.login.bind(authController))

  router.post('/register', [
    check(['user.username', 'the username is requerid']).notEmpty().isLength({max: 16, min : 3}),
    check(['user.email', 'the email is required']).isEmail().notEmpty(),
    check(['user.password', 'the password is requerid']).notEmpty().isLength({max: 16, min : 6}),
    validation
  ], authController.register.bind(authController))

  router.get('/refresh', [
    header([HEADER_AUTHORIZATION, 'invalid token']).notEmpty(),
    validateRefreshJWT,
    validation
  ], authController.refreshToken.bind(authController))

  return router; 
}
