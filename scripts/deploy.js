// Importing hardhat using require syntax
const hardhat = require('hardhat');

async function main() {
    /* Update contract informatation */
    const ProductProvenence = await hardhat.ethers.getContractFactory("ProductProvenance");
    const productProvenence = await ProductProvenence.deploy();
    console.log(productProvenence);
    

    console.log('Contract deployed at address :', productProvenence.target);
}

main()
    .then(() => { process.exit(0) })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
