const hre = require("hardhat");

async function main() {
  const ticketPrice = ethers.parseEther("0.01"); // 0.01 ETH
  const BusTicket = await hre.ethers.getContractFactory("BusTicket");
  const busTicket = await BusTicket.deploy(ticketPrice);

  await busTicket.waitForDeployment();

  console.log("BusTicket deployed to:", await busTicket.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 