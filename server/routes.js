const express = require('express');
const {testController} = require('./Controllers/testController.js');
const router = express.Router();
router.get('/',testController);
router.post('/data',testController);