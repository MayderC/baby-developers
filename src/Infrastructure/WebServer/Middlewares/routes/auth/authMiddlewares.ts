import { check, header } from 'express-validator'
import { HEADER_AUTHORIZATION } from '../../../http-status'
import { validateRefreshJWT } from '../../JsonWebToken'
import { validation } from '../../validationResult'

export const loginMiddlewares =  [
    check('user.email', 'the email is requerid')
    .notEmpty()
    .isEmail(),

    check('user.password', 'the password is requerid')
    .notEmpty()
    .isLength({max: 16, min : 6})
    .withMessage('must be at least 16 chars long and 6 min'),
    validation
  ]



export const registerMiddlewares = [
    check('user.fullName', 'the fullName is requerid')
    .notEmpty().withMessage('fullname must not be empty')
    .isLength({max: 16, min : 3}).withMessage('must be at least 16 chars long and 3 min'),

    check('user.email', 'the email is required')
    .isEmail().withMessage('email must be a valid email address')
    .notEmpty().withMessage('email must not be empty'),

    check('user.password', 'the password is requerid')
    .notEmpty().withMessage('password must not be empty')
    .isLength({max: 16, min : 6}).withMessage('must be at least 16 chars long and 6 min'),

    check('user.role', 'the role is requerid').custom(async (value) => {
      // todo 
      //controller role, get by name, 
      return true
    }).withMessage(`invalid role`),
    
    validation
  ]



export const refreshMiddlewares =   [
    header([HEADER_AUTHORIZATION, 'invalid token']).notEmpty(),
    validateRefreshJWT,
    validation
  ]
