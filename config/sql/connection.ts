import { DataSource } from "typeorm";
import { User } from "../../models/user.model";
import { Auction } from "../../models/auction.model";
import dotenv from 'dotenv'

dotenv.config();

const datasource = new DataSource({
  type: "mysql",
  host: process.env.SQL_HOST || "127.0.1",
  port: parseInt(process.env.SQL_PORT || "3306"),
  username: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB,
  entities: [User, Auction],
  logging: true,
});

export default datasource;
