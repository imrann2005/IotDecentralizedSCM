const express = require('express');
const {landingController,testDataController,getAllShipments,createShipment,updateShipment} = require('./Controllers/testController.js');
const router = express.Router();
router.get('/',landingController);
router.get('/shipments',getAllShipments);

router.post('/shipment',createShipment);
router.put('/shipment/:id',updateShipment);

module.exports = router;