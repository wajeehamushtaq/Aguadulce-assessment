import { QueryRunner, Repository } from "typeorm";
import { Bid } from "../models/bid.model";
import datasource from "../config/sql/connection";

class BidRepository {
  repository: Repository<Bid>;

  constructor() {
    this.repository = datasource.getRepository(Bid);
  }

  getAll = async (auctionID?: number): Promise<Bid[]> => {
    return await this.repository.find({ where: { auctionID } });
  };

  create = async (
    data: Pick<Bid, "bidder" | "value" | "auctionID">,
    queryRunner: QueryRunner
  ): Promise<Bid> => {
    return await queryRunner.manager.save(Bid, {
      bidder: data.bidder,
      value: data.value,
      auctionID: data.auctionID,
    });
  };
}

export default new BidRepository();
