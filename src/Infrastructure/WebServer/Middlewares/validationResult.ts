import { NextFunction, Request, Response } from "express";

const { validationResult } = require('express-validator');



export const  validation = (req: Request, res: Response, next: NextFunction): Response => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return `${location}[${param}]: ${msg}`;
  };


  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {

    return res.json({ errors: result.array() });
  }

  next()
}