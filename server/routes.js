const express = require('express');
const {landingController,testDataController,getAllShipments,createShipment,updateShipment,deleteShipment} = require('./Controllers/testController.js');
const router = express.Router();
router.get('/',landingController);
router.get('/shipments',getAllShipments);

router.post('/shipment',createShipment);
router.post('/data',updateShipment);

router.delete('/delete/:id',deleteShipment);
module.exports = router;