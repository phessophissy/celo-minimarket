const { ethers } = require("hardhat");

async function deployMarket() {
  const Market = await ethers.getContractFactory("contracts/CeloMiniMarket.sol:CeloMiniMarket");
  const market = await Market.deploy();
  await market.waitForDeployment();
  return market;
}

async function addSampleProduct(market, signer, overrides) {
  overrides = overrides || {};
  var name = overrides.name || "Test Product";
  var price = overrides.price || ethers.parseUnits("1.0", 18);
  var description = overrides.description || "A test product description";
  var imageData = overrides.imageData || "data:image/png;base64,ABC123";
  return market.connect(signer).addProduct(name, price, description, imageData);
}

function parseProductTuple(tuple) {
  return {
    tokenId: tuple[0],
    vendor: tuple[1],
    name: tuple[2],
    priceWei: tuple[3],
    description: tuple[4],
    imageData: tuple[5],
    active: tuple[6],
    sold: tuple[7]
  };
}

module.exports = { deployMarket, addSampleProduct, parseProductTuple };