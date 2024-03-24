import { QueryRunner } from "typeorm";
import { Bid } from "../models/bid.model";
import auctionRepository from "../repositories/bid.repository";

class BidService {
  getAllAuctionBids = async (auctionID?: number): Promise<Bid[]> => {
    return await auctionRepository.getAll(auctionID);
  };

  createBid = async (
    data: Pick<Bid, "bidder" | "value" | "auctionID">,
    queryRunner: QueryRunner
  ): Promise<Bid> => {
    return await auctionRepository.create(data, queryRunner);
  };
}

export default new BidService();
