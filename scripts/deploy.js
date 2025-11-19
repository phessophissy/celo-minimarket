async function main() {
  const Market = await ethers.getContractFactory("CeloMiniMarket");
  const market = await Market.deploy();
  await market.waitForDeployment();
  console.log("✅ CeloMiniMarket deployed at:", await market.getAddress());
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
