import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import indexRouter from "./routes/index";
import passport from "./config/passport/config";
import datasource from "./config/sql/connection";
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());

const port = process.env.PORT || 4000;

app.use("/", indexRouter);

app.listen(port, () => {
  datasource
    .initialize()
    .then((value) => {
      console.log(`Connected to the database`);
      datasource.synchronize();
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(`Example app listening on port ${port || 4000}`);
});
