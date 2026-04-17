const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployMarket, addSampleProduct, parseProductTuple } = require("./helpers");

describe("CeloMiniMarket - purchaseProduct", function () {
  let market, owner, vendor1, buyer;
  var PRICE;

  beforeEach(async function () {
    PRICE = ethers.parseUnits("1.0", 18);
    [owner, vendor1, buyer] = await ethers.getSigners();
    market = await deployMarket();
    await addSampleProduct(market, vendor1, { price: PRICE });
  });

  it("should complete purchase with exact payment", async function () {
    await market.connect(buyer).purchaseProduct(0, { value: PRICE });
    var product = parseProductTuple(await market.getProduct(0));
    expect(product.sold).to.be.true;
    expect(product.active).to.be.false;
  });

  it("should emit ProductPurchased event", async function () {
    await expect(market.connect(buyer).purchaseProduct(0, { value: PRICE }))
      .to.emit(market, "ProductPurchased")
      .withArgs(0, buyer.address, vendor1.address, PRICE);
  });

  it("should transfer payment to vendor", async function () {
    var before = await ethers.provider.getBalance(vendor1.address);
    await market.connect(buyer).purchaseProduct(0, { value: PRICE });
    var after = await ethers.provider.getBalance(vendor1.address);
    expect(after - before).to.equal(PRICE);
  });

  it("should revert for non-existent product", async function () {
    await expect(
      market.connect(buyer).purchaseProduct(999, { value: PRICE })
    ).to.be.revertedWith("Product not found");
  });

  it("should revert for inactive product", async function () {
    await market.connect(vendor1).toggleProduct(0, false);
    await expect(
      market.connect(buyer).purchaseProduct(0, { value: PRICE })
    ).to.be.revertedWith("Product not active");
  });

  it("should revert for already sold product", async function () {
    await market.connect(buyer).purchaseProduct(0, { value: PRICE });
    await expect(
      market.connect(buyer).purchaseProduct(0, { value: PRICE })
    ).to.be.revertedWith("Product already sold");
  });

  it("should revert for insufficient payment", async function () {
    var low = ethers.parseUnits("0.5", 18);
    await expect(
      market.connect(buyer).purchaseProduct(0, { value: low })
    ).to.be.revertedWith("Insufficient payment");
  });

  it("should burn NFT after purchase", async function () {
    await market.connect(buyer).purchaseProduct(0, { value: PRICE });
    await expect(market.ownerOf(0)).to.be.reverted;
  });
});