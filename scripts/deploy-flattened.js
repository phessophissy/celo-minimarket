async function main() {
  console.log("Deploying CeloMiniMarket from flattened contract...");
  
  const Market = await ethers.getContractFactory("CeloMiniMarket", {
    contractName: "contracts/CeloMiniMarketFlattened.sol:CeloMiniMarket"
  });
  
  console.log("Deployment started...");
  const market = await Market.deploy();
  
  console.log("Waiting for deployment confirmation...");
  await market.waitForDeployment();
  
  const address = await market.getAddress();
  console.log("✅ CeloMiniMarket deployed at:", address);
  console.log("\n📋 Next steps:");
  console.log("1. Update the contract address in frontend/.env");
  console.log("2. Update the contract address in frontend/src/App.jsx");
  console.log("3. Verify the contract immediately with:");
  console.log(`   npx hardhat verify --network celo ${address}`);
  console.log("\n⚠️  Make sure to verify RIGHT AWAY to ensure settings match!");
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});
