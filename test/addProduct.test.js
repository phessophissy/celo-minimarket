const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployMarket, addSampleProduct, parseProductTuple } = require("./helpers");

describe("CeloMiniMarket - addProduct", function () {
  let market, owner, vendor1, vendor2;

  beforeEach(async function () {
    [owner, vendor1, vendor2] = await ethers.getSigners();
    market = await deployMarket();
  });

  it("should add a product and increment count", async function () {
    await addSampleProduct(market, vendor1);
    expect(await market.productsCount()).to.equal(1);
  });

  it("should assign sequential token IDs", async function () {
    await addSampleProduct(market, vendor1, { name: "Product 1" });
    await addSampleProduct(market, vendor1, { name: "Product 2" });
    expect(await market.productsCount()).to.equal(2);
  });

  it("should store product data correctly", async function () {
    var price = ethers.parseUnits("2.5", 18);
    await market.connect(vendor1).addProduct("Soap", price, "Organic soap", "img");
    var product = parseProductTuple(await market.getProduct(0));
    expect(product.name).to.equal("Soap");
    expect(product.priceWei).to.equal(price);
    expect(product.vendor).to.equal(vendor1.address);
    expect(product.active).to.be.true;
    expect(product.sold).to.be.false;
  });

  it("should emit ProductAdded event", async function () {
    var price = ethers.parseUnits("1.0", 18);
    await expect(market.connect(vendor1).addProduct("Test", price, "Desc", "img"))
      .to.emit(market, "ProductAdded")
      .withArgs(0, vendor1.address, "Test", price);
  });

  it("should revert when name is empty", async function () {
    var price = ethers.parseUnits("1.0", 18);
    await expect(
      market.connect(vendor1).addProduct("", price, "Desc", "img")
    ).to.be.revertedWith("Name required");
  });

  it("should revert when price is zero", async function () {
    await expect(
      market.connect(vendor1).addProduct("Test", 0, "Desc", "img")
    ).to.be.revertedWith("Price must be > 0");
  });

  it("should revert when image is empty", async function () {
    var price = ethers.parseUnits("1.0", 18);
    await expect(
      market.connect(vendor1).addProduct("Test", price, "Desc", "")
    ).to.be.revertedWith("Image required");
  });

  it("should mint NFT to the vendor", async function () {
    await addSampleProduct(market, vendor1);
    expect(await market.ownerOf(0)).to.equal(vendor1.address);
  });

  it("should set tokenURI with base64 metadata", async function () {
    await addSampleProduct(market, vendor1);
    var uri = await market.tokenURI(0);
    expect(uri).to.contain("data:application/json;base64,");
  });
});