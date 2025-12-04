const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiToken Contract", function () {
  let multiToken, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const MultiToken = await ethers.getContractFactory("MultiToken");
    multiToken = await MultiToken.deploy("https://placeholder-uri.io/metadata/{id}.json");
    await multiToken.deployed();
  });

  it("Should deploy and set correct URI", async function () {
    expect(await multiToken.uri(0)).to.equal("https://placeholder-uri.io/metadata/{id}.json");
  });

  it("Owner can mint a new token", async function () {
    await multiToken.mint(addr1.address, 10, 100);
    expect(await multiToken.balanceOf(addr1.address, 0)).to.equal(10);
  });

  it("Non-owner cannot mint", async function () {
    await expect(
      multiToken.connect(addr1).mint(addr1.address, 5, 50)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should prevent minting above max supply", async function () {
    await multiToken.mint(addr1.address, 50, 50);
    await expect(multiToken.mint(addr1.address, 1, 50)).to.be.revertedWith("Exceeds max supply");
  });

  it("Owner can batch mint multiple tokens", async function () {
    const amounts = [10, 20];
    const maxes = [100, 200];
    await multiToken.batchMint(addr2.address, amounts, maxes);

    expect(await multiToken.balanceOf(addr2.address, 0)).to.equal(10);
    expect(await multiToken.balanceOf(addr2.address, 1)).to.equal(20);
  });

  it("Batch mint fails if arrays mismatch", async function () {
    const amounts = [10, 20];
    const maxes = [100]; // mismatch
    await expect(multiToken.batchMint(addr2.address, amounts, maxes)).to.be.revertedWith(
      "Amounts and maxes length mismatch"
    );
  });
});
