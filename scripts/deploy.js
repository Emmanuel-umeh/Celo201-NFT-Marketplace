const hre = require('hardhat');
const fs = require("fs");
const path = require("path");
const contractABI = path.join(__dirname, '../src/abi');//It goes three folders or directories back from given __dirname;

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory(
    'NFTMarket'
  );
  const nftMarketplace = await NFTMarketplace.deploy();
  await nftMarketplace.deployed();
  const nftMarketplaceAddress = await nftMarketplace.address
  console.log('NFTMarketplace deployed to:', nftMarketplaceAddress);

  await fs.writeFileSync(
      contractABI + "/NFTMarketplace-address.json",
    JSON.stringify({ NFTMarketplace: nftMarketplaceAddress }, undefined, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
