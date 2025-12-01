import '@nomicfoundation/hardhat-verify';
import 'dotenv/config';

export default {
  solidity: {
    version: '0.8.20',
    settings: {
      evmVersion: 'paris',
      optimizer: {
        enabled: false
      }
    }
  },
  networks: {
    celo: {
      url: process.env.CELO_MAINNET_RPC || 'https://rpc.ankr.com/celo',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 42220,
    },
  },
  sourcify: {
    enabled: false
  },
  etherscan: {
    apiKey: {
      celo: process.env.CELOSCAN_API_KEY || 'abc' // Celoscan doesn't require API key for verification
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


