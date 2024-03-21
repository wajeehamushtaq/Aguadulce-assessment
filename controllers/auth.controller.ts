import passport from "passport";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";

const { sign } = jwt;

class AuthController {
  signupUser = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "signup",
      { session: false },
      async (err: Error, user: User) => {
        if (err) {
          return res.send({ message: err.message });
        }
        return res.send({ user });
      }
    )(req, res, next);
  };

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "login",
      async (err: Error, user: User, info: Error) => {
        try {
          if (err || !user) {
            return res.send({ message1: err?.message || info });
          }
          req.login(user, { session: false }, async (err) => {
            if (err) res.send({ message2: err.message });

            const body = { _id: user.id, email: user.email };
            const token = sign({ user: body }, process.env.JWT_SECRET || "");

            return res.send({ jwt: token });
          });
        } catch (err) {
          return res.send({ message3: (err as Error).message });
        }
      }
    )(req, res, next);
  };
}

export default new AuthController();
