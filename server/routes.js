const express = require('express');
const { landingController, testDataController } = require('./Controllers/testController.js');
const updateShipment = require('./Controllers/updateShipmentController.js');
const createShipment = require('./Controllers/createShipmentController.js');
const deleteShipment = require('./Controllers/deleteShipmentController.js');
const fetchAllShipments = require('./Controllers/fetchShipementController.js');

//Router inititalized

const router = express.Router();

//GET 
router.get('/', landingController);
router.get('/shipments', fetchAllShipments);

//POST
router.post('/shipment', createShipment);
router.post('/data', updateShipment);

//DELETE
router.delete('/delete/:id', deleteShipment);
module.exports = router;