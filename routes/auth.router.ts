import express from "express";

import authController from "../controllers/auth.controller";
import validatePayload from "../validations/user.validation";
import checkValidationErrors from "../middlewares/checkErrors.middleware";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validatePayload.userSignup(),
  checkValidationErrors,
  authController.signupUser
);

authRouter.post(
  "/login",
  validatePayload.userLogin(),
  checkValidationErrors,
  authController.loginUser
);

export default authRouter;
