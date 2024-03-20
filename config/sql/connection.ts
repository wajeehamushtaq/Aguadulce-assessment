import { DataSource } from "typeorm";
import { User } from "../../models/user.model";

const datasource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password123",
  database: "assessment",
  entities: [User],
});

export default datasource;
