import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';
import "@nomicfoundation/hardhat-verify";

const { ALCHEMY_API_KEY, META_PRIVATE_KEY, API_POLYGON_SCAN } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
      url: ALCHEMY_API_KEY,
      accounts: [`0x${META_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: API_POLYGON_SCAN,
  }
};

export default config;