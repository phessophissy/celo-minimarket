# Contract Tests

## Running Tests

```bash
npx hardhat test
```

## Running with Coverage

```bash
npx hardhat coverage
```

## Test Structure

| File | Description |
|------|-------------|
| helpers.js | Shared test utilities |
| deployment.test.js | Contract deployment |
| addProduct.test.js | Product creation |
| toggleProduct.test.js | Product toggle |
| purchaseProduct.test.js | Purchase flow |
| getActiveProducts.test.js | Product queries |
| edgeCases.test.js | Boundary values |
| nftMetadata.test.js | NFT metadata |