import { QueryRunner, Repository } from "typeorm";
import datasource from "../config/sql/connection";
import { Auction } from "../models/Auction.model";

class AuctionRepository {
  repository: Repository<Auction>;

  constructor() {
    this.repository = datasource.getRepository(Auction);
  }

  getOne = async (auctionID: number): Promise<Auction | null> => {
    return await this.repository.findOne({ where: { id: auctionID } });
  };

  create = async (
    data: Partial<Auction>,
    queryRunner: QueryRunner
  ): Promise<Auction> => {
    return await queryRunner.manager.save(Auction, {
      address: "",
      createdAt: new Date(),
    });
  };

  update = async (
    data: Partial<Auction>,
    queryRunner: QueryRunner
  ): Promise<Auction> => {
    return await queryRunner.manager.save(Auction, {
      id: data.id,
      address: data.address,
    });
  };
}

export default new AuctionRepository();
