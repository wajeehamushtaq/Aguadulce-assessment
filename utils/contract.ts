import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

export const provider = new ethers.providers.JsonRpcProvider(
  process.env.SMART_CONTRACT_PROVIDER
);
