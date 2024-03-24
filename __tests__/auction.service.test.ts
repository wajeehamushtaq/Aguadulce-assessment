import supertest from "supertest";
import createServer from "../server";
import datasource from "../config/sql/connection";
import { Express } from "express";
import auctionRepository from "../repositories/auction.repository";
import auctionService from "../services/auction.service";
import { Auction } from "../models/Auction.model";

jest.mock("../repositories/auction.repository", () => ({
  getOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
}));

describe("AuctionService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getOne", () => {
    it("should return null if auction is not found", async () => {
      const nonExistentAuctionID = 123;
      (auctionRepository.getOne as jest.Mock).mockResolvedValueOnce(null);

      const result = await auctionService.getOne(nonExistentAuctionID);

      expect(result).toBeNull();
      expect(auctionRepository.getOne).toHaveBeenCalledWith(
        nonExistentAuctionID
      );
    });

    // Add more tests for other scenarios if needed
  });

  describe("createContract", () => {
    it("should create a new auction contract", async () => {
      const auctionData: Partial<Auction> = {
        name: "Test Auction",
        address: "Test Address",
        createdAt: new Date(),
      };
      const queryRunner = {} as any;
      const createdAuction: Auction = {
        id: 1,
        name: auctionData.name || "",
        address: auctionData.address || "",
        createdAt: auctionData.createdAt || new Date(),
        ...auctionData,
      };
      (auctionRepository.create as jest.Mock).mockResolvedValueOnce(
        createdAuction
      );

      const result = await auctionService.createContract(
        auctionData,
        queryRunner
      );

      expect(result).toEqual(createdAuction);
      expect(auctionRepository.create).toHaveBeenCalledWith(
        auctionData,
        queryRunner
      );
    });

    // Add more tests for other scenarios if needed
  });

  describe("updateContract", () => {
    it("should update an existing auction contract", async () => {
      const updatedAuctionData: Partial<Auction> = {
        id: 1,
        name: "Updated Auction Name",
      };
      const queryRunner = {} as any;
      const updatedAuction: Auction = {
        id: 1,
        name: "Updated Auction Name",
        address: "Test Address",
        createdAt: new Date(),
      };
      (auctionRepository.update as jest.Mock).mockResolvedValueOnce(
        updatedAuction
      );

      const result = await auctionService.updateContract(
        updatedAuctionData,
        queryRunner
      );

      expect(result).toEqual(updatedAuction);
      expect(auctionRepository.update).toHaveBeenCalledWith(
        updatedAuctionData,
        queryRunner
      );
    });

    // Add more tests for other scenarios if needed
  });
});
