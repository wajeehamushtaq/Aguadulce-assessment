import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

async function checkValidationErrors<G extends {}>(
  req: Request<G>,
  res: Response,
  next: NextFunction
) {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    next();
  } else {
    res.status(400).send({ errors: validationErrors });
  }
}

export default checkValidationErrors;
