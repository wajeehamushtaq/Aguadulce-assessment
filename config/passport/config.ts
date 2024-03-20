import passport from "passport";

import {
  signUpStrategyWithPassport,
  loginStrategyWithPassport,
} from "./strategies/local.strategy";

import jwtStrategy from "./strategies/jwt.strategy";

passport.use("signup", signUpStrategyWithPassport);
passport.use("login", loginStrategyWithPassport);
passport.use("jwt", jwtStrategy);

export default passport;
