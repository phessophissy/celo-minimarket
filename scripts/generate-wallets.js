#!/usr/bin/env node

import { ethers } from 'ethers';
import { writeFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WALLETS_FILE = path.join(__dirname, 'wallets.json');
const WALLET_COUNT = 100;

function main() {
  if (existsSync(WALLETS_FILE)) {
    console.log(`Wallets file already exists at ${WALLETS_FILE}`);
    console.log('Delete it first if you want to regenerate.');
    process.exit(1);
  }

  console.log(`Generating ${WALLET_COUNT} wallets...`);
  const wallets = [];

  for (let i = 0; i < WALLET_COUNT; i++) {
    const wallet = ethers.Wallet.createRandom();
    wallets.push({
      index: i,
      address: wallet.address,
      privateKey: wallet.privateKey,
    });
  }

  writeFileSync(WALLETS_FILE, JSON.stringify(wallets, null, 2));
  console.log(`Generated ${WALLET_COUNT} wallets -> ${WALLETS_FILE}`);
  console.log(`First wallet: ${wallets[0].address}`);
  console.log(`Last wallet:  ${wallets[WALLET_COUNT - 1].address}`);
}

main();
