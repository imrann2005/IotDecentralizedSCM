const express = require('express');
require('dotenv').config();
const connect = require('./DB/connection.js');
const app = express();
const PORT = 3000;

connect();
app.use(express.json());

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
});