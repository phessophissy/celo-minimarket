const { expect } = require("chai");
const { ethers } = require("hardhat");
const { deployMarket } = require("./helpers.cjs");

describe("CeloMiniMarket - Deployment", function () {
  let market;

  beforeEach(async function () {
    market = await deployMarket();
  });

  it("should deploy with correct name and symbol", async function () {
    expect(await market.name()).to.equal("CeloMiniMarketProduct");
    expect(await market.symbol()).to.equal("CMMP");
  });

  it("should start with zero products", async function () {
    expect(await market.productsCount()).to.equal(0);
  });

  it("should return empty array for active products", async function () {
    const active = await market.getActiveProducts();
    expect(active.length).to.equal(0);
  });

  it("should support ERC721 interface", async function () {
    const ERC721_ID = "0x80ac58cd";
    expect(await market.supportsInterface(ERC721_ID)).to.be.true;
  });

  it("should support ERC721Metadata interface", async function () {
    const META_ID = "0x5b5e139f";
    expect(await market.supportsInterface(META_ID)).to.be.true;
  });
});