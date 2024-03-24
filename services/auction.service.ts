import { QueryRunner } from "typeorm";
import { Auction } from "../models/Auction.model";
import auctionRepository from "../repositories/auction.repository";

class AuctionService {
  getOne = async (auctionID: number): Promise<Auction | null> => {
    return await auctionRepository.getOne(auctionID);
  };

  createContract = async (
    data: Partial<Auction>,
    queryRunner: QueryRunner
  ): Promise<Auction> => {
    return await auctionRepository.create(data, queryRunner);
  };

  updateContract = async (
    data: Partial<Auction>,
    queryRunner: QueryRunner
  ): Promise<Auction> => {
    return await auctionRepository.update(data, queryRunner);
  };
}

export default new AuctionService();
