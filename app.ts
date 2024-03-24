import datasource from "./config/sql/connection";
import createServer from "./server";

const port = +(process.env.PORT || 0) || 4000;

const app = createServer(port, datasource);
