import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';

export default {
  solidity: '0.8.20',
  networks: {
    celo: {
      url: process.env.CELO_MAINNET_RPC,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 42220,
    },
  },
  etherscan: {
    apiKey: 'CELOSCAN_API_KEY',
  }
};
