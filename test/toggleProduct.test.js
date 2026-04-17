const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployMarket, addSampleProduct, parseProductTuple } = require("./helpers");

describe("CeloMiniMarket - toggleProduct", function () {
  let market, owner, vendor1, vendor2;

  beforeEach(async function () {
    [owner, vendor1, vendor2] = await ethers.getSigners();
    market = await deployMarket();
    await addSampleProduct(market, vendor1);
  });

  it("should allow vendor to deactivate product", async function () {
    await market.connect(vendor1).toggleProduct(0, false);
    var product = parseProductTuple(await market.getProduct(0));
    expect(product.active).to.be.false;
  });

  it("should allow vendor to reactivate product", async function () {
    await market.connect(vendor1).toggleProduct(0, false);
    await market.connect(vendor1).toggleProduct(0, true);
    var product = parseProductTuple(await market.getProduct(0));
    expect(product.active).to.be.true;
  });

  it("should emit ProductStatusToggled event", async function () {
    await expect(market.connect(vendor1).toggleProduct(0, false))
      .to.emit(market, "ProductStatusToggled")
      .withArgs(0, false);
  });

  it("should revert when non-vendor toggles", async function () {
    await expect(
      market.connect(vendor2).toggleProduct(0, false)
    ).to.be.revertedWith("Only vendor");
  });

  it("should hide deactivated from active list", async function () {
    await market.connect(vendor1).toggleProduct(0, false);
    var active = await market.getActiveProducts();
    expect(active.length).to.equal(0);
  });
});