import { body, check } from "express-validator";

// import User from "../models/user.model.js";

class AuctionPayloadValidation {
  create = () => {
    return [
      body("bidder", "bidder does not exist").notEmpty(),
      body("value", "value does not exist").notEmpty(),
      body("auctionID", "auctionID does not exist").notEmpty(),
    ];
  };

  deploy = () => {
    return [body("endTime", "endTime does not exist").notEmpty()];
  };
}

export default new AuctionPayloadValidation();
