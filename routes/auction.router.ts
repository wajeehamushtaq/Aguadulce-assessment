import express from "express";
import passport from "passport";
import auctionController from "../controllers/auction.controller";
import validatePayload from "../validations/auction.validation";
import checkValidationErrors from "../middlewares/checkErrors.middleware";
import { Auction } from "../models/auction.model";

const auctionRouter = express.Router();

auctionRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  auctionController.getAllAuctionBids
);

auctionRouter.post<string, {}, {}, Pick<Auction, "bidder" | "value">>(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatePayload.create(),
  checkValidationErrors,
  auctionController.create
);

auctionRouter.get(
  "/details",
  passport.authenticate("jwt", { session: false }),
  auctionController.getAuctionDetails
);

auctionRouter.get(
  "/stats",
  passport.authenticate("jwt", { session: false }),
  auctionController.getStats
);

export default auctionRouter;
