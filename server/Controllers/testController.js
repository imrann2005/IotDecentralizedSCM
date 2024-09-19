const ShipmentModel = require('../Models/Shipment.js');



// Extract and format the UID


const landingController = async (req, res) => {
    res.status(200).json({ msg: "Getting Page!" });

}
const testDataController = (req, res) => {
    console.log(req.body);
    res.status(200).json({ msg: "Data sent successfully", Data: req.body });

}

const pos = {
    1: 'Manufacturers Warehouse',
    2: 'Supplier Warehouse',
    3: 'Out For Delivery',
    4: 'Delivered',
    5: 'Returned',
}

const createShipment = async (req, res) => {

    const newShipment = new ShipmentModel(req.body);
    console.log(newShipment);
    newShipment
        .save()
        .then(r => {
            const loc = pos[r.currentLocation];
            return res.status(201).json({
                msg: "New Shipment Added Successfully!", ShipmentData: {
                    ...r,
                    currentLocation: loc,
                }
            });
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

const updateShipment = async (req, res) => {
    // console.log(req.body);

    const { uid } = req.body;
    const newUid = extractUid(uid);
    const id = newUid.uid;

    ShipmentModel
        .findOneAndUpdate({ uid: id }, { $inc: { currentLocation: 1 } }, { new: true })
        .exec()
        .then(r => { return r.save() })
        .then(rr => {
            const loc = pos[rr.currentLocation];
            return res.status(200).json({
                msg: "Shipment Updated",
                ShipmentData: {
                    ...rr._doc,
                    currentLocation: loc,
                }
            })
        })
        .catch(e => {
            console.log(e);
            res.status(500).json({ msg: "Internal Server Error" });
        })
}

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

module.exports = {
    landingController, testDataController, createShipment, getAllShipments,
    updateShipment, deleteShipment
};