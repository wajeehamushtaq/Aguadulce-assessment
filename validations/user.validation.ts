import { body, check } from "express-validator";

class UserPayloadValidation {
  userSignup = () => {
    return [
      body("name", "name does not exist").notEmpty(),
      body("email", "email does not exist").notEmpty(),
      body("email", "email is not valid").isEmail(),
      // check("email")
      //   .custom(async (value) => {
      //     if (await User.isUserInDatabase({ email: value }))
      //       return Promise.reject();
      //   })
      //   .withMessage("email already exists"),
      body("username", "username does not exist").notEmpty(),
      // check("username")
      //   .custom(async (value) => {
      //     if (await User.isUserInDatabase({ username: value }))
      //       return Promise.reject();
      //   })
      //   .withMessage("username already exists"),
      body("password", "password does not exist").notEmpty(),
    ];
  };

  userLogin = () => {
    return [
      body("email", "email does not exist").notEmpty(),
      body("password", "password does not exist").notEmpty(),
    ];
  };
}

export default new UserPayloadValidation();
