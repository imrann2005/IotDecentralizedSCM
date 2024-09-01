const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
            unique: true,
        },
        ShipmentName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        currentLocation: {
            type: Number,
           
           default : 1,
         // If you want to make this field mandatory
        },
        supplier: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now, // Set default to current date
        },
    },
    { timestamps: true } // Optionally add timestamps for createdAt and updatedAt
);

const ShipmentModel = mongoose.model('ShipmentModel', ShipmentSchema);
module.exports = ShipmentModel;
