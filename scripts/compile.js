const hre = require("hardhat");

async function main() {
  await hre.run('compile');
  console.log('Contract compiled successfully!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 