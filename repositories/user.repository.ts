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

  getAllUsers = async (): Promise<UserWithoutPassword[]> => {
    return await [
      {
        email: "",
        id: 1,
        name: "asd",
        username: "asd",
      },
    ];
  };

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

  getUserById = async (userId: string): Promise<UserWithoutPassword> => {
    return await {
      email: "asd",
      id: 1,
      username: "asd",
      name: "asd",
    };
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

  updateUser = async (id: string, userToUpdate: UserWithoutPassword) => {
    return await {
      description: "",
      id: 1,
      name: "",
      price: 0,
    };
  };

  patchUser = async (id: string, userToPatch: Partial<UserWithoutPassword>) => {
    return await {
      description: "",
      id: 1,
      name: "",
      price: 0,
    };
  };

  deleteUser = async (id: string) => {
    return await {};
  };
}

export default new UserRepository();
