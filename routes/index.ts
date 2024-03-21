import express from "express";

import authRouter from "./auth.router";
import auctionRouter from "./auction.router";

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/auction", auctionRouter);

export default indexRouter;
