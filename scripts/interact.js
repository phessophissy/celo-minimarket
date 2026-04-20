#!/usr/bin/env node

import { setDefaultResultOrder } from 'dns';
import https from 'https';
setDefaultResultOrder('ipv4first');

// Force all Node.js fetch/https connections to use IPv4
const origConnect = https.globalAgent.createConnection;
https.globalAgent.createConnection = function (options, ...args) {
  options.family = 4;
  return origConnect.call(this, options, ...args);
};

/**
 * CeloMiniMarket Interaction Script
 * 
 * Funds 100 wallets with 0.01 CELO each, then interacts with the
 * deployed CeloMiniMarket contract on Celo Mainnet.
 * 
 * Interactions per wallet:
 *   - addProduct: list a product on the marketplace (mints NFT)
 *   - purchaseProduct: some wallets buy products listed by others
 * 
 * Usage:
 *   node scripts/interact.js fund           # Fund all wallets with 0.01 CELO
 *   node scripts/interact.js add-products   # Each wallet adds a product
 *   node scripts/interact.js purchase       # Some wallets purchase products
 *   node scripts/interact.js status         # Check wallet balances & product count
 *   node scripts/interact.js full           # Run fund -> add-products -> purchase
 */

import { ethers } from 'ethers';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WALLETS_FILE = path.join(__dirname, 'wallets.json');
const ABI_FILE = path.join(__dirname, '..', 'frontend', 'src', 'abi', 'CeloMiniMarket.json');

const RPC_URL = process.env.CELO_MAINNET_RPC || 'https://rpc.ankr.com/celo';
const MARKET_ADDRESS = '0x7a280e8b5995F72F20a1e90177C20D002aC1C3a4';
const FUND_AMOUNT = ethers.parseEther('0.1'); // 0.1 CELO per wallet
const DELAY_MS = 1500; // delay between txs to avoid nonce issues
const MAX_RETRIES = 3;

// Sample product data for variety
const PRODUCT_NAMES = [
  'Fresh Mangoes', 'Organic Rice 5kg', 'Handmade Soap', 'Local Honey',
  'Dried Fish Pack', 'Cassava Flour', 'Palm Oil 1L', 'Ground Pepper',
  'Plantain Chips', 'Coconut Water', 'Shea Butter', 'Moringa Powder',
  'Groundnut Paste', 'Yam Tuber', 'Fresh Tomatoes', 'Ginger Root',
  'Dried Herbs Bundle', 'Baobab Juice', 'Hibiscus Tea', 'Cocoa Powder',
  'Smoked Catfish', 'Bean Cake Mix', 'Suya Spice', 'Locust Beans',
  'Tiger Nut Milk', 'Okra Powder', 'Melon Seeds', 'Egusi Ground',
  'Crayfish Dried', 'Ogbono Seeds', 'Bitter Leaf', 'Uziza Leaves',
  'Stockfish Head', 'Pounded Yam', 'Garri Ijebu', 'Fufu Mix',
  'Chin Chin Pack', 'Puff Puff Mix', 'Meat Pie', 'Buns Recipe',
  'Kilishi Dried', 'Nkwobi Spice', 'Ofada Rice', 'Abakiliki Rice',
  'Banga Soup Mix', 'Efo Riro Spice', 'Jollof Mix', 'Fried Rice Spice',
  'Akamu/Ogi Pack', 'Kunu Mix', 'Zobo Mix', 'Fura da Nono',
  'Agege Bread', 'Roasted Corn', 'Boiled Peanuts', 'Fried Plantain',
  'Moi Moi Leaves', 'Banana Bunch', 'Pineapple Fresh', 'Watermelon',
  'Pawpaw Ripe', 'Orange Basket', 'Avocado Pack', 'Guava Set',
  'Sweet Potato', 'Irish Potato', 'Carrot Bundle', 'Cabbage Head',
  'Spinach Fresh', 'Lettuce Head', 'Green Pepper', 'Onion Bag',
  'Garlic Bulbs', 'Tumeric Fresh', 'Scotch Bonnet', 'Curry Leaves',
  'Thyme Bunch', 'Bay Leaves', 'Cinnamon Sticks', 'Clove Pack',
  'Nutmeg Whole', 'Star Anise', 'Black Pepper', 'Vanilla Pods',
  'Sesame Seeds', 'Flax Seeds', 'Chia Seeds', 'Sunflower Seeds',
  'Cashew Nuts', 'Almonds Pack', 'Walnuts', 'Macadamia Nuts',
  'Dried Dates', 'Raisins Pack', 'Dried Apricot', 'Fig Dried',
  'Coconut Oil', 'Olive Oil', 'Avocado Oil', 'Safflower Oil',
  'Soy Milk', 'Oat Milk', 'Almond Milk', 'Rice Milk',
];

