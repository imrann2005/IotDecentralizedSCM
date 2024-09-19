const ShipmentModel = require('../Models/Shipment.js');

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

module.exports = getAllShipments;
