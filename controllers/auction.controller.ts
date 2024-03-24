import { Request, Response } from "express";
import { ethers } from "ethers";
import bidService from "../services/bid.service";
import moment from "moment";
import { Bid } from "../models/bid.model";
import { provider } from "../utils/contract";
import datasource from "../config/sql/connection";
import { Auction } from "../models/Auction.model";
import contractService from "../services/auction.service";

export interface IDParam {
  id: string;
}

class AuctionController {
  getAuctionDetails = async (req: Request<IDParam>, res: Response) => {
    try {
      const existedAuction = await contractService.getOne(+req.params.id);

      if (!existedAuction) {
        return res.send({
          message: `Auction does not exists`,
        });
      }

      const contract = new ethers.Contract(
        existedAuction.address,
        process.env.CONTRACT_ABI || "",
        provider
      );

      let highestBid = await contract.highestBid();
      let endTime = await contract.auctionEndTime();
      endTime = endTime.toNumber() * 1000;
      endTime = new Date(endTime);
      endTime = endTime.toLocaleString();

      highestBid = ethers.utils.formatEther(highestBid);

      const auctionStatus = moment().isAfter(new Date(endTime))
        ? "Expired"
        : "Active";

      res.status(200).json({
        highestBid,
        auctionStatus,
      });
    } catch (err) {
      console.log(err);
      res.send({ error: (err as Error).message });
    }
  };

  getAllAuctionBids = async (req: Request<IDParam>, res: Response) => {
    try {
      const list = await bidService.getAllAuctionBids(+req.params.id);

      res.status(200).json({ list });
    } catch (err) {
      console.log(err);
      res.send({ error: (err as Error).message });
    }
  };

  deploy = async (
    req: Request<{}, {}, Partial<Auction> & { endTime: Date }>,
    res: Response
  ) => {
    const queryRunner = datasource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const contract = await contractService.createContract({}, queryRunner);

      const signer = new ethers.Wallet(
        process.env.BENEFICIARY_PRIVATE_KEY || "",
        provider
      );

      const newContract = new ethers.ContractFactory(
        process.env.CONTRACT_ABI || "",
        process.env.CONTRACT_BYTECODE || "",
        signer
      );

      const deployedContract = await newContract.deploy(
        req.body.endTime,
        process.env.BENEFICIARY_ADDRESS || ""
      );

      const updatedContract = await contractService.updateContract(
        {
          id: contract.id,
          address: deployedContract.address,
        },
        queryRunner
      );

      await queryRunner.commitTransaction();

      res.status(200).json({ contract: updatedContract });
    } catch (err) {
      console.log(err);
      queryRunner.rollbackTransaction();
      res.send({ error: (err as Error).message });
    }
  };

  create = async (
    req: Request<{}, {}, Pick<Bid, "bidder" | "value" | "auctionID">>,
    res: Response
  ) => {
    const queryRunner = datasource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const existedAuction = await contractService.getOne(+req.body.auctionID);

      if (!existedAuction) {
        return res.send({
          message: `Auction does not exists`,
        });
      }

      const contract = new ethers.Contract(
        existedAuction.address,
        process.env.CONTRACT_ABI || "",
        provider
      );

      let endTime = await contract.auctionEndTime();
      endTime = endTime.toNumber() * 1000;
      endTime = new Date(endTime);
      endTime = endTime.toLocaleString();

      if (moment().isAfter(new Date(endTime))) {
        return res.send({
          message: `Auction has expired.`,
        });
      }

      if (+req.body.value === 0) {
        return res.send({
          message: `Can not bid 0`,
        });
      }

      const signer = new ethers.Wallet(req.body.bidder, provider);
      const signerContract = contract.connect(signer);

      let highestBid = await signerContract.highestBid();

      highestBid = ethers.utils.formatEther(highestBid);

      if (+req.body.value > highestBid) {
        const bid = await bidService.createBid(
          {
            bidder: req.body.bidder,
            value: req.body.value,
            auctionID: req.body.auctionID,
          },
          queryRunner
        );

        await signerContract.bid({
          value: ethers.utils.parseEther(`${req.body.value}` || ""),
        });

        await queryRunner.commitTransaction();

        res.status(200).json({ bid });
      } else {
        res.send({
          message: `Can not bid lower then the highest Bid: ${highestBid}`,
        });
      }
    } catch (err) {
      console.log(err);
      queryRunner.rollbackTransaction();
      res.send({ error: (err as Error).message });
    }
  };

  getStats = async (req: Request<IDParam>, res: Response) => {
    try {
      const list = await bidService.getAllAuctionBids(+req.params.id);

      res.status(200).json({
        totalBidsCount: list.length,
        volume: list.reduce((prev, curr) => (prev += +curr.value), 0),
      });
    } catch (err) {
      console.log(err);
      res.send({ error: (err as Error).message });
    }
  };
}

export default new AuctionController();
