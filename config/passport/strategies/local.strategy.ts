import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { User } from "../../../models/user.model";
import datasource from "../../sql/connection";
import { Request } from "express";
import userRepository from "../../../repositories/user.repository";

const signUpStrategyWithPassport = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (req: Request<any, any, User>, username, password, done) => {
    try {
      const newUser = await userRepository.createUser({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      done(null, newUser);
    } catch (err) {
      done(err);
    }
  }
);

const loginStrategyWithPassport = new LocalStrategy(
  { usernameField: "email" },
  async function verify(email, password, done) {
    try {
      const user = await userRepository.getOne({ email }, true);

      if (!user) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return done(null, {
          email: user.email,
          id: user.id,
          name: user.name,
          username: user.username,
        });
      } else {
        return done(null, false, { message: "Incorrect username or password" });
      }
    } catch (err) {
      return done(err);
    }
  }
);

export { loginStrategyWithPassport, signUpStrategyWithPassport };
