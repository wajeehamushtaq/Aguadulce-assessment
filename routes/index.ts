import express from "express";

import authRouter from "./auth.router";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);

export default indexRouter;
