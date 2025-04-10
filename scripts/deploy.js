import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  // Set initial ticket price (in wei)
  const ticketPrice = "10000000000000000"; // 0.01 ETH in wei

  // Deploy the contract
  const BusTicket = await ethers.getContractFactory("BusTicket");
  const busTicket = await BusTicket.deploy(ticketPrice);

  await busTicket.waitForDeployment();
  const address = await busTicket.getAddress();

  console.log("BusTicket deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 