const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployMarket } = require("./helpers");

describe("CeloMiniMarket - NFT Metadata", function () {
  let market, vendor;

  beforeEach(async function () {
    [, vendor] = await ethers.getSigners();
    market = await deployMarket();
  });

  it("should generate valid base64 tokenURI", async function () {
    var price = ethers.parseUnits("5.0", 18);
    await market.connect(vendor).addProduct("Art", price, "Digital art", "https://img.example.com/art.png");
    var uri = await market.tokenURI(0);
    expect(uri).to.match(/^data:application\/json;base64,/);
  });

  it("should have unique tokenURI per product", async function () {
    var price = ethers.parseUnits("1.0", 18);
    await market.connect(vendor).addProduct("P1", price, "D1", "img1");
    await market.connect(vendor).addProduct("P2", price, "D2", "img2");
    var uri1 = await market.tokenURI(0);
    var uri2 = await market.tokenURI(1);
    expect(uri1).to.not.equal(uri2);
  });

  it("should revert tokenURI for burned token", async function () {
    var price = ethers.parseUnits("1.0", 18);
    var signers = await ethers.getSigners();
    var buyer = signers[2];
    await market.connect(vendor).addProduct("Burn", price, "desc", "img");
    await market.connect(buyer).purchaseProduct(0, { value: price });
    await expect(market.tokenURI(0)).to.be.reverted;
  });
});