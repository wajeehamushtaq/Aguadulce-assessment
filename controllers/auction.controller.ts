import { Request, Response } from "express";
import { ethers } from "ethers";
import auctionService from "../services/auction.service";
import moment from "moment";
import { Auction } from "../models/auction.model";
import contract, { provider } from "../utils/contract";

class AuctionController {
  getAuctionDetails = async (req: Request, res: Response) => {
    try {
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

  getAllAuctionBids = async (req: Request, res: Response) => {
    try {
      const list = await auctionService.getAllAuctionBids();

      res.status(200).json({ list });
    } catch (err) {
      console.log(err);
      res.send({ error: (err as Error).message });
    }
  };

  create = async (
    req: Request<{}, {}, Pick<Auction, "bidder" | "value">>,
    res: Response
  ) => {
    try {
      if (+req.body.value === 0) {
        res.send({
          message: `Can not bid 0`,
        });
      }

      const signer = new ethers.Wallet(req.body.bidder, provider);
      const signerContract = contract.connect(signer);

      let highestBid = await signerContract.highestBid();

      highestBid = ethers.utils.formatEther(highestBid);

      if (+req.body.value > highestBid) {
        await signerContract.bid({
          value: ethers.utils.parseEther(`${req.body.value}` || ""),
        });

        const bid = await auctionService.createBid({
          bidder: req.body.bidder,
          value: req.body.value,
        });

        res.status(200).json({ bid });
      } else {
        res.send({
          message: `Can not bid lower then the highest Bid: ${highestBid}`,
        });
      }
    } catch (err) {
      console.log(err);
      res.send({ error: (err as Error).message });
    }
  };

  getStats = async (req: Request, res: Response) => {
    try {
      const list = await auctionService.getAllAuctionBids();

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
