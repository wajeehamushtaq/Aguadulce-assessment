import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

const jwtStrategy = new JWTstrategy(
  {
    secretOrKey: process.env.JWT_SECRET || "",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (token, done) => {
    try {
      return done(null, token.user);
    } catch (err) {
      done(err);
    }
  }
);

export default jwtStrategy;
