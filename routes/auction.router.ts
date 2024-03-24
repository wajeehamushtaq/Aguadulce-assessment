import express from "express";
import passport from "passport";
import auctionController from "../controllers/auction.controller";
import validatePayload from "../validations/auction.validation";
import checkValidationErrors from "../middlewares/checkErrors.middleware";
import { Bid } from "../models/bid.model";

const auctionRouter = express.Router();

auctionRouter.get(
  "/:id/bids",
  passport.authenticate("jwt", { session: false }),
  auctionController.getAllAuctionBids
);

auctionRouter.post<string, {}, {}, Pick<Bid, "bidder" | "value" | "auctionID">>(
  "/bid",
  passport.authenticate("jwt", { session: false }),
  validatePayload.create(),
  checkValidationErrors,
  auctionController.create
);

auctionRouter.get(
  "/:id/details",
  passport.authenticate("jwt", { session: false }),
  auctionController.getAuctionDetails
);

auctionRouter.get(
  "/:id/stats",
  passport.authenticate("jwt", { session: false }),
  auctionController.getStats
);

auctionRouter.post(
  "/deploy",
  passport.authenticate("jwt", { session: false }),
  validatePayload.deploy(),
  checkValidationErrors,
  auctionController.deploy
);

export default auctionRouter;
