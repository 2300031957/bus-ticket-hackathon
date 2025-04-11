const hre = require("hardhat");

async function main() {
    // Compile the contract
    await hre.run('compile');
    console.log('Contract compiled successfully!');

    // Deploy the contract
    const BusTicket = await hre.ethers.getContractFactory("BusTicket");
    const busTicket = await BusTicket.deploy();

    await busTicket.waitForDeployment();

    console.log("BusTicket deployed to:", await busTicket.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 