// scripts/deploy_and_print.mjs
import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("DEPLOYER_ADDRESS:" + deployer.address);

    // Deploy CarbonToken
    const CarbonToken = await ethers.getContractFactory("CarbonToken");
    const carbonToken = await CarbonToken.deploy("CarbonToken", "CT");
    await carbonToken.waitForDeployment();
    console.log("TOKEN_ADDRESS:" + await carbonToken.getAddress());

    // Deploy Registry
    const Registry = await ethers.getContractFactory("BlueCarbonRegistry");
    const registry = await Registry.deploy(deployer.address);
    await registry.waitForDeployment();
    console.log("REGISTRY_ADDRESS:" + await registry.getAddress());

    // Link registry <-> token
    await registry.setCarbonToken(await carbonToken.getAddress());
    const ISSUER_ROLE = await carbonToken.ISSUER_ROLE();
    await carbonToken.grantRole(ISSUER_ROLE, await registry.getAddress());

    console.log("DEPLOYMENT_COMPLETE");
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});
