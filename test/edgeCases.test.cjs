const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployMarket, addSampleProduct } = require("./helpers.cjs");

describe("CeloMiniMarket - Edge Cases", function () {
  let market, vendor1;

  beforeEach(async function () {
    [, vendor1] = await ethers.getSigners();
    market = await deployMarket();
  });

  it("should handle long product names", async function () {
    var longName = "A".repeat(256);
    var price = ethers.parseUnits("1.0", 18);
    await market.connect(vendor1).addProduct(longName, price, "desc", "img");
    var product = await market.getProduct(0);
    expect(product[2]).to.equal(longName);
  });

  it("should handle 1 wei price", async function () {
    await market.connect(vendor1).addProduct("Cheap", 1, "desc", "img");
    var product = await market.getProduct(0);
    expect(product[3]).to.equal(1);
  });

  it("should handle large prices", async function () {
    var big = ethers.parseUnits("1000000", 18);
    await market.connect(vendor1).addProduct("Expensive", big, "desc", "img");
    var product = await market.getProduct(0);
    expect(product[3]).to.equal(big);
  });

  it("should allow vendor to list multiple products", async function () {
    for (var i = 0; i < 5; i++) {
      await addSampleProduct(market, vendor1, { name: "Product " + i });
    }
    expect(await market.productsCount()).to.equal(5);
  });
});