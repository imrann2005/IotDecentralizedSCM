const express = require('express');
require('dotenv').config();
const connect = require('./DB/connection.js');
const CORS = require('cors');
const router = require('./routes.js');
const app = express();
const PORT = 3000;

connect();

/* MiddleWare */
app.use(CORS());
app.use(express.json());
app.use('/',router);


app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
});