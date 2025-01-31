const ShipmentModel = require('../Models/Shipment.js');
const extractedUid = require('../Constants/extractUID.js');
const checkPoints = require('../Constants/Checkpoints.js');

const {ethers} = require('ethers');

require('dotenv').config();

const contractABI = require('../../artifacts/contracts/ProductProvenence.sol/ProductProvenance.json').abi;
const contractAddress = process.env.PRODUCT_PROVENANCE_ADDRESS;

// const providers = new ethers.JsonRpcProvider(process.env.PUBLIC_AMOY_RPC_URL);
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY,providers);

const updateShipment = async (req, res) => {
    try {
        const { uid } = req.body;
        const newUid = extractedUid(uid);
        const id = newUid.uid;

        // Update the shipment location in MongoDB
        const updatedShipment = await ShipmentModel
            .findOneAndUpdate({ uid: id }, { $inc: { currentLocation: 1 } }, { new: true });

        if (!updatedShipment) {
            return res.status(404).json({ msg: "Shipment not found" });
        }

        // Save the MongoDB shipment
        const savedShipment = await updatedShipment.save();

        // Fetch the current location from checkpoints
        const loc = checkPoints[savedShipment.currentLocation];

        // Interact with the smart contract
       // const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Call the smart contract's update location function
        //const tx = await contract.updateLocation(id);  // Assuming the contract function takes UID as an argument
        //const receipt = await tx.wait();  // Wait for the transaction to be confirmed

        //console.log('Transaction Hash:', receipt.transactionHash);

        // Respond with the updated shipment data
        res.status(200).json({
            msg: "Shipment Updated",
            //TransactionHash: receipt.transactionHash,  // Transaction hash for tracking on-chain
            ShipmentData: {
                ...savedShipment._doc,
                currentLocation: loc,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = updateShipment;