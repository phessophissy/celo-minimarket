# Manual Contract Verification Guide for Celoscan

## Contract Information
- **Contract Address:** `0xABD9E2A3bc4bdf520C82CcBC287095a125C56225`
- **Network:** Celo Mainnet
- **Contract Name:** CeloMiniMarket

## Step-by-Step Instructions

### 1. Go to Celoscan Verification Page
Visit: https://celoscan.io/address/0xABD9E2A3bc4bdf520C82CcBC287095a125C56225#code

Click the **"Verify and Publish"** button.

### 2. Select Verification Method
- **Compiler Type:** Select "Solidity (Single file)"
- Click "Continue"

### 3. Fill in Compiler Settings

#### Contract Details
- **Compiler Version:** `v0.8.20+commit.a1b79de6`
- **Open Source License Type:** `MIT License (MIT)`

#### Optimization Settings
**Try Option 1 first (Optimizer Enabled):**
- **Optimization:** Yes
- **Runs:** 200

**If that fails, try Option 2 (Optimizer Disabled):**
- **Optimization:** No

#### Advanced Settings (Optional - usually not needed)
- **EVM Version:** paris
- Leave other fields empty unless you used specific constructor arguments

### 4. Paste the Flattened Contract Code

Copy the entire content from the file: `flattened-contract.sol`

This file contains your CeloMiniMarket contract with all OpenZeppelin dependencies flattened into a single file.

### 5. Complete the CAPTCHA

Solve the CAPTCHA and click **"Verify and Publish"**

## If Verification Fails

### Option 1: Try with Optimizer Disabled
Go back and change:
- **Optimization:** No

### Option 2: Check Exact Compiler Version
The contract might have been compiled with a slightly different version. Try:
- v0.8.20+commit.a1b79de6 (default)
- Other v0.8.20 variants if available

### Option 3: Verify via Sourcify
Alternative method:
1. Go to https://sourcify.dev/
2. Upload your contract files
3. Let Sourcify verify and publish to Celoscan

## Files You Need
1. **Flattened Contract:** `/home/thee1/celo-minimarket-github/flattened-contract.sol`

## Constructor Arguments
This contract has NO constructor arguments (only the ERC721 name and symbol which are hardcoded).

## Verification Success
Once verified, you'll see:
- ✅ Green checkmark on Celoscan
- "Contract Source Code Verified"
- Read/Write Contract tabs available
- ABI publicly available

## Celoscan Link
After verification: https://celoscan.io/address/0xABD9E2A3bc4bdf520C82CcBC287095a125C56225#code

---

**Need Help?**
- Celoscan Discord: https://discord.gg/celo
- Check if bytecode matches by comparing deployed bytecode with compiled bytecode
