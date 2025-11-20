import '@nomicfoundation/hardhat-verify';
import 'dotenv/config';

export default {
  solidity: {
    version: '0.8.20',
    settings: {
      evmVersion: 'paris',
      optimizer: {
        enabled: false,
        runs: 200
      }
    }
  },
  networks: {
    celo: {
      url: process.env.CELO_MAINNET_RPC,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 42220,
    },
  },
  sourcify: {
    enabled: false
  },
  etherscan: {
    apiKey: {
      celo: 'CELOSCAN_API_KEY'
    },
    customChains: [
      {
        network: 'celo',
        chainId: 42220,
        urls: {
          apiURL: 'https://api.celoscan.io/api',
          browserURL: 'https://celoscan.io'
        }
      }
    ]
  }
};


