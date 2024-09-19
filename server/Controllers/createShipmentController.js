const ShipmentModel = require('../Models/Shipment.js');
const checkPoints = require('../Constants/Checkpoints.js');

const { ethers } = require('ethers');
require('dotenv').config();

// ABI and Contract Address
const contractABI = require('../../artifacts/contracts/ProductProvenence.sol/ProductProvenance.json').abi;
const contractAddress = process.env.PRODUCT_PROVENANCE_ADDRESS;

// Provider and Signer for interacting with the blockchain
const provider = new ethers.JsonRpcProvider(process.env.PUBLIC_AMOY_RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


const createShipment = async (req, res) => {
    try {
        // Create new shipment and save it to MongoDB
        const newShipment = new ShipmentModel(req.body);
        //const savedShipment = await newShipment.save();
        //const loc = checkPoints[savedShipment.currentLocation];

        // Extract data for blockchain interaction
        const { ShipmentName, uid } = req.body;
        console.log(`name : ${ShipmentName} and rfid : ${uid}`);
        
        // Smart Contract Instance for intraction
        const contract = new ethers.Contract(contractAddress, contractABI, signer);


        // Call the smart contract to register the product on the blockchain
        const tx = await contract.registerProduct(ShipmentName, uid, "Manufact");

        //console.log(tx);
        
        const receipt = await tx.wait();  // Wait for the transaction to be mined

        // Respond with shipment data and blockchain transaction details
        return res.status(201).json({
            msg: "New Shipment Added Successfully!",
            ShipmentData: {
                ...savedShipment._doc,
                currentLocation: loc,
            },
            Blockchain: {
                TransactionHash: receipt.transactionHash,
                Status: receipt.status ? "Success" : "Failed"
            }
        });
    } catch (error) {
        // Check if the error is related to "Product already registered"
        if (error.reason && error.reason.includes("Product already registered.")) {
            return res.status(400).json({ msg: "The product with this UID is already registered on the blockchain." });
        }

        // Log and return a generic error message for other cases
        console.error("Error creating shipment:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = createShipment;