const PRODUCT_DESCRIPTIONS = [
  'Fresh and locally sourced, delivered same day.',
  'Premium quality from local farms.',
  'Organic and chemical-free, farm to table.',
  'Traditional recipe, handmade with care.',
  'Best quality, competitive price.',
  'Limited stock, order now!',
  'Perfect for your daily cooking needs.',
  'Sourced from trusted local vendors.',
  'Grade A quality, satisfaction guaranteed.',
  'Natural and unprocessed.',
];

// Minimal 1x1 pixel PNG as base64 data URI (saves gas vs large images)
const PLACEHOLDER_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadWallets() {
  if (!existsSync(WALLETS_FILE)) {
    console.error('Wallets file not found. Run: node scripts/generate-wallets.js');
    process.exit(1);
  }
  return JSON.parse(readFileSync(WALLETS_FILE, 'utf-8'));
}

function loadABI() {
  const artifact = JSON.parse(readFileSync(ABI_FILE, 'utf-8'));
  return artifact.abi;
}

function getFunderWallet(provider) {
  const key = process.env.FUNDER_PRIVATE_KEY;
  if (!key) {
    console.error('Set FUNDER_PRIVATE_KEY in .env (funder wallet with CELO)');
    process.exit(1);
  }
  return new ethers.Wallet(key, provider);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function sendWithRetry(fn, label, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const msg = err?.message || String(err);
      if (attempt < retries && (msg.includes('nonce') || msg.includes('timeout') || msg.includes('ETIMEDOUT'))) {
        const wait = attempt * 2000;
        console.log(`  retry ${attempt}/${retries} for ${label} in ${wait / 1000}s — ${msg.slice(0, 80)}`);
        await sleep(wait);
      } else {
        throw err;
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

async function fundWallets(provider, wallets) {
  const funder = getFunderWallet(provider);
  const funderBalance = await provider.getBalance(funder.address);

  // Calculate actual amount needed (only wallets below FUND_AMOUNT)
  let actualNeeded = 0n;
  for (const w of wallets) {
    const bal = await provider.getBalance(w.address);
    if (bal < FUND_AMOUNT) actualNeeded += FUND_AMOUNT;
  }

  console.log(`\nFunder: ${funder.address}`);
  console.log(`Funder balance: ${ethers.formatEther(funderBalance)} CELO`);
  console.log(`Actual needed:  ${ethers.formatEther(actualNeeded)} CELO`);

  if (funderBalance < actualNeeded) {
    console.error(`Insufficient funder balance. Need ${ethers.formatEther(actualNeeded)} CELO.`);
    process.exit(1);
  }

  let successes = 0;
  let failures = 0;

  for (let i = 0; i < wallets.length; i++) {
    const w = wallets[i];
    const existing = await provider.getBalance(w.address);

    if (existing >= FUND_AMOUNT) {
      console.log(`[${i + 1}/${wallets.length}] ${w.address} already funded (${ethers.formatEther(existing)} CELO)`);
      successes++;
      continue;
    }

    try {
      const tx = await sendWithRetry(async () => {
        return funder.sendTransaction({
          to: w.address,
          value: FUND_AMOUNT,
        });
      }, `fund wallet ${i}`);

      console.log(`[${i + 1}/${wallets.length}] Funded ${w.address} — tx: ${tx.hash}`);
      // Don't await tx.wait() — fire and forget for speed
      successes++;
    } catch (err) {
      console.log(`[${i + 1}/${wallets.length}] FAILED ${w.address} — ${(err?.message || err).slice(0, 80)}`);
      failures++;
    }

    if (i < wallets.length - 1) await sleep(DELAY_MS);
  }

  console.log(`\nFunding complete: ${successes} ok, ${failures} failed`);
}

async function addProducts(provider, wallets, abi) {
  console.log(`\nAdding products from ${wallets.length} wallets...`);
  let successes = 0;
  let failures = 0;

  for (let i = 0; i < wallets.length; i++) {
    const w = wallets[i];
    const wallet = new ethers.Wallet(w.privateKey, provider);
    const contract = new ethers.Contract(MARKET_ADDRESS, abi, wallet);

    const name = PRODUCT_NAMES[i % PRODUCT_NAMES.length];
    const desc = randomItem(PRODUCT_DESCRIPTIONS);
    const priceWei = ethers.parseEther('0.001'); // 0.001 CELO price

    try {
      const tx = await sendWithRetry(async () => {
        return contract.addProduct(name, priceWei, desc, PLACEHOLDER_IMAGE);
      }, `addProduct wallet ${i}`);

      console.log(`[${i + 1}/${wallets.length}] ${w.address} listed "${name}" — tx: ${tx.hash}`);
      // Don't await tx.wait() — fire and forget for speed
      successes++;
    } catch (err) {
      console.log(`[${i + 1}/${wallets.length}] FAILED ${w.address} — ${(err?.message || err).slice(0, 100)}`);
      failures++;
    }

    if (i < wallets.length - 1) await sleep(DELAY_MS);
  }

  console.log(`\nAdd products complete: ${successes} ok, ${failures} failed`);
}

async function purchaseProducts(provider, wallets, abi) {
  // Read active products first
  const readContract = new ethers.Contract(MARKET_ADDRESS, abi, provider);

  let products;
  try {
    products = await readContract.getActiveProducts();
  } catch (err) {
    console.error('Failed to fetch active products:', err.message);
    return;
  }

  if (products.length === 0) {
    console.log('No active products to purchase. Run add-products first.');
    return;
  }

  // Pick ~20 wallets to act as buyers (avoid buying your own product)
  const buyerCount = Math.min(20, wallets.length);
  const buyers = wallets.slice(0, buyerCount);

  console.log(`\n${buyerCount} wallets will purchase products (${products.length} available)...`);
  let successes = 0;
  let failures = 0;
  let productIdx = 0;

  for (let i = 0; i < buyers.length; i++) {
    const w = buyers[i];
    const wallet = new ethers.Wallet(w.privateKey, provider);
    const contract = new ethers.Contract(MARKET_ADDRESS, abi, wallet);

    // Find a product not owned by this wallet
    let product = null;
    for (let j = 0; j < products.length; j++) {
      const candidate = products[(productIdx + j) % products.length];
      if (candidate.vendor.toLowerCase() !== w.address.toLowerCase()) {
        product = candidate;
        productIdx = (productIdx + j + 1) % products.length;
        break;
      }
    }

    if (!product) {
      console.log(`[${i + 1}/${buyerCount}] No eligible product for ${w.address}, skipping`);
      continue;
    }

    const tokenId = product.tokenId;
    const price = product.priceWei;

    try {
      const tx = await sendWithRetry(async () => {
        return contract.purchaseProduct(tokenId, { value: price });
      }, `purchase wallet ${i}`);

      console.log(`[${i + 1}/${buyerCount}] ${w.address} bought token #${tokenId} for ${ethers.formatEther(price)} CELO — tx: ${tx.hash}`);
      await tx.wait();
      successes++;
      // Remove purchased product from available list
      products = products.filter(p => p.tokenId !== tokenId);
    } catch (err) {
      console.log(`[${i + 1}/${buyerCount}] FAILED ${w.address} — ${(err?.message || err).slice(0, 100)}`);
      failures++;
    }

    if (i < buyers.length - 1) await sleep(DELAY_MS);
  }

  console.log(`\nPurchases complete: ${successes} ok, ${failures} failed`);
}

async function checkStatus(provider, wallets, abi) {
  const contract = new ethers.Contract(MARKET_ADDRESS, abi, provider);

  let totalBalance = 0n;
  let funded = 0;

  console.log('\nWallet balances:');
  for (let i = 0; i < wallets.length; i++) {
    const bal = await provider.getBalance(wallets[i].address);
    totalBalance += bal;
    if (bal > 0n) funded++;
    if (i < 5 || i === wallets.length - 1) {
      console.log(`  [${i}] ${wallets[i].address}: ${ethers.formatEther(bal)} CELO`);
    } else if (i === 5) {
      console.log('  ...');
    }
  }

  console.log(`\nFunded wallets: ${funded}/${wallets.length}`);
  console.log(`Total balance:  ${ethers.formatEther(totalBalance)} CELO`);

  try {
    const count = await contract.productsCount();
    console.log(`Products on contract: ${count}`);
  } catch (err) {
    console.log(`Could not fetch product count: ${err.message}`);
  }

  try {
    const active = await contract.getActiveProducts();
    console.log(`Active products: ${active.length}`);
  } catch (err) {
    console.log(`Could not fetch active products: ${err.message}`);
  }
}

async function runFull(provider, wallets, abi) {
  console.log('=== FULL RUN: Fund -> Add Products -> Purchase ===\n');

  console.log('--- Step 1: Fund wallets ---');
  await fundWallets(provider, wallets);

  console.log('\n--- Step 2: Add products ---');
  await addProducts(provider, wallets, abi);

  console.log('\n--- Step 3: Purchase products ---');
  await purchaseProducts(provider, wallets, abi);

  console.log('\n--- Status ---');
  await checkStatus(provider, wallets, abi);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const command = process.argv[2];

  if (!command || !['fund', 'add-products', 'purchase', 'status', 'full'].includes(command)) {
    console.log(`
CeloMiniMarket Interaction CLI

Usage:
  node scripts/interact.js <command>

Commands:
  fund           Fund all 100 wallets with 0.01 CELO each
  add-products   Each wallet adds a product to the marketplace
  purchase       ~20 wallets purchase products from others
  status         Check wallet balances and contract state
  full           Run all steps: fund -> add-products -> purchase

Prerequisites:
  1. Generate wallets:   node scripts/generate-wallets.js
  2. Set .env:           PRIVATE_KEY=0x... (deployer wallet)
                         FUNDER_PRIVATE_KEY=0x... (funder wallet with >= 1 CELO)
  3. Optional:           CELO_MAINNET_RPC=https://rpc.ankr.com/celo
`);
    process.exit(0);
  }

  const fetchReq = new ethers.FetchRequest(RPC_URL);
  fetchReq.timeout = 120000; // 120 seconds
  fetchReq.getUrlFunc = ethers.FetchRequest.createGetUrlFunc({
    agent: new (await import('https')).Agent({ family: 4 })
  });
  const provider = new ethers.JsonRpcProvider(fetchReq);
  const network = await provider.getNetwork();
  console.log(`Connected to chain ${network.chainId} via ${RPC_URL}`);

  const wallets = loadWallets();
  console.log(`Loaded ${wallets.length} wallets`);

  const abi = loadABI();

  switch (command) {
    case 'fund':
      await fundWallets(provider, wallets);
      break;
    case 'add-products':
      await addProducts(provider, wallets, abi);
      break;
    case 'purchase':
      await purchaseProducts(provider, wallets, abi);
      break;
    case 'status':
      await checkStatus(provider, wallets, abi);
      break;
    case 'full':
      await runFull(provider, wallets, abi);
      break;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
