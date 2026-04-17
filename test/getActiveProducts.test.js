const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployMarket, addSampleProduct } = require("./helpers");

describe("CeloMiniMarket - getActiveProducts", function () {
  let market, vendor1, vendor2, buyer;

  beforeEach(async function () {
    [, vendor1, vendor2, buyer] = await ethers.getSigners();
    market = await deployMarket();
  });

  it("should return all active products", async function () {
    await addSampleProduct(market, vendor1, { name: "P1" });
    await addSampleProduct(market, vendor2, { name: "P2" });
    var active = await market.getActiveProducts();
    expect(active.length).to.equal(2);
  });

  it("should exclude deactivated products", async function () {
    await addSampleProduct(market, vendor1, { name: "P1" });
    await addSampleProduct(market, vendor2, { name: "P2" });
    await market.connect(vendor1).toggleProduct(0, false);
    var active = await market.getActiveProducts();
    expect(active.length).to.equal(1);
  });

  it("should exclude sold products", async function () {
    var price = ethers.parseUnits("1.0", 18);
    await addSampleProduct(market, vendor1, { name: "P1", price: price });
    await addSampleProduct(market, vendor2, { name: "P2", price: price });
    await market.connect(buyer).purchaseProduct(0, { value: price });
    var active = await market.getActiveProducts();
    expect(active.length).to.equal(1);
  });
});