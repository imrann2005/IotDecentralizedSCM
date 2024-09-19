const ShipmentModel = require('../Models/Shipment.js');

const deleteShipment = async (req, res) => {
    const uid = req.params.id;

    ShipmentModel
        .findOneAndDelete({ uid: uid })
        .exec()
        .then(r => {
            return res.status(200).json({ msg: 'Shipment deleted successfully!' });

        })
        .catch(e => {
            console.log(e);
            res.status(500).json({ msg: "Internal Server Error" });

        })
}

module.exports = deleteShipment;