import { Auction } from "../models/auction.model";
import auctionRepository from "../repositories/auction.repository";

class AuctionService {
  getAllAuctionBids = async (): Promise<Auction[]> => {
    return await auctionRepository.getAll();
  };

  createBid = async (
    data: Pick<Auction, "bidder" | "value">
  ): Promise<Auction> => {
    return await auctionRepository.create(data);
  };
}

export default new AuctionService();
