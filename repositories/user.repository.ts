import { Repository } from "typeorm";
import datasource from "../config/sql/connection";
import {
  User,
  UserWithoutId,
  UserWithoutIdAndPassword,
  UserWithoutPassword,
} from "../models/user.model";
import bcrypt from "bcryptjs";

class UserRepository {
  repository: Repository<User>;

  constructor() {
    this.repository = datasource.getRepository(User);
  }

  getOne = async (
    where: Partial<UserWithoutIdAndPassword>,
    withPassword?: boolean
  ): Promise<User | null> => {
    return await this.repository.findOne({
      where: { ...where },
      select: {
        email: true,
        id: true,
        name: true,
        username: true,
        password: withPassword,
      },
    });
  };

  createUser = async (user: UserWithoutId): Promise<UserWithoutPassword> => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    return await this.repository.save({
      email: user.email,
      name: user.name,
      password: hash,
      username: user.username,
    });
  };
}

export default new UserRepository();
