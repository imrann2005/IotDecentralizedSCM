const ShipmentModel = require('../Models/Shipment.js');

const landingController = async (req, res) => {
    res.status(200).json({ msg: "Getting Page!" });

}
const testDataController = (req, res) => {
    console.log(req.body);
    res.status(200).json({ msg: "Data sent successfully", Data: req.body });

}

const createShipment = async (req, res) => {

    const newShipment = new ShipmentModel(req.body);
    console.log(newShipment);
    newShipment
        .save()
        .then(r => {
            return res.status(201).json({ msg: "New Shipment Added Successfully!" });
        })
        .catch(e => {
            console.log(e);
            return res.status(501).json({ msg: "Internal Server Error" });

        })

}

const getAllShipments = async (req, res) => {
    ShipmentModel
        .find({})
        .exec()
        .then(data => {
            if (data.length == 0) return res.status(200).json({ msg: "No Shipments Available" });

            return res.status(200).json({ msg: "Data Fetched Successfully", Data: data });
        })
        .catch(err => {
            console.log(err);

            res.status(500).json({ msg: "Internal Server Error" })
        });

}

const updateShipment = async (req,res) => { 
    const _id = req.params.id;
    
    ShipmentModel
        .findOneAndUpdate({uid : _id},{$inc : {currentLocation : 1}},{new : true})
        .exec()
        .then(r => {return r.save()})
        .then(rr => {return res.status(200).json({msg : "Shipment Updated"})})
        .catch(e => {
            console.log(e);
            res.status(500).json({msg : "Internal Server Error"});
        })
 }

module.exports = { landingController, testDataController, createShipment, getAllShipments,updateShipment };