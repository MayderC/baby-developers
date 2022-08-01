import { NextFunction, Request, Response } from "express";
import { BAD } from "../http-status";

const { validationResult } = require('express-validator');



export const  validation = (req: Request, res: Response, next: NextFunction): Response => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return `${location}[${param}]: ${msg}`;
  };


  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {

    return res.status(BAD).send({ errors: result });
  }

  next()
}