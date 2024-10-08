const mongoose = require('mongoose');
require('dotenv').config({
    path : '../../env.local',
});
const connection = async () => { 
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongo db connected');
    } catch (error) {
        console.log(error);
    }
 }

 module.exports = connection;