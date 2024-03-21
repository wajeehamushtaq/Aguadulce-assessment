import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import datasource from "../config/sql/connection";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  name: string;
}

export type UserWithoutPassword = Omit<User, "password">;
export type UserWithoutId = Omit<User, "id">;
export type UserWithoutIdAndPassword = Omit<UserWithoutPassword, "id">;
