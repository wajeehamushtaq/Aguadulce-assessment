import { Repository } from "typeorm";
import { Auction } from "../models/auction.model";
import datasource from "../config/sql/connection";

class AuctionRepository {
  repository: Repository<Auction>;

  constructor() {
    this.repository = datasource.getRepository(Auction);
  }

  getAll = async (): Promise<Auction[]> => {
    return await this.repository.find();
  };

  create = async (
    data: Pick<Auction, "bidder" | "value">
  ): Promise<Auction> => {
    return await this.repository.save({
      bidder: data.bidder,
      value: data.value,
    });
  };
}

export default new AuctionRepository();
